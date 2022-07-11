import express from 'express';
import { createPost, deletePost, getAllPosts, updatePost } from '../Controllers/PostController.js';

const router = express.Router();

router.post('/', createPost);

// router.get('/:id', getPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);


router.get('/timeline', getAllPosts);

export default router;
