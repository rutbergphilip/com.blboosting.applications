import { MessageActionRow, MessageButton } from 'discord.js';
import { ApplicationEntity } from '../persistance/entites/application.entity';

export const createApplicationButtonRow = (application: ApplicationEntity) => {
  return new MessageActionRow().addComponents([
    new MessageButton()
      .setCustomId(`accept-${application._id}`)
      .setLabel('Accept')
      .setStyle('SUCCESS'),
    new MessageButton()
      .setCustomId(`reject-${application._id}`)
      .setLabel('Reject')
      .setStyle('DANGER'),
  ]);
};
