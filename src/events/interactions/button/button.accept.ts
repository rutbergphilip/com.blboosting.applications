import { ApplicationRepository } from './../../../persistance/repositories/application.repository';
import { ButtonInteraction, MessageEmbed } from 'discord.js';

export const acceptApplication = async (interaction: ButtonInteraction) => {
  await interaction.deferReply({ ephemeral: true });
  const repository = new ApplicationRepository();

  // const application = await repository.get();
};
