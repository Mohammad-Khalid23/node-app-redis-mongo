const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/',userController.listUser);
router.get('/:id',userController.getUser);
router.post('/', userController.createUser);

router.get('/postgress',userController.getUsers);

router.post('/postgress', userController.addUser);
router.put('/postgress', userController.updateUser);

module.exports = router;
