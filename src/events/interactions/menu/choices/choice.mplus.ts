import { applicationSuccessResponse } from './../../../../build/resposne.build';
import { createApplicationButtonRow } from './../../../../build/row.build';
import {
  LOGO_HORDE,
  LOGO_ALLIANCE,
} from './../../../../constants/logo.constant';
import { ChannelTypes } from 'discord.js/typings/enums';
import { ApplicationEntity } from './../../../../persistance/entites/application.entity';
import { Channels } from './../../../../constants/channels.enum';
import { Region } from './../../../../constants/region.enum';
import { ApplicationChoices } from './../../../../constants/application.enum';
import { ApplicationRepository } from '../../../../persistance/repositories/application.repository';
import { RaiderIoService } from '../../../../services/raiderio.service';
import { BLB_KEYS } from '../../../../constants/logo.constant';
import { Colors } from '../../../../constants/colors.enum';
import {
  Message,
  MessageComponentInteraction,
  MessageEmbed,
  TextChannel,
} from 'discord.js';
import { Emojis } from '../../../../constants/dev/emojis.enum';

export const mythicPlusApplication = async (
  interaction: MessageComponentInteraction
) => {
  const applicant = interaction.guild.members.cache.get(
    interaction.member.user.id
  );

  await interaction.reply({
    content: `${Emojis.LOADING_GIF} dm'ing you with further instructions...`,
    ephemeral: true,
  });

  const dmChannel = await applicant.createDM();
  // `Hello ${applicant} and thank you for showing interest in Bloodlust Boosting!`
  const message = await dmChannel.send({
    embeds: [
      new MessageEmbed()
        .setTitle('Mythic Plus Application')
        .setDescription(
          `Hello ${applicant} and thank you for showing interest in Bloodlust Boosting!

Please link [Raider.io](https://raider.io) of the character you wish to apply with.

*You only need to link the main character, you can get roles for other characters once accepted.*
      `
        )
        .setColor(Colors.BLB_MPLUS)
        .setFooter({
          iconURL: BLB_KEYS,
          text: 'Bloodlust Boosting',
        }),
    ],
  });

  await interaction.editReply({ content: `[Jump](${message.url}) to message` });

  dmChannel
    .awaitMessages({
      filter,
      max: 1,
      time: 120000,
      errors: ['time'],
    })
    .then(async (message) => {
      const content = message.first().content;
      const character = content.match(
        /(http[s]?:\/\/|www.)raider.io\/characters\/([\S]+)\/([\S]+)\/([^#?\s]+)/
      );

      const response = await RaiderIoService.getCharacter(
        character[2],
        character[3],
        character[4]
      );

      const repository = new ApplicationRepository();

      const result = await repository.insert({
        type: ApplicationChoices.MYTHIC_PLUS,
        applicantId: applicant.id,
        managerId: null,
        channelId: dmChannel.id,
        isAccepted: false,
        isArchived: false,
        isOpen: true,
        character: {
          name: response.name,
          realm: response.realm,
          faction: response.faction,
          region: Region.EU,
          scores: {
            tank: response.mythic_plus_scores_by_season[0].scores.tank,
            healer: response.mythic_plus_scores_by_season[0].scores.healer,
            dps: response.mythic_plus_scores_by_season[0].scores.dps,
          },
        },
      });

      const applicationsChannel = <TextChannel>(
        interaction.guild.channels.cache.get(Channels.APPLICATION_HANDLE)
      );

      await applicationsChannel.send({
        embeds: [createApplicationEmbed(result)],
        components: [createApplicationButtonRow(result)],
      });

      await dmChannel.send({
        embeds: [applicationSuccessResponse(result)],
      });
    })
    .catch(async (message) => {
      console.log(message);
      await dmChannel.send({
        content:
          message.response?.status === 400
            ? 'Hmm, I could not find that character... Check the link you provided and try again. If the problem persists, contact a staff member in <#830854261616934972>.'
            : message.response
            ? 'An unknown error occured, please try again later or contact support.'
            : 'Session timed out... If you still wish to apply, please redo the process.',
      });
    });
};

const filter = (message: Message) => {
  return /(http[s]?:\/\/|www.)raider.io\/characters\/([\S]+)\/([\S]+)\/([^#?\s]+)/.test(
    message.content.trim()
  );
};

const createApplicationEmbed = (application: ApplicationEntity) => {
  return new MessageEmbed()
    .setTitle('Mythic Plus Application')
    .setThumbnail(
      application.character.faction.toUpperCase() === 'HORDE'
        ? LOGO_HORDE
        : LOGO_ALLIANCE
    )
    .addFields(
      {
        name: 'Name',
        value: application.character.name,
        inline: true,
      },
      {
        name: 'Realm',
        value: application.character.realm,
        inline: true,
      },
      {
        name: 'Region',
        value: application.character.region.toUpperCase(),
        inline: true,
      },
      {
        name: 'Tank',
        value: application.character.scores.tank.toString(),
        inline: true,
      },
      {
        name: 'Healer',
        value: application.character.scores.healer.toString(),
        inline: true,
      },
      {
        name: 'DPS',
        value: application.character.scores.dps.toString(),
        inline: true,
      }
    )
    .setColor(Colors.BLB_MPLUS);
};
