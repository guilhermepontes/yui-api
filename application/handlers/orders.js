import Boom from 'boom';
import Order from './../models/order';

class Orders {
  static register = [
    {
      method: 'GET',
      path: '/orders',
      handler: Orders.list,
    },
  ]

  static async list() {
    try {
      const payload = await Order.find({});
      return { payload };
    } catch(e) {
      Boom.badRequest(e);
    }
  }
}

export default Orders;