import logger from '@src/logger';
import Rating from '@src/models/Rating.model';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

type TRating = {
  userName: string;
  rating: number;
  post: string | any;
};

export const createRating = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { userName, rating, post }: TRating = req.body;
    const Repository = getRepository(Rating);
    const ratingObj = Repository.create({
      userName,
      rating,
      post,
    });
    const errors = await validate(ratingObj);
    if (errors.length === 0) {
      const response = await Repository.save(ratingObj);
      return res.status(200).json(response);
    }
    return res.status(400).json(errors.map(err => err.constraints));
  } catch (error) {
    logger.error(error);
    if (error.code === '23505')
      res.status(400).json({ message: 'User has already rated this post!' });
    return res.status(400).send(error);
  }
};
