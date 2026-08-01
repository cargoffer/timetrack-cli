import { Command } from 'commander';
import { client } from '../client.js';

export function buildClientsCommand(): Command {
  const cmd = new Command('clients');
  cmd.description('Clients commands');

  cmd.command('list').action(async () => {
    const items = await client.clients.list();
    console.log(JSON.stringify(items, null, 2));
  });

  cmd
    .command('create')
    .description('Create a client')
    .requiredOption('--name <name>', 'Client name')
    .option('--email <email>', 'Email')
    .option('--phone <phone>', 'Phone')
    .option('--address <address>', 'Address')
    .action(async (opts) => {
      const item = await client.clients.create({
        name: opts.name,
        email: opts.email,
        phone: opts.phone,
        address: opts.address,
      });
      console.log(JSON.stringify(item, null, 2));
    });

  return cmd;
}
