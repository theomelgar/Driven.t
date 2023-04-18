import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { UserTicket } from '@/protocols';
import ticketService from '@/services/tickets-service';

export async function getAllTicketsType(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const tickets = await ticketService.getAllTicketsTypes();
    res.send(tickets);
  } catch (error) {
    next(error);
  }
}

export async function getUserTickets(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const id: number = req.userId;
  try {
    const ticket: UserTicket = await ticketService.getTicket(id);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    next(error);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const ticketTypeId: number = req.body.ticketTypeId;
  const id: number = req.userId;
  try {
    const ticket: UserTicket = await ticketService.createTicket(ticketTypeId, id);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    next(error);
  }
}
