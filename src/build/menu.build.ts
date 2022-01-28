import {
  Client,
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
  TextChannel,
} from 'discord.js';
import { Channels } from '../constants/channels.enum';

export const buildApplicationMenu = async (client: Client) => {
  try {
    const channel = <TextChannel>(
      client.channels.cache.get(Channels.APPLY_TO_US)
    );
    const embed = new MessageEmbed().setColor('#DD0044').setTitle('Information')
      .setDescription(`
[Requirements](https://discord.com/channels/931233817941901392/931685684933197894/931685697545445407) - Minimum requirements to apply.
[FAQ](https://discord.com/channels/931233817941901392/931685684933197894/931685697545445407) - Frequently asked questions.
[Mythic Plus Guidelines](https://discord.com/channels/931233817941901392/931685684933197894/931685697545445407) - Guidelines for Mythic Plus boosters.
[Raid Guidelines](https://discord.com/channels/931233817941901392/931685684933197894/931685697545445407) - Guidelines for Raid boosters.

Select what you wish to apply for and follow the instructions given.
      `);

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('applications')
        .setPlaceholder('What do you wish to apply for?')
        .setMaxValues(1)
        .addOptions([
          {
            label: 'Advertiser',
            value: 'advertiser',
            emoji: '<:Advertiser:931681778945626163>',
          },
          {
            label: 'Mythic Plus Booster',
            value: 'mplus',
            emoji: '<:BLB_Keys:931678617379962890>',
          },
          {
            label: 'Raid Booster',
            value: 'raid',
            emoji: '<:BLB_Raid:931678618084581376>',
          },
          {
            label: 'PVP Booster',
            value: 'pvp',
            emoji: '<:BLB_PvP:931679776576536626>',
          },
          {
            label: 'Misc Booster',
            value: 'misc',
            emoji: '<:BLB_Misc:931678617925210132>',
          },
          {
            label: 'Raid Leader',
            value: 'raidleader',
            emoji: '<:BLB_Raid:931678618084581376>',
          },
        ])
    );
    const message = (await channel.messages.fetchPinned())?.first();
    message.embeds.length > 0
      ? await message.edit({ embeds: [embed], components: [row] })
      : (await channel.send({ embeds: [embed], components: [row] })).pin();
  } catch (error) {
    console.log(error);
  }
};
