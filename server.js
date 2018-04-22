import mongoose from 'mongoose';
import Hapi from 'hapi';
import fs from 'fs';
import config from './config';

class Server {
  constructor(service) {
    this.instance = service.server(config.server);

    this.loadMongoose();
  }

  loadMongoose() {
    mongoose.connect(config.mongodb.uri);
  }

  loadHandlers() {
    const folder = './application/handlers/';
    const handlers = [];

    fs.readdirSync(folder).forEach(file => {
      handlers.push(require(folder + file));
    });

    return handlers;
  }

  async start() {
    await this.instance.register(this.loadHandlers());
    await this.instance.start();

    console.log(`Server running at: ${this.instance.info.uri}`);
  }
}

new Server(Hapi).start();
