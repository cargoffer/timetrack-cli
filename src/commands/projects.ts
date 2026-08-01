import { Command } from 'commander';
import { client } from '../client.js';

export function buildProjectsCommand(): Command {
  const cmd = new Command('projects');
  cmd.description('Projects commands');

  cmd.command('list').action(async () => {
    const projects = await client.projects.list();
    console.log(JSON.stringify(projects, null, 2));
  });

  cmd
    .command('create')
    .description('Create a project')
    .requiredOption('--name <name>', 'Project name')
    .option('--description <text>', 'Description')
    .option('--client-id <id>', 'Client ID')
    .option('--color <hex>', 'Color')
    .option('--billable', 'Billable')
    .action(async (opts) => {
      const project = await client.projects.create({
        name: opts.name,
        description: opts.description,
        clientId: opts.clientId,
        color: opts.color,
        billable: opts.billable,
      });
      console.log(JSON.stringify(project, null, 2));
    });

  return cmd;
}
