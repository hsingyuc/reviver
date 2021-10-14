import { getRepository } from 'typeorm';
import { Receiver } from '../entity/Receiver';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';

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

	async one(request: Request, response: Response, next: NextFunction) {
		const foundOne = await this.receiverRepository.findOne(request.params.id);

		if (!foundOne) {
			response.status(404);
			return { message: 'Unable to find the requested receiver.' };
		}
		return foundOne;
	}

	async create(request: Request, response: Response, next: NextFunction) {
		const receiverCreated = this.receiverRepository.create(request.body);
		const errors = await validate(receiverCreated, { validationError: { target: false } });

		if (errors.length > 0) {
			response.status(422);
			return { message: 'Please provide valid user fields.', errors };
		}
		try {
			this.receiverRepository.save(receiverCreated);
			return { message: 'Receiver created.', receiver: receiverCreated };
		} catch (error) {
			response.status(500);
			return { message: 'Internal Server Error.' };
		}
	}

}