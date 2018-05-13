import mongoose from 'mongoose';
import Hapi from 'hapi';
import AuthBearer from 'hapi-auth-bearer-token';
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
          instance.register.map(item => {
            item.config = {};
            item.config.auth = {
              strategy: 'simple',
              mode: !!item.private ? 'required' : 'optional',
            }

            delete item.private;

            return server.route(item)
          });
        },
      },
    }));

    return handlers;
  }

  async setupAuth() {
    await this.instance.register(AuthBearer);

    this.instance.auth.strategy('simple', 'bearer-access-token', {
      allowQueryToken: true,
      validate: async (request, token) => {
        const isValid = token === '1234';

        const credentials = { token };
        const artifacts = { test: 'info' };

        return { isValid, credentials, artifacts };
      }
    });

    this.instance.auth.default('simple');
  }

  async start() {
    this.loadMongoose();

    await this.setupAuth();
    await this.instance.register(this.getHandlers());
    await this.instance.start();

    console.log(`Server running at: ${this.instance.info.uri}`);
  }
}

new Server(Hapi).start();
