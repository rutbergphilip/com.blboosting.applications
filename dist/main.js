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
const menu_build_1 = require("./build/menu.build");
const discord_js_1 = require("discord.js");
const slashcommands_factory_1 = require("./events/interactions/slashcommands/slashcommands.factory");
const slashcommands_store_1 = require("./models/slashcommands.store");
const menu_factory_1 = require("./events/interactions/menu/menu.factory");
require('dotenv').config();
const client = new discord_js_1.Client({
    intents: new discord_js_1.Intents(32767),
    restTimeOffset: 0,
});
client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, slashcommands_factory_1.registerSlashCommands)();
    yield (0, menu_build_1.buildApplicationMenu)(client);
    console.log(`Logged in as ${client.user.tag}!`);
}));
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    switch (true) {
        case interaction.isCommand():
            // @ts-ignore
            yield slashcommands_store_1.slashcommands.get(interaction.commandName)(interaction);
            break;
        case interaction.isSelectMenu():
            yield (0, menu_factory_1.selectMenuDistribute)(interaction);
            break;
        default:
            break;
    }
}));
client.login(process.env.TOKEN);
