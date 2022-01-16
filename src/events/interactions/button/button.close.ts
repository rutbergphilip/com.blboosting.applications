import { ApplicationRepository } from './../../../persistance/repositories/application.repository';
import { ButtonInteraction, MessageEmbed } from 'discord.js';

export const closeChannel = async (interaction: ButtonInteraction) => {
  await interaction.deferReply();
  const repository = new ApplicationRepository();
  const application = await repository.getByChannelId(interaction.channel.id);
  if (application) {
    application.isOpen = false;
    application.isArchived = true;
    await repository.update(application);
  }
  await interaction.editReply({
    embeds: [
      new MessageEmbed()
        .setDescription('Closing channel...')
        .setColor('YELLOW'),
    ],
  });
  setTimeout(() => {
    interaction.channel.delete();
  }, 5000);
};
