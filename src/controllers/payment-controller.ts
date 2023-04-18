import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payments-service';

export async function getPayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  const id = req.query.ticketId;
  const ticketId = Number(id);
  try {
    const payment = await paymentService.getPayment(userId, ticketId);
    res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  const { ticketId, cardData } = req.body;
  try {
    const payment = await paymentService.createPayment(userId, ticketId, cardData);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}
