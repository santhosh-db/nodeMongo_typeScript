import express from 'express';
import UserController from '../controllers/UserController';
import { Schemas, ValidateJoi } from '../middleware/Joi';
const router = express.Router();

router.post('/create', ValidateJoi(Schemas.user.create), UserController.createUser);
router.get('/read/:id', UserController.readSingleUser);
router.get('/readAll', UserController.readAllUser);
router.put('/update/:id', ValidateJoi(Schemas.user.update), UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);

export default router;
