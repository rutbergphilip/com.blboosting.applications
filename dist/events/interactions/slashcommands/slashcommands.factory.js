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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSlashCommands = void 0;
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const slashcommands_store_1 = require("../../../models/slashcommands.store");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
require('dotenv').config();
const registerSlashCommands = () => __awaiter(void 0, void 0, void 0, function* () {
    return;
    const commands = [];
    const commandFiles = fs_1.default
        .readdirSync(path_1.default.join(__dirname, '../slashcommands/register'))
        .filter((file) => file.endsWith('.js'));
    const clientId = '931234179847442482';
    const guildId = '931233817941901392';
    for (const file of commandFiles) {
        const command = require(path_1.default.join(__dirname, `../slashcommands/register/${file}`));
        commands.push(command.toJSON());
    }
    const rest = new rest_1.REST({ version: '9' }).setToken(process.env.TOKEN);
    if (commands.length === 0) {
        return console.log('No commands to register.');
    }
    try {
        console.log('Started refreshing application (/) commands.');
        yield rest.put(v9_1.Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
    fs_1.default.readdirSync(path_1.default.join(__dirname, '../slashcommands/handle')).map((file) => {
        return slashcommands_store_1.slashcommands.set(file.replace('.js', ''), require(path_1.default.join(__dirname, `../slashcommands/handle/${file}`)));
    });
});
exports.registerSlashCommands = registerSlashCommands;
