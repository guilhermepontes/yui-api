import Boom from 'boom';
import Product from './../models/product';

class Categories {
  static register = [
    {
      method: 'GET',
      path: '/categories',
      handler: Categories.list,
    },
  ]

  static async list() {
    try {
      const payload = await Product.find({}).distinct('category');
      return { payload };
    } catch(e) {
      return Boom.badRequest(e);
    }
  }
}

export default Categories;