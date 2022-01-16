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
exports.buttonDistribute = void 0;
const button_close_1 = require("./button.close");
const action_enum_1 = require("./../../../constants/action.enum");
const buttonDistribute = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        switch (interaction.customId) {
            case action_enum_1.Action.CLOSE_CHANNEL:
                yield (0, button_close_1.closeChannel)(interaction);
                break;
            default:
                console.log('Unknown button id', interaction.customId);
                break;
        }
    }
    catch (error) {
        console.log('Error in buttonDistribute', error);
    }
});
exports.buttonDistribute = buttonDistribute;
