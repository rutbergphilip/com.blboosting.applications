import { ApplicationChoices } from './../../../../constants/application.enum';
import { ApplicationRepository } from './../../../../persistance/repositories/application.repository';
import { Colors } from './../../../../constants/colors.enum';
import { Emojis } from './../../../../constants/dev/emojis.enum';
import { MAIN_LOGO } from './../../../../constants/logo.constant';
import { Roles } from './../../../../constants/dev/roles.enum';
import {
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
  MessageEmbed,
  OverwriteResolvable,
  User,
} from 'discord.js';
import { ChannelTypes } from 'discord.js/typings/enums';
import { APIUser } from 'discord-api-types/v9';

export const advertiserApplication = async (
  interaction: MessageComponentInteraction
) => {
  await interaction.reply({
    content: `${Emojis.LOADING_GIF} creating ticket...`,
    ephemeral: true,
  });

  const applicant = interaction.member.user;
  // create a ticket channel with applicant as author
  const ticketChannel = await interaction.guild.channels.create(
    `adv-app-${applicant.username}`,
    {
      type: ChannelTypes.GUILD_TEXT,
      parent: '931847879402876939', // ticket category
      permissionOverwrites: channelPermissions(interaction, applicant),
    }
  );

  const repository = new ApplicationRepository();
  const result = await repository.insert({
    type: ApplicationChoices.ADVERTISER,
    applicantId: applicant.id,
    channelId: ticketChannel.id,
    isAccepted: false,
    isOpen: true,
    isArchived: false,
  });

  await ticketChannel.send({
    content: `Hello ${applicant}! Please begin by filling out the template below and <@&${Roles.MANAGEMENT}> will review you application as soon as possible.`,
    embeds: [embed()],
    components: [embedComponent()],
  });

  await interaction.editReply({
    content: `${Emojis.TADA} ticket created ${ticketChannel}!`,
  });
};

const embedComponent = (): MessageActionRow => {
  return new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId('close-channel')
      .setEmoji('🔒')
      .setLabel('Close')
      .setStyle('SECONDARY')
  );
};

const embed = (): MessageEmbed => {
  return new MessageEmbed()
    .setTitle('Advertiser Application')
    .setDescription(
      `To apply please fill out the form below:
\`\`\`
Bloodlust Boosting is a Horde only boosting commuinty - we accept gold as our only valid payment method for our services.
By filling this form out you agree to follow this rule.

Your battletag:
Main char Name-Realm:
How did you hear about us?
Do you agree to only advertise for Bloodlust if accepted?
Do you have any previous advertising experience?
\`\`\`

*If above is filled out properly and considered after review, you will be given a short test.*
`
    )
    .setFooter({ iconURL: MAIN_LOGO, text: 'Bloodlust Boosting' })
    .setTimestamp()
    .setColor(Colors.MAIN_RED);
};

const channelPermissions = (
  interaction: MessageComponentInteraction,
  applicant: User | APIUser
): OverwriteResolvable[] => {
  return [
    {
      id: interaction.guildId,
      deny: ['VIEW_CHANNEL'],
    },
    {
      id: applicant.id,
      allow: ['VIEW_CHANNEL'],
    },
    {
      id: Roles.DIRECTOR,
      allow: ['VIEW_CHANNEL'],
    },
    {
      id: Roles.SENIOR_MANAGEMENT,
      allow: [
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'MANAGE_MESSAGES',
        'MANAGE_CHANNELS',
        'READ_MESSAGE_HISTORY',
      ],
    },
    {
      id: Roles.MANAGEMENT,
      allow: [
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'MANAGE_MESSAGES',
        'MANAGE_CHANNELS',
        'READ_MESSAGE_HISTORY',
      ],
    },
  ];
};
