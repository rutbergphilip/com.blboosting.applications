import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { slashcommands } from '../../../models/slashcommands.store';
import fs from 'fs';
import path from 'path';
require('dotenv').config();

export const registerSlashCommands = async () => {
  return;
  const commands = [];
  const commandFiles = fs
    .readdirSync(path.join(__dirname, '../slashcommands/register'))
    .filter((file) => file.endsWith('.js'));

  const clientId = '931234179847442482';
  const guildId = '931233817941901392';

  for (const file of commandFiles) {
    const command = require(path.join(
      __dirname,
      `../slashcommands/register/${file}`
    ));
    commands.push(command.toJSON());
  }

  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

  if (commands.length === 0) {
    return console.log('No commands to register.');
  }

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }

  fs.readdirSync(path.join(__dirname, '../slashcommands/handle')).map(
    (file) => {
      return slashcommands.set(
        file.replace('.js', ''),
        require(path.join(__dirname, `../slashcommands/handle/${file}`))
      );
    }
  );
};
