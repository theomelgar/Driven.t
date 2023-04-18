import { Router } from 'express';
import { authenticateToken, validateBody, validateQuery } from '@/middlewares';
import { createPaymentSchema } from '@/schemas/payments-schemas';
import { createPayment, getPayment } from '@/controllers/payment-controller';
import { ticketIdSchema } from '@/schemas/tickets-schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', validateQuery(ticketIdSchema), getPayment)
  .post('/process', validateBody(createPaymentSchema), createPayment);

export { paymentsRouter };
