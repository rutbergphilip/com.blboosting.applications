import { BLB_KEYS } from './../constants/logo.constant';
import { Emojis } from '../constants/emojis.enum';
import { MessageEmbed } from 'discord.js';
import { ApplicationEntity } from '../persistance/entites/application.entity';

export const applicationSuccessResponse = (application: ApplicationEntity) => {
  return new MessageEmbed()
    .setTitle('Mythic Plus Application')
    .setDescription(
      `${Emojis.TADA} Success! ${Emojis.TADA}

Your application has been submitted successfully!

We will review your application as soon as we can and get back to you.

**Your application ID is: \`${application._id.toString()}\`**
`
    )
    .setColor('GREEN')
    .setFooter({
      iconURL: BLB_KEYS,
      text: 'Bloodlust Boosting',
    });
};
