import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import { validate } from 'class-validator';

export class UserController {
  private userRepository = getRepository(User);

  async one(request: Request, response: Response, next: NextFunction) {
    const foundUser = await this.userRepository.findOne(request.params.id);

    if (!foundUser) {
      response.status(404);
      return { message: 'Unable to find the requested user.' };
    }
    return foundUser;
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const userCreated = this.userRepository.create(request.body);
    const errors = await validate(userCreated, { validationError: { target: false } });

    if (errors.length > 0) {
      response.status(422);
      return { message: 'Please provide valid user fields.', errors };
    }
    try {
      await this.userRepository.save(userCreated);
      return { message: 'User created.', user: userCreated };
    } catch (error) {
      response.status(500);
      return { message: 'Internal Server Error.' };
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const userToRemove = await this.userRepository.findOne(request.params.id);
    if (!userToRemove) {
      response.status(404);
      return { message: 'Unable to find the requested user.' };
    }
    try {
      await this.userRepository.remove(userToRemove);
      return { message: `${userToRemove.accountName} has been removed.` };
    } catch (error) {
      response.status(400);
      return { message: 'Bad Request.' };
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const userToUpdate = await this.userRepository.findOne(request.params.id);

    if (!userToUpdate) {
      response.status(404);
      return { message: 'Unable to find the requested user.' };
    }
    try {
      await this.userRepository.update(userToUpdate, request.body);
      return this.userRepository.findOne(request.params.id);
    } catch (error) {
      response.status(400);
      return { message: 'Bad Request.' };
    }
  }
}