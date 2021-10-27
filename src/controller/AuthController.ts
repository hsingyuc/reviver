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

	async login(request: Request, response: Response) {
		try {
			const user = await User.login(request.body.username, request.body.password);
			const token = user.getToken();
			response.cookie('loginToken', token, { maxAge: 900000, httpOnly: true });
			return { message: 'User found.' };
		} catch (error) {
			response.status(error.code);
			return { message: error.message };
		}
	}

}