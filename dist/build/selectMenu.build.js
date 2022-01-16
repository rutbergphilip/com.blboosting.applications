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
exports.buildApplicationMenu = void 0;
const discord_js_1 = require("discord.js");
const channels_enum_1 = require("../constants/channels.enum");
const buildApplicationMenu = (client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const channel = (client.channels.cache.get(channels_enum_1.Channels.APPLY_TO_US));
        const embed = new discord_js_1.MessageEmbed().setColor('#DD0044').setTitle('Information')
            .setDescription(`
[Requirements](https://discord.com/channels/931233817941901392/931685684933197894/931685697545445407) - Minimum requirements to apply.
[FAQ](https://discord.com/channels/931233817941901392/931685684933197894/931685697545445407) - Frequently asked questions.
[Mythic Plus Guidelines](https://discord.com/channels/931233817941901392/931685684933197894/931685697545445407) - Guidelines for Mythic Plus boosters.
[Raid Guidelines](https://discord.com/channels/931233817941901392/931685684933197894/931685697545445407) - Guidelines for Raid boosters.

Select what you wish to apply for and follow the instructions given.
      `);
        const row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
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
        ]));
        const message = (_a = (yield channel.messages.fetchPinned())) === null || _a === void 0 ? void 0 : _a.first();
        message.embeds.length > 0
            ? yield message.edit({ embeds: [embed], components: [row] })
            : yield channel.send({ embeds: [embed], components: [row] });
    }
    catch (error) {
        console.log(error);
    }
});
exports.buildApplicationMenu = buildApplicationMenu;
