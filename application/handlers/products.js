import Boom from 'boom';
import Product from './../models/product';

class Products {
  static register = [
    {
      method: 'POST',
      path: '/products',
      private: false,
      handler: Products.create,
    },
    {
      method: 'DELETE',
      path: '/products/{id}',
      handler: Products.delete,
    },
    {
      method: 'GET',
      path: '/products',
      handler: Products.list,
    },
    {
      method: 'GET',
      path: '/products/{id}',
      handler: Products.byId,
    },
  ]

  static async create(req) {
    try {
      const product = new Product(req.payload);
      return product.save();
    } catch(e) {
      return Boom.badRequest(e);
    }
  }

  static async delete(req) {
    try {
      const product = await Product.findById(req.params.id);
      return product.remove();
    } catch(e) {
      return Boom.badRequest(e);
    }
  }

  static async list(req) {
    try {
      if(req.query && req.query.q) {
        const { q } = req.query;

        const payload = await Product.find({
          '$text': {
            '$search': q,
          }
        });

        return { payload };
      }

      const payload = await Product.find({});
      return { payload };
    } catch(e) {
      return Boom.badRequest(e);
    }
  }

  static async byId(req, reply) {
    const { id } = req.params;

    try {
      const payload = await Product.findById(id);

      return payload
        ? { payload }
        : reply.response().code(204);
    } catch(e) {
      return reply.response().code(204);
    }
  }
}

export default Products;