import { IEvent } from '../events/event.interface';
import { GuildMember, Interaction, Message } from 'discord.js';

export class InteractionCreateEvent implements IEvent {
    private readonly mythicPlusApplication = new MythicPlusApplicationInteraction();

    async run(interaction: Interaction): Promise<void> {
        if (!interaction.isMessageComponent()) {
            return;
        }
        try {
            await (<Message>interaction.message).delete();
        } catch (_e) {
            // Empty
        }
        const repository = new ApplicationRepository();
        const [action, objectId] = interaction.customId.split('-');
        const entity = await repository.get(objectId as ObjectId);
        const user = interaction.guild.members.cache.get(entity.applicantId);
        if (action === Action.DECLINE) {
            await this.onDeclineApplication(repository, entity, interaction, user);
            return;
        }

        switch (true) {
            case entity.type === ApplicationType.MYTHIC_PLUS:
                await this.mythicPlusApplication.run(entity, interaction, user, interaction.guild);
                break;
        }
        await user.send(`Hey ${user.nickname}, your ${entity.type} application was approved! Welcome to bloodlust!.`);
        entity.isAccepted = true;
        entity.isArchived = true;
        await repository.update(entity);
    }

    getEventName(): string {
        return 'interactionCreate';
    }

    private async onDeclineApplication(repository: ApplicationRepository, entity: ApplicationEntity,
                                       user: GuildMember): Promise<void> {
        if (user) {
            await user.send(`Hey ${user.nickname}, sorry but your ${entity.type} application was declined. Create a support ticket if you think this is not correct.`);
        }
        entity.isAccepted = false;
        entity.isArchived = true;
        await repository.update(entity);
    }
}