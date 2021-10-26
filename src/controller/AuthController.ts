import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Request, Response } from 'express';
import { validate } from 'class-validator';

export class AuthController {
	private userRepository = getRepository(User);

	async register(request: Request, response: Response) {
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
}