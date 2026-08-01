import { describe, it, expect, vi, beforeEach } from 'vitest';
import { client } from '../src/client.js';

describe('client', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('returns parsed JSON on success', async () => {
    const mock = { id: '1', projectId: 'p1', startTime: new Date().toISOString() };
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify(mock),
    });

    const active = await client.timeEntries.active();
    expect(active).toEqual(mock);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/time-entries/active'),
      expect.objectContaining({
        headers: expect.objectContaining({
          'X-API-Key': expect.any(String),
        }),
      })
    );
  });

  it('throws ApiError on non-ok response', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => 'Unauthorized',
    });

    await expect(client.projects.list()).rejects.toMatchObject({ status: 401 });
  });
});
