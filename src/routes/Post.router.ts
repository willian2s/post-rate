import { Router } from 'express';
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
} from '@src/controllers/Post.controller';

const postRoutes = Router();

postRoutes.post('/', createPost);
postRoutes.get('/:id', getPost);
postRoutes.patch('/:id', updatePost);
postRoutes.delete('/:id', deletePost);

export default postRoutes;
