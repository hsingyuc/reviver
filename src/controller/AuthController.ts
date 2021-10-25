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

		// encrypt the password

		// create user

		// save user
	}
}