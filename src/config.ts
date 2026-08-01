import Conf from 'conf';
import { z } from 'zod';

const EnvSchema = z.object({
  TIMETRACK_API_URL: z.string().url().default('https://timetracker.cargoffer.com/api/v1'),
  TIMETRACK_API_KEY: z.string().min(1).optional(),
});

type Env = z.infer<typeof EnvSchema>;

let cachedEnv: Env | null = null;

function getEnv(): Env {
  if (!cachedEnv) {
    const raw = {
      TIMETRACK_API_URL: process.env.TIMETRACK_API_URL,
      TIMETRACK_API_KEY: process.env.TIMETRACK_API_KEY,
    };
    cachedEnv = EnvSchema.parse(raw);
  }
  return cachedEnv;
}

export type { Env };

export const config = new Conf({ projectName: 'timetrack-cli' });

export function getApiKey(): string {
  const envKey = getEnv().TIMETRACK_API_KEY;
  if (envKey) return envKey;
  const stored = config.get('apiKey', '');
  if (typeof stored === 'string') return stored;
  return '';
}

export function setApiKey(key: string): void {
  config.set('apiKey', key);
}

export function getApiBase(): string {
  return getEnv().TIMETRACK_API_URL.replace(/\/$/, '');
}

export function requireApiKey(): string {
  const key = getApiKey();
  if (!key) {
    throw new Error('Missing API key. Use `timetrack auth login` or set TIMETRACK_API_KEY.');
  }
  return key;
}
