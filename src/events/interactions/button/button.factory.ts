import { closeChannel } from './button.close';
import { Action } from './../../../constants/action.enum';
import { ButtonInteraction } from 'discord.js';

export const buttonDistribute = async (interaction: ButtonInteraction) => {
  const id = interaction.customId.toLowerCase();
  try {
    switch (true) {
      case id.includes(Action.CLOSE_CHANNEL):
        await closeChannel(interaction);
        break;
      default:
        console.log('Unknown button id', interaction.customId);
        break;
    }
  } catch (error) {
    console.log('Error in buttonDistribute', error);
  }
};
