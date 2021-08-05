import { Router } from 'express';
import postRoutes from './Post.router';
import ratingRoutes from './Rating.router';

const routes = Router();

routes.use('/post', postRoutes);
routes.use('/rating', ratingRoutes);

export default routes;
