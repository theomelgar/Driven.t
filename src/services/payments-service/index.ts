import dayjs from 'dayjs';
import { Enrollment, Payment } from '@prisma/client';
import ticketRepository from '@/repositories/tickets-repository';
import { CardInfo } from '@/protocols';
import paymentRepository from '@/repositories/payments-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError, unauthorizedError } from '@/errors';

async function validateTicket(ticketId: number, userId: number) {
  const ticket = await ticketRepository.getTicketById(ticketId);
  if (!ticket) throw notFoundError();
  const enrollment: Enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (ticket.enrollmentId !== enrollment.id) throw unauthorizedError();
  return ticket;
}

async function getPayment(ticketId: number, userId: number) {
  await validateTicket(ticketId, userId);
  const payment: Payment = await paymentRepository.getPayment(ticketId);
  return payment;
}

async function createPayment(ticketId: number, userId: number, cardInfo: CardInfo): Promise<Payment> {
  const ticket = await validateTicket(ticketId, userId);

  const data: Omit<Payment, 'id'> = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardInfo.cardData.issuer,
    cardLastDigits: cardInfo.cardData.number.toString().substring(11),
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
  };

  const payment: Payment = await paymentRepository.createPayment(data);
  await ticketRepository.updateTicket(ticketId);
  return payment;
}

const paymentService = {
  getPayment,
  createPayment,
};

export default paymentService;
