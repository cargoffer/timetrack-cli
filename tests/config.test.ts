import { describe, it, expect } from 'vitest';
import { getApiBase } from '../src/config.js';

describe('config', () => {
  it('returns default API base', () => {
    expect(getApiBase()).toBe('https://api.timetracker.cargoffer.com/api/v1');
  });
});
