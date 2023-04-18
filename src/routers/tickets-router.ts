import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicket, getAllTicketsType, getUserTickets } from '@/controllers/tickets-controller';
import { ticketTypeIdSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/', getAllTicketsType)
  .get('/types', getUserTickets)
  .post('/', validateBody(ticketTypeIdSchema), createTicket);

export { ticketsRouter };
