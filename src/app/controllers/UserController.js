import { v4 } from 'uuid';
import User from '../models/User.js';

/**
 * store -> cria dado
 * index -> lista todos os dados
 * show -> lista um dado especifico
 * update -> atualiza dados
 * delete -> remover um dado
 */
class UserController {
  async store(request, response) {
    console.log( 'REQUEST', request.body)
    const {name, email, password_hash, admin} = request.body


    const user = await User.create({
        id: v4(),
        name,
        email,
        password_hash,
        admin,
    });

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }
}
export default new UserController();
