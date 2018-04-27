import mongoose from 'mongoose';
import Hapi from 'hapi';
import fs from 'fs';
import config from './config';

class Server {
  constructor(service) {
    this.instance = service.server(config.server);
  }

  loadMongoose() {
    mongoose.connect(config.mongodb.uri);
  }

  loadClasses() {
    const folder = './application/handlers/';
    const classes = [];

    fs.readdirSync(folder).forEach(file => {
      classes.push(require(folder + file));
    });

    return classes;
  }

  getHandlers() {
    const classes = this.loadClasses();

    const handlers = classes.map(({ default: instance }) => ({
      plugin: {
        name: instance.name,
        register: async (server, options) => {
          instance.register.map(item => server.route(item))
        },
      },
    }));

    return handlers;
  }

  async start() {
    this.loadMongoose();

    await this.instance.register(this.getHandlers());
    await this.instance.start();

    console.log(`Server running at: ${this.instance.info.uri}`);
  }
}

new Server(Hapi).start();
