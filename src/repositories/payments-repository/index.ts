import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function getPayment(ticketId: number): Promise<Payment> {
  const payment: Payment = await prisma.payment.findFirst({
    where: { ticketId },
  });
  return payment;
}

async function createPayment(data: Omit<Payment, 'id'>) {
  const payment = await prisma.payment.create({
    data,
  });
  return payment;
}

const paymentRepository = {
  getPayment,
  createPayment,
};

export default paymentRepository;
