const express = require('express');
const userController = require('../controllers/userController');
const doctorController = require('../controllers/doctorController')
const {UserValidationResult, validate}  = require('../Middlewares/validation');
const auth = require('../Middlewares/authorization');

// make router On useing express
const router = express.Router();


router.get('/', (req ,res)=> {
    res.send('Hello worlid')
});

router.post('/register', UserValidationResult(), validate,  userController.register);
router.post('/login', userController.login);

router.put('/account/update', auth, userController.updateUser);
router.get('/me', auth, userController.me);
router.get('/get-profile', auth, userController.getProfile);
router.get('/get-doctor', auth, doctorController.index);

// delete user
router.delete('/delete-acount', auth, userController.deletePro);

module.exports = router;