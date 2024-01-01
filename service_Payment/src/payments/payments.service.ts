import { Injectable, NotFoundException } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');
import { CreatePaymentDto } from './dto/create-payment.dto';

const stripe = require('stripe')('sk_test_51ORcLoAhVZrvalPmoN7zx0aZUyLfXBc9O1EFhyycunDQZfAzBARYPOC3Kat8cDTtOgfcS83QbHxC0zcLsVByXZBg00C5Bvr6SV');

@Injectable()

export class PaymentsService {

  
  async StripeprocessPayment(orderId: number, paymentData: CreatePaymentDto) {
    try {
      const prisma = new PrismaClient();
      // Retrieve order from the database
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          customer: true,
          OrderItem: {
            include: {
              product: true,
            },
          },
        },
      });
      if (!order) {
        throw new NotFoundException(`Order with id ${orderId} not found.`);
      }


      // const paymentMethod = await stripe.paymentMethods.create({
      //   type: paymentData.type,
      //   card: {
      //     number: paymentData.number.toString(),
      //     exp_month: paymentData.exp_month,
      //     exp_year: paymentData.exp_year,
      //     cvc: paymentData.cvc.toString(),
      //   },
      // });


      // if (paymentMethod.status === 'succeeded') {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(order.total * 100), // Stripe expects amount in cents
          currency: 'usd',
          payment_method: 'pm_card_visa',
          confirm: true,
          return_url: 'https://your-website.com/success', // Specify your success page URL
          metadata: {
            orderId: order.id.toString(),
            customerName: order.customer.name,
            productName: order.OrderItem.product.name,
          },
          
        });

          // Check if payment intent is successful
      if (paymentIntent.status === 'succeeded') {
        // Insert into the payment table
        const payment = await prisma.payment.create({
          data: {
            orderId: order.id,
            amount: order.total,
            currency: 'usd',
            method: 'stripe',
            status: paymentIntent.status,
            createdAt: new Date(),
          },
        });

        return payment;
      } else {
        // Handle unsuccessful payment
        throw new Error(`Payment failed with status: ${paymentIntent.status}`);
      }
      // }
      // else{
      //   return {paymentMethod}
      // }
      





    } catch (error) {
      return error.message;
    }
  }

  async PaypalprocessPayment(orderId: number, paymentData: CreatePaymentDto) {
    try {
      const prisma = new PrismaClient();
      // Retrieve order from the database
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          customer: true,
          OrderItem: {
            include: {
              product: true,
            },
          },
        },
      });
      if (!order) {
        throw new NotFoundException(`Order with id ${orderId} not found.`);
      }
      return { order };

    } catch (error) {
      return error.message;
    }
  }
}
