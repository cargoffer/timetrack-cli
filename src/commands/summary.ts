import { Command } from 'commander';
import { client } from '../client.js';
import { renderSummary } from '../utils/format.js';

export function buildSummaryCommand(): Command {
  const cmd = new Command('summary');
  cmd.description('Summary reports');

  cmd
    .command('weekly')
    .description('Weekly summary')
    .action(async () => {
      const summary = await client.summary.weekly();
      console.log(renderSummary(summary));
    });

  cmd
    .command('daily')
    .description('Daily summary')
    .action(async () => {
      const summary = await client.summary.daily();
      console.log(renderSummary(summary));
    });

  return cmd;
}
