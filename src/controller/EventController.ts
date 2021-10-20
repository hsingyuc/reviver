import { getRepository } from 'typeorm';
import { Event } from "../entity/Event";
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';

export class EventController {
	private eventRepository = getRepository(Event);

	async all(request: Request, response: Response, next: NextFunction) {
		const foundAll = await this.eventRepository.find();

		if (!foundAll) {
			response.status(404);
			return { message: 'Unable to find the requested events.' };
		}
		return foundAll;
	}

	async one(request: Request, response: Response, next: NextFunction) {
		const foundOne = await this.eventRepository.find(request.params.id);

		if (!foundOne) {
			response.status(404);
			return { message: 'Unable to find the requested event.' };
		}
		return foundOne;
	}

	async create(request: Request, response: Response, next: NextFunction) {
		const eventCreated = this.eventRepository.create(request.body);
		const errors = await validate(eventCreated);

		if (errors.length > 0) {
			response.status(422);
			return { message: 'Please provide valid input fields.', errors };
		}
		try {
			await this.eventRepository.save(eventCreated);
			return { message: 'Event created.', event: eventCreated };
		} catch (error) {
			response.status(500);
			return { message: 'Internal Server Error.' };
		}
	}
}