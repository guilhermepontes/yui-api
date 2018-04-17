import Boom from 'boom';
import Product from './../models/product';

export const plugin = {
  name: 'products',
  register: async (server, options) => {
    server.route({
      method: 'GET',
      path: '/products',
      handler: async () => {
        try {
          const payload = await Product.find({});
          return { payload };
        } catch(e) {
          return Boom.badRequest(e);
        }
      },
    });

    server.route({
      method: 'POST',
      path: '/products',
      handler: async (req, reply) => {
        try {
          return new Product(req.payload).save();
        } catch(e) {
          return Boom.badRequest(e);
        }
      }
    });
  },
};