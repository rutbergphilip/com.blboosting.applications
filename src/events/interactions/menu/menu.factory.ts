import { advertiserApplication } from './choices/choice.advertiser';
import { MessageComponentInteraction, SelectMenuInteraction } from 'discord.js';
import { ApplicationChoices } from '../../../constants/application.enum';
import { mythicPlusApplication } from './choices/choice.mplus';

export const selectMenuDistribute = async (
  interaction: SelectMenuInteraction
) => {
  const choice = interaction.values[0];

  try {
    switch (choice) {
      case ApplicationChoices.ADVERTISER:
        await advertiserApplication(interaction);
        break;
      case ApplicationChoices.MYTHIC_PLUS:
        await mythicPlusApplication(interaction);
        break;
      case ApplicationChoices.RAID:
        break;
      case ApplicationChoices.PVP:
        break;
      case ApplicationChoices.MISC:
        break;
      case ApplicationChoices.RAID_LEADER:
        break;
      default:
        console.log('Unknown application choice', interaction.values[0]);
        break;
    }
  } catch (error) {
    console.log('Error in selectMenuDistribute', error);
  }
};
