import Express from 'express';

import Validator from '../config/validator';

import userController from '../controllers/userController';
import categoryController from '../controllers/categoryController';
import postController from '../controllers/postController';

const router = Express.Router();

// User Routes
router.post('/User', Validator.userValidation('Create'), userController.Create);
router.post('/Follow/:followerId', userController.Follow);
router.get('/User', userController.findOne);
router.get('/Users', userController.findAll);
router.put('/User/:userId', Validator.userValidation('Update'), userController.Update);
router.delete('/User', userController.Destroy);
router.delete('/Unfollow/:followerId', userController.Unfollow);

// Post Routes
router.post('/Post', Validator.postValidation('Create'), postController.Create);
router.get('/Post', postController.findOne);
router.get('/Posts', postController.findAll);
router.put('/Post/:postId', Validator.postValidation('Update'), postController.Update);
router.delete('/Post', postController.Destroy);

// Category Routes
router.post('/Category', categoryController.Create);
router.get('/Category', categoryController.findOne);
router.get('/Categories', categoryController.findAll);
router.put('/Category/:categoryId', categoryController.Update);
router.delete('/Category', categoryController.Destroy);



export default router;
