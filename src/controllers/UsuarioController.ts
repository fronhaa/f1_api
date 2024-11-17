import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';

export class UsuarioController {

  async list (req: Request, res: Response): Promise<Response> {
    let users: Usuario[] = await Usuario.find();

    return res.status(200).json(users);
  }

  async find (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let usuario: Usuario|null = await Usuario.findOneBy({ id });
    if (! usuario) {
      return res.status(422).json({ error: 'Usuario não encontrado!' });
    }

    return res.status(200).json(usuario);
  }

  async create(data: any): Promise<Usuario> {
    console.log('Criando usuário com os dados:', data);

    let usuario: Usuario = await Usuario.create({
      nome: data.nome,
      email: data.email,
      senha: data.senha,
    }).save();

    return usuario;
  }

  async update (req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let usuario: Usuario|null = await Usuario.findOneBy({ id });
    if (! usuario) {
      return res.status(422).json({ error: 'Usuario não encontrado!' });
    }

    usuario.nome = body.nome;
    usuario.email = body.email;
    usuario.senha = body.senha;
    await usuario.save();

    return res.status(200).json(usuario);
  }

  async delete (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let usuario: Usuario|null = await Usuario.findOneBy({ id });
    if (! usuario) {
      return res.status(422).json({ error: 'Usuario não encontrado!' });
    }

    usuario.remove();

    return res.status(200).json();
  }

}
