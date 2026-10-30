import * as Yup from 'yup';
import Product from '../models/Product.js';

class OrderController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        ),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { userId, userName } = request;
    const { products } = request.body;

    const fidedProducts = await Product.findAll({})

    const order = {
      user: {
        id: userId,
        name: userName,
      },
      products,
    };

    return response.status(201).json(order);
  }
}

export default new OrderController();
