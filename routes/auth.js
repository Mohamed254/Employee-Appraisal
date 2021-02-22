const express = require('express');
const { register, login, getMe, forgotPassword, resetPassword, updateDetails, updatePassword, getUsers, deleteUser, Reset_Password, sendResetLink } = require('../controllers/auth');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/getusers', protect, authorize('admin'), getUsers);
router.put('/:id', protect, authorize('admin', 'user'), updateDetails);
router.delete('/:id', protect, authorize('admin'), deleteUser);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotPassword', forgotPassword);
router.post('/sendResetLink', sendResetLink);
router.post('/ResetPassword', Reset_Password);
router.put('/resetpassword/:resettoken', resetPassword);


module.exports = router;