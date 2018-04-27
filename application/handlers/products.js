import Boom from 'boom';
import Product from './../models/product';

class Products {
  static register = [
    {
      method: 'POST',
      path: '/products',
      handler: Products.create,
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

  static async byId(req) {
    try {
      const payload = await Product.findById(req.params.id);
      return { payload };
    } catch(e) {
      return Boom.badRequest('Product {id} not found.');
    }
  }
}

export default Products;