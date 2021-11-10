import { getRepository } from 'typeorm';
import { Receiver } from '../entity/Receiver';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';

export class ReceiverController {
	private receiverRepository = getRepository(Receiver);

	async one(request: Request, response: Response, next: NextFunction) {
		const foundOne = await this.receiverRepository.findOne(request.params.id);

		if (!foundOne) {
			response.status(404);
			return { message: 'Unable to find the requested receiver.' };
		}
		return foundOne;
	}

	async create(request: Request, response: Response, next: NextFunction) {
		const receiverCreated = await this.receiverRepository.create({ ...request.body, user: request.user.id });
		const errors = await validate(receiverCreated, { validationError: { target: false } });

		if (errors.length > 0) {
			response.status(422);
			return { message: 'Please provide valid user fields.', errors };
		}
		try {
			await this.receiverRepository.save(receiverCreated);
			return { message: 'Receiver created.', receiver: receiverCreated };
		} catch (error) {
			response.status(500);
			return { message: 'Internal Server Error.' };
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const receiverToRemove = await this.receiverRepository.findOne(request.params.id);

		if (!receiverToRemove) {
			response.status(404);
			return { message: 'Unable to find the requested receiver.' };
		}
		try {
			await this.receiverRepository.remove(receiverToRemove);
			return { message: `${receiverToRemove.firstName} has been removed.` };
		} catch (error) {
			response.status(400);
			return { message: 'Bad Request.' };
		}
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const receiverToUpdate = await this.receiverRepository.findOne(request.params.id);

		if (!receiverToUpdate) {
			response.status(404);
			return { message: 'Unable to find the requested receiver.' };
		}
		try {
			await this.receiverRepository.update(request.params.id, request.body);
			return this.receiverRepository.findOne(request.params.id);
		} catch (error) {
			response.status(400);
			return { message: 'Bad Request.' };
		}
	}

}