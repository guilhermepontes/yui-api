import Boom from 'boom';
import Products from './../models/products';

export const plugin = {
  name: 'products',
  register: async (server, options) => {
    server.route({
      method: 'GET',
      path: '/products',
      handler: async () => {
        try {
          const payload = await Products.find({});
          return { payload };
        } catch(e) {
          return Boom.wrap(e);
        }
      },
    });

    server.route({
      method: 'POST',
      path: '/products',
      handler: async (req, reply) => {
        try {
          console.log(req);
          // const payload = Products.create(req.payload);
          // return { payload }
        } catch(e) {
          return Boom.wrap(e);
        }
      }
    });
  },
};