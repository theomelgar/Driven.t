import { Enrollment, TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { UserTicket } from '@/protocols';

async function getAllTicketsTypes(): Promise<TicketType[]> {
  const tickets = await ticketRepository.getAllTicketsType();

  if (!tickets) throw notFoundError();

  return tickets;
}

async function createTicket(ticketTypeId: number, id: number): Promise<UserTicket> {
  const enrollment: Enrollment = await enrollmentRepository.findWithAddressByUserId(id);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.createTicket(ticketTypeId, enrollment.id);

  return ticket;
}

async function getTicket(userId: number) {
  const ticket = await ticketRepository.getTicketsByUser(userId);

  if (!ticket) throw notFoundError();

  return ticket;
}

const ticketService = {
  getAllTicketsTypes,
  createTicket,
  getTicket,
};

export default ticketService;
