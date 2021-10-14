import { getRepository } from 'typeorm';
import { Receiver } from '../entity/Receiver';
import { NextFunction, Request, Response } from 'express';

export class ReceiverController {
	private receiverRepository = getRepository(Receiver);

	async all(request: Request, response: Response, next: NextFunction) {
		const foundAll = await this.receiverRepository.find();

		if (!foundAll) {
			response.status(404);
			return { message: 'Unable to find the requested receivers.' };
		}
		return foundAll;
	}

}