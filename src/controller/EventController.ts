import { getRepository } from 'typeorm';
import { Event } from "../entity/Event";
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';

export class EventController {
	private eventRepository = getRepository(Event);

	async one(request: Request, response: Response, next: NextFunction) {
		const foundOne = await this.eventRepository.findOne(request.params.id);

		if (!foundOne) {
			response.status(404);
			return { message: 'Unable to find the requested event.' };
		}
		return foundOne;
	}

	async create(request: Request, response: Response, next: NextFunction) {
		const eventCreated = this.eventRepository.create({ ...request.body, user: request.user.id });
		const errors = await validate(eventCreated, { validationError: { target: false } });

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

	async remove(request: Request, response: Response, next: NextFunction) {
		const eventToRemove = await this.eventRepository.findOne(request.params.id);

		if (!eventToRemove) {
			response.status(404);
			return { message: 'Unable to find the requested event.' };
		}
		try {
			await this.eventRepository.remove(eventToRemove);
			return { message: 'Event has been removed.' };
		} catch (error) {
			response.status(400);
			return { message: 'Bad Request.' };
		}
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const eventToUpdate = await this.eventRepository.findOne(request.params.id);

		if (!eventToUpdate) {
			response.status(404);
			return { message: 'Unable to find the requested event.' };
		}
		try {
			await this.eventRepository.update(request.params.id, request.body);
			return this.eventRepository.findOne(request.params.id);
		} catch (error) {
			response.status(400);
			return { message: 'Bad Request.' };
		}
	}

}