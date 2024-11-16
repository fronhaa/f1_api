import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

let router: Router = Router();

let usuarioController: UsuarioController = new UsuarioController();

router.get('/usuarios', usuarioController.list);
router.get('/usuarios/:id', usuarioController.find);
router.post('/usuarios', usuarioController.create);
router.put('/usuarios/:id', usuarioController.update);
router.delete('/usuarios/:id', usuarioController.delete);

export default router;
