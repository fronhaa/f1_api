import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';
import DataController from '../controllers/DataController';

let router: Router = Router();

let usuarioController: UsuarioController = new UsuarioController();


router.get('/usuarios', usuarioController.list);
router.get('/usuarios/:id', usuarioController.find);
router.post('/usuarios', DataController.insertData);
router.put('/usuarios/:id', usuarioController.update);
router.delete('/usuarios/:id', usuarioController.delete);

export default router;