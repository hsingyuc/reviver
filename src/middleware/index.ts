import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

const jwt = require('jsonwebtoken');

export const authenticate = (request: Request, response: Response, next: NextFunction) => {
	const token = request.cookies.loginToken;
	const userRepository = getRepository(User);

	if (!token) {
		response.status(401);
		return response.json({ message: 'Unauthenticate.' });
	}
	jwt.verify(token, 'secret', async function (err, data) {
		if (err) {
			response.status(401);
			return response.json({ message: 'Unauthenticate.' });
		}
		const user = await userRepository.findOne(data.id);

		if (!user) {
			response.status(401);
			return response.json({ message: 'No user found.' });
		}
		request.user = user;
		return next();
	})
};

export default authenticate;