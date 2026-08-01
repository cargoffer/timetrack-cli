import { Command } from 'commander';
import { client } from '../client.js';

export function buildTasksCommand(): Command {
  const cmd = new Command('tasks');
  cmd.description('Tasks commands');

  cmd
    .command('list')
    .description('List tasks')
    .option('--project-id <id>', 'Filter by project ID')
    .action(async (opts) => {
      const items = await client.tasks.list(opts.projectId);
      console.log(JSON.stringify(items, null, 2));
    });

  cmd
    .command('create')
    .description('Create a task')
    .requiredOption('--title <title>', 'Task title')
    .option('--project-id <id>', 'Project ID')
    .option('--description <text>', 'Description')
    .action(async (opts) => {
      const item = await client.tasks.create({
        title: opts.title,
        projectId: opts.projectId,
        description: opts.description,
      });
      console.log(JSON.stringify(item, null, 2));
    });

  return cmd;
}
