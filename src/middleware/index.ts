import { NextFunction, Request, Response } from 'express';

export const authenticate = (request: Request, response: Response, next: NextFunction) => {
	const token = request.cookies.loginToken;

	// @Todo Get the user if its set(can get userid from the token)

	next();

	// @Todo If its not set, then respond forbidden
}

export default authenticate;