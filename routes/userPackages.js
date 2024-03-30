import express from 'express';
import {
    createUserPachage,
    login,
    readUserPackage,
    updateUserPackage,
    deleteUserPackage
} from '../controllers/userPackages.js';

const router = express.Router();

router.post('/', createUserPachage);

router.post('/login', login);

router.get('/', readUserPackage);

router.put('/:id', updateUserPackage);

router.delete('/:id', deleteUserPackage);

export default router;
