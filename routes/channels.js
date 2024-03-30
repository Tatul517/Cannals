import { Router } from 'express';
import { create, getAll,remove,update } from '../controllers/channles.js';
const router = Router();

router.post('/', create);
router.get('/', getAll);
router.delete('/:id', remove); 
router.put('/:id', update);   

export default router;

