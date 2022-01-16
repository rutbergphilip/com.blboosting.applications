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
exports.selectMenuDistribute = void 0;
const choice_advertiser_1 = require("./choices/choice.advertiser");
const application_enum_1 = require("../../../constants/application.enum");
const selectMenuDistribute = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const choice = interaction.values[0];
    try {
        switch (choice) {
            case application_enum_1.ApplicationChoices.ADVERTISER:
                yield (0, choice_advertiser_1.advertiserApplication)(interaction);
                break;
            case application_enum_1.ApplicationChoices.MYTHIC_PLUS:
                break;
            case application_enum_1.ApplicationChoices.RAID:
                break;
            case application_enum_1.ApplicationChoices.PVP:
                break;
            case application_enum_1.ApplicationChoices.MISC:
                break;
            case application_enum_1.ApplicationChoices.RAID_LEADER:
                break;
            default:
                console.log('Unknown application choice', interaction.customId);
                break;
        }
    }
    catch (error) {
        console.log('Error in selectMenuDistribute', error);
    }
});
exports.selectMenuDistribute = selectMenuDistribute;
