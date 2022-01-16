"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.advertiserApplication = void 0;
const application_enum_1 = require("./../../../../constants/application.enum");
const application_repository_1 = require("./../../../../persistance/repositories/application.repository");
const colors_enum_1 = require("./../../../../constants/colors.enum");
const emojis_enum_1 = require("./../../../../constants/dev/emojis.enum");
const logo_constant_1 = require("./../../../../constants/logo.constant");
const roles_enum_1 = require("./../../../../constants/dev/roles.enum");
const discord_js_1 = require("discord.js");
const advertiserApplication = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    yield interaction.reply({
        content: `${emojis_enum_1.Emojis.LOADING_GIF} creating ticket...`,
        ephemeral: true,
    });
    const applicant = interaction.member.user;
    // create a ticket channel with applicant as author
    const ticketChannel = yield interaction.guild.channels.create(`adv-app-${applicant.username}`, {
        type: 0 /* GUILD_TEXT */,
        parent: '931847879402876939',
        permissionOverwrites: channelPermissions(interaction, applicant),
    });
    const repository = new application_repository_1.ApplicationRepository();
    const result = yield repository.insert({
        type: application_enum_1.ApplicationChoices.ADVERTISER,
        applicantId: applicant.id,
        channelId: ticketChannel.id,
        isAccepted: false,
        isOpen: true,
        isArchived: false,
    });
    yield ticketChannel.send({
        content: `Hello ${applicant}! Please begin by filling out the template below and <@&${roles_enum_1.Roles.MANAGEMENT}> will review you application as soon as possible.`,
        embeds: [embed()],
        components: [embedComponent()],
    });
    yield interaction.editReply({
        content: `${emojis_enum_1.Emojis.TADA} ticket created ${ticketChannel}!`,
    });
});
exports.advertiserApplication = advertiserApplication;
const embedComponent = () => {
    return new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
        .setCustomId('close_channel')
        .setEmoji('🔒')
        .setLabel('Close')
        .setStyle('SECONDARY'));
};
const embed = () => {
    return new discord_js_1.MessageEmbed()
        .setTitle('Advertiser Application')
        .setDescription(`To apply please fill out the form below:
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
`)
        .setFooter({ iconURL: logo_constant_1.MAIN_LOGO, text: 'Bloodlust Boosting' })
        .setTimestamp()
        .setColor(colors_enum_1.Colors.MAIN_RED);
};
const channelPermissions = (interaction, applicant) => {
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
            id: roles_enum_1.Roles.DIRECTOR,
            allow: ['VIEW_CHANNEL'],
        },
        {
            id: roles_enum_1.Roles.SENIOR_MANAGEMENT,
            allow: [
                'VIEW_CHANNEL',
                'SEND_MESSAGES',
                'MANAGE_MESSAGES',
                'MANAGE_CHANNELS',
                'READ_MESSAGE_HISTORY',
            ],
        },
        {
            id: roles_enum_1.Roles.MANAGEMENT,
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
