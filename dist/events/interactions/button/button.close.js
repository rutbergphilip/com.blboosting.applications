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
exports.closeChannel = void 0;
const application_repository_1 = require("./../../../persistance/repositories/application.repository");
const discord_js_1 = require("discord.js");
const closeChannel = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    yield interaction.deferReply();
    const repository = new application_repository_1.ApplicationRepository();
    const application = yield repository.getByChannelId(interaction.channel.id);
    if (application) {
        application.isOpen = false;
        application.isArchived = true;
        yield repository.update(application);
    }
    yield interaction.editReply({
        embeds: [
            new discord_js_1.MessageEmbed()
                .setDescription('Closing channel...')
                .setColor('YELLOW'),
        ],
    });
    setTimeout(() => {
        interaction.channel.delete();
    }, 5000);
});
exports.closeChannel = closeChannel;
