const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userControllers');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.get('/getall',  advancedResults(User), getUsers);
router.post('/create', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


// router
//   .route('/')
//   .get(advancedResults(User), getUsers)
//   .post(createUser);



// router
//   .route('/:id')
//   .get(getUser)
//   .put(updateUser)
//   .delete(deleteUser);

module.exports = router;
