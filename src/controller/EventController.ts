import { getRepository } from 'typeorm';
import { Event } from "../entity/Event";
import { NextFunction, Request, Response } from 'express';

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
}