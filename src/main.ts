import { buildApplicationMenu } from './build/menu.build';
import { Client, Intents, SelectMenuInteraction } from 'discord.js';
import { registerSlashCommands } from './events/interactions/slashcommands/slashcommands.factory';
import { slashcommands } from './models/slashcommands.store';
import { selectMenuDistribute } from './events/interactions/menu/menu.factory';
require('dotenv').config();

const client = new Client({
  intents: new Intents(32767),
  restTimeOffset: 0,
});

client.on('ready', async () => {
  await registerSlashCommands();
  await buildApplicationMenu(client);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  switch (true) {
    case interaction.isCommand():
      // @ts-ignore
      await slashcommands.get(interaction.commandName)(interaction);
      break;
    case interaction.isSelectMenu():
      await selectMenuDistribute(<SelectMenuInteraction>interaction);
      break;
    case interaction.isButton():
      break;
    default:
      break;
  }
});

client.login(process.env.TOKEN);
