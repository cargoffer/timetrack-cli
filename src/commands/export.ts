import { Command } from 'commander';
import { client } from '../client.js';

export function buildExportCommand(): Command {
  const cmd = new Command('export');
  cmd.description('Export data');

  cmd
    .command('time-entries')
    .description('Export time entries')
    .option('--format <fmt>', 'Format: json|csv|md', 'json')
    .action(async (opts) => {
      const entries = await client.timeEntries.list();
      if (opts.format === 'json') {
        console.log(JSON.stringify(entries, null, 2));
        return;
      }
      if (opts.format === 'csv') {
        const header = 'id,projectId,startTime,endTime,duration,description';
        const rows = entries.map((e) =>
          [
            e.id ?? '',
            e.projectId ?? '',
            e.startTime ?? '',
            e.endTime ?? '',
            e.duration ?? '',
            (e.description ?? '').replace(/"/g, '""'),
          ].join(',')
        );
        console.log([header, ...rows].join('\n'));
        return;
      }
      console.log('# Time Entries\n');
      entries.forEach((entry) => {
        console.log(`- ${entry.description ?? entry.id ?? 'entry'}: ${entry.duration ?? 0} min`);
      });
    });

  return cmd;
}
