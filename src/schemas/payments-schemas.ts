import Joi from 'joi';

export const createPaymentSchema = Joi.object({
  ticketId: Joi.number().required(),
  cardData: Joi.string().required(),
});
