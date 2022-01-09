import { IEvent } from './event.interface';
import { ReadyEvent } from './ready/ready.event';
import { InteractionCreateEvent } from './interactionCreate/interactionCreate.event';

const events = [new ReadyEvent(), new InteractionCreateEvent()];

export class EventFactory {
  static getEvents(): Map<string, IEvent> {
    return events.reduce((map, event) => {
      return map.set(event.getEventName(), event);
    }, new Map<string, IEvent>());
  }
}
