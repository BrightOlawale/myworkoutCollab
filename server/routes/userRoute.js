const express = require('express');
const { getUsers, getUser, createUser, updateUser, deleteUser, loginUser, logoutUser } = require('../controllers/usersController');
const authHelpers = require('../middleware/authMiddleware');


const router = express.Router();


router.route('/').post(createUser);
// router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
router.route('/login').post(loginUser);
router.route('/profile').get(authHelpers.authenticateToken, getUser);
router.route('/profile/update').put(authHelpers.authenticateToken, updateUser);
router.route('/profile/delete').delete(authHelpers.authenticateToken, deleteUser);
router.route('/profile/logout').get(authHelpers.authenticateToken,       logoutUser);

module.exports = router;