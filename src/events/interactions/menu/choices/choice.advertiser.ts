import { Colors } from './../../../../constants/colors.enum';
import { Emojis } from './../../../../constants/dev/emojis.enum';
import { MAIN_LOGO } from './../../../../constants/logo.constant';
import { Roles } from './../../../../constants/dev/roles.enum';
import {
  Guild,
  GuildMember,
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
    `ticket-${applicant.id}`,
    {
      type: ChannelTypes.GUILD_TEXT,
      parent: '931847879402876939', // ticket category
      permissionOverwrites: channelPermissions(interaction, applicant),
    }
  );

  // send an application embed with information and question forms
  // add buttons on the embed for closing the application
  const applicationEmbed = await ticketChannel.send({
    content: `Hello ${applicant}! Please begin by filling out the template below and <@&${Roles.MANAGEMENT}> will review you application as soon as possible.`,
    embeds: [embed()],
    components: [embedComponent()],
  });

  await interaction.editReply({
    content: `${Emojis.TADA} ticket created ${ticketChannel}!`,
  });

  // save the ticket channel to mongodb

  // once ticket is closed, set the ticket to "closed" and set who closed it in mongodb
  // if the applicant is not in the guild, remove the ticket from mongodb
};

const embedComponent = () => {
  return new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId('close_channel')
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
