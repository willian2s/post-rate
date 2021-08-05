import { createRating } from '@src/controllers/Rating.controller';
import { Router } from 'express';

const ratingRoutes = Router();

ratingRoutes.post('/', createRating);

export default ratingRoutes;
