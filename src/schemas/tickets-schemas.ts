import Joi from 'joi';
import { Ticket } from '@prisma/client';

export const ticketSchema = Joi.object<Ticket>({
  status: Joi.string().allow('PAID', 'RESERVED').required(),
  id: Joi.number().positive(),
  createdAt: Joi.date(),
  enrollmentId: Joi.number(),
  ticketTypeId: Joi.number(),
  updatedAt: Joi.date(),
});

export const ticketTypeIdSchema = Joi.object({
  ticketTypeId: Joi.number().required(),
});

export const ticketIdSchema = Joi.object({
  ticketId: Joi.number().required(),
});
