import { ButtonInteraction } from 'discord.js';
import { ApplicationChoices } from '../../../constants/application.enum';

export const selectMenuDistribute = async (interaction: ButtonInteraction) => {
  try {
    switch (interaction.customId) {
      case ApplicationChoices.ADVERTISER:
        break;
      default:
        console.log('Unknown button id', interaction.customId);
        break;
    }
  } catch (error) {
    console.log('Error in selectMenuDistribute', error);
  }
};
