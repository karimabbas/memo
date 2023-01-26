import express from 'express';
import { getPosts, createPost, UpdatePost, deletePost, LikePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, UpdatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likes/:type', auth, LikePost);






export default router;