import express from 'express';
import { getPosts, createPost, UpdatePost, deletePost, LikePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', UpdatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likes/:type', LikePost);






export default router;