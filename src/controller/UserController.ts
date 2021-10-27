import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import { validate } from 'class-validator';

export class UserController {
  private userRepository = getRepository(User);

  async remove(request: Request, response: Response, next: NextFunction) {
    const userToRemove = await this.userRepository.findOne(request.params.id);
    if (!userToRemove) {
      response.status(404);
      return { message: 'Unable to find the requested user.' };
    }
    try {
      await this.userRepository.remove(userToRemove);
      return { message: 'User has been removed.' };
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
      await this.userRepository.update(request.params.id, request.body);
      return this.userRepository.findOne(request.params.id);
    } catch (error) {
      response.status(400);
      return { message: 'Bad Request.' };
    }
  }
}