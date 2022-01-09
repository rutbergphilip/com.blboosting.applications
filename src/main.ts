import { IEvent } from './interfaces/event.interface';
import { Client, Intents } from 'discord.js';

require('dotenv').config();

class Main {
  private readonly client: Client;
  private readonly events: Map<string, IEvent>;

  constructor() {
    this.client = new Client({
      intents: new Intents(Number(process.env.INTENTS)),
      restTimeOffset: 0,
    });

    this.events.forEach((value, key) => {
      try {
        this.client.on(key, value.run.bind(value, this.client));
      } catch (error) {
        console.error(`Event: ${key} crashed`);
      }
    });

    this.client.login(process.env.TOKEN).catch(console.error);
  }
}

new Main();
