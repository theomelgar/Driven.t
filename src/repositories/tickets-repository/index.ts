import { TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { UserTicket } from '@/protocols';

async function getAllTicketsType(): Promise<TicketType[]> {
  const ticket: TicketType[] = await prisma.ticketType.findMany();
  return ticket;
}

async function getTicketsByUser(enrollmentId: number): Promise<UserTicket> {
  const ticket = await prisma.ticket.findFirst({
    where: { enrollmentId },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return ticket;
}

async function getTicketById(id: number): Promise<UserTicket> {
  const ticket = await prisma.ticket.findFirst({
    where: { id },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return ticket;
}

async function createTicket(ticketTypeId: number, enrollmentId: number): Promise<UserTicket> {
  const ticket = await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: TicketStatus.RESERVED,
    },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return ticket;
}

async function updateTicket(ticketId: number) {
  await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const ticketRepository = {
  getAllTicketsType,
  getTicketsByUser,
  getTicketById,
  createTicket,
  updateTicket,
};

export default ticketRepository;
