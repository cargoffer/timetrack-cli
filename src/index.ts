#!/usr/bin/env node
import { Command } from 'commander';
import { buildTimeEntriesCommand } from './commands/time-entries.js';
import { buildProjectsCommand } from './commands/projects.js';
import { buildClientsCommand } from './commands/clients.js';
import { buildTasksCommand } from './commands/tasks.js';
import { buildSummaryCommand } from './commands/summary.js';
import { buildExportCommand } from './commands/export.js';
import { getApiKey, setApiKey, getApiBase } from './config.js';

const program = new Command();
program.name('timetrack').description('Open-source CLI for timetrack').version('0.1.0');

program
  .command('auth-login')
  .description('Save API key for future requests')
  .argument('<key>', 'API key')
  .action((key) => {
    setApiKey(key);
    console.log('API key saved.');
  });

program
  .command('auth-status')
  .description('Show current auth status and API base URL')
  .action(() => {
    const key = getApiKey();
    const base = getApiBase();
    console.log(`API base: ${base}`);
    console.log(`API key: ${key ? '****' + key.slice(-4) : 'missing'}`);
  });

program.addCommand(buildTimeEntriesCommand());
program.addCommand(buildProjectsCommand());
program.addCommand(buildClientsCommand());
program.addCommand(buildTasksCommand());
program.addCommand(buildSummaryCommand());
program.addCommand(buildExportCommand());

program.parseAsync();
