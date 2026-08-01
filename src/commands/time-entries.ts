import { Command } from 'commander';
import { client } from '../client.js';
import { renderTimeEntry } from '../utils/format.js';

export function buildTimeEntriesCommand(): Command {
  const cmd = new Command('time-entries');
  cmd.description('Time entries commands');

  cmd.command('list').action(async () => {
    const entries = await client.timeEntries.list();
    if (!entries.length) {
      console.log('No time entries');
      return;
    }
    console.log(`id\tproject\tstart\tend\tduration`);
    entries.forEach((entry) => console.log(renderTimeEntry(entry)));
  });

  cmd
    .command('start')
    .description('Start a new time entry')
    .requiredOption('--project-id <id>', 'Project ID')
    .option('--task-id <id>', 'Task ID')
    .option('--description <text>', 'Description')
    .action(async (opts) => {
      const entry = await client.timeEntries.start({
        projectId: opts.projectId,
        taskId: opts.taskId,
        description: opts.description,
      });
      console.log(JSON.stringify(entry, null, 2));
    });

  cmd
    .command('stop <id>')
    .description('Stop a running time entry')
    .action(async (id) => {
      const entry = await client.timeEntries.stop(id);
      console.log(JSON.stringify(entry, null, 2));
    });

  cmd
    .command('active')
    .description('Show active time entry')
    .action(async () => {
      const entry = await client.timeEntries.active();
      if (!entry) {
        console.log('No active time entry');
        return;
      }
      console.log(JSON.stringify(entry, null, 2));
    });

  return cmd;
}
