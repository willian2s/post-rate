import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import Post from '@src/models/Post.model';
import Rating from '@src/models/Rating.model';
import logger from '@src/logger';

type TPost = {
  title: string;
  body: string;
};

export const createPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { title, body }: TPost = req.body;
    const Repository = getRepository(Post);
    const post = Repository.create({
      title,
      body,
    });
    const errors = await validate(post);
    if (errors.length === 0) {
      const response = await Repository.save(post);
      return res.status(200).json({
        statusCode: 200,
        data: response,
      });
    }
    return res.status(400).json(errors.map(err => err.constraints));
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { title, body }: TPost = req.body;
    const { id } = req.params;
    const Repository = getRepository(Post);
    const post = Repository.create({
      title,
      body,
    });
    const errors = await validate(post, {
      skipMissingProperties: true,
    });
    if (errors.length === 0) {
      await Repository.update(id, { ...post });
      const response = await Repository.findOne(id);
      return res.status(200).json({
        statusCode: 200,
        data: response,
      });
    }
    return res.status(400).json(errors.map(err => err.constraints));
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params;
    const Repository = getRepository(Post);
    const RatingRepository = getRepository(Rating);
    const response = await Repository.findOne(id, { relations: ['rating'] });
    response?.rating.map(({ id }) => {
      RatingRepository.delete(id);
    });
    await Repository.delete(id);
    return res.status(200).json({
      statusCode: 200,
      data: 'Post successfully deleted',
    });
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
};

export const getPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params;
    const Repository = getRepository(Post);
    const response = await Repository.findOne(id, { relations: ['rating'] });

    let avaregeRating;
    if (response) {
      const rating = response.rating.map(p => p.rating);
      let sum = 0;
      for (let i = 0; i < rating.length; i++) {
        sum += rating[i];
      }
      avaregeRating = (sum / rating.length).toFixed(2);
    }

    return res.status(200).json({
      statusCode: 200,
      data: {
        ...response,
        avaregeRating,
      },
    });
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
};
