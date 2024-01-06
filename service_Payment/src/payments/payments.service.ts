import { Injectable, NotFoundException } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');
import { CreatePaymentDto } from './dto/create-payment.dto';
import axios from 'axios';
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


      const paymentMethod = await stripe.paymentMethods.create({
        type: paymentData.type,
        card: paymentData.card,
      });
      return {paymentMethod}


      // if (paymentMethod.status === 'succeeded') {
      //   const paymentIntent = await stripe.paymentIntents.create({
      //     amount: Math.round(order.total * 100), // Stripe expects amount in cents
      //     currency: 'usd',
      //     payment_method: paymentMethod.id,
      //     confirm: true,
      //     return_url: 'https://your-website.com/success', // Specify your success page URL
      //     metadata: {
      //       orderId: order.id.toString(),
      //       customerName: order.customer.name,
      //       productName: order.OrderItem.product.name,
      //     },
          
      //   });
      //     // Check if payment intent is successful
      // if (paymentIntent.status === 'succeeded') {
      //   // Insert into the payment table
      //   const payment = await prisma.payment.create({
      //     data: {
      //       orderId: order.id,
      //       amount: order.total,
      //       currency: 'usd',
      //       method: 'stripe',
      //       status: paymentIntent.status,
      //       createdAt: new Date(),
      //     },
      //   });

      //   return payment;
      // }     
      // }
      // else {
      //   // Handle unsuccessful payment
      //   throw new Error(`Payment failed with status: ${paymentMethod.status}`);
      // }
      // }
      // else{
      //   return {paymentMethod}
      // }
      





    } catch (error) {
      return error.message;
    }
  }

  async PaypalprocessPayment(orderId: number, token: { bearer_token: string }) {
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
      }else{
        console.log(order);
        // return
        console.log(order.total.toFixed(2));
        // return


        
        const paypalOrder = await axios.post(
          "https://api-m.sandbox.paypal.com/v2/checkout/orders",
          {
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "items": [
                        {
                            "name": order.OrderItem.product.name,
                            "description": order.OrderItem.product.description,
                            "quantity": order.OrderItem.quantity.toString(),
                            "unit_amount": {
                                "currency_code": "USD",
                                "value": order.OrderItem.price.toString()
                            }
                        }
                    ],
                    "amount": {
                        "currency_code": "USD",
                        "value": order.total.toString(),
                        "breakdown": {
                            "item_total": {
                                "currency_code": "USD",
                                "value": order.total.toString()
                            }
                        }
                    }
                }
            ],
            "application_context": {
                "return_url": "https://example.com/return",
                "cancel_url": "https://example.com/cancel"
            }
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.bearer_token}`,
            },
          }
        );

        return paypalOrder.data;
      }

      // // Insert into the payment table
      // const payment = await prisma.payment.create({
      //   data: {
      //     orderId: order.id,
      //     amount: order.total,
      //     currency: 'USD',
      //     method: 'paypal',
      //     status: captureResponse.data.status,
      //     createdAt: new Date(),
      //   },
      // });
      // return payment;

      // }


    } catch (error) {
      return error.message;
    }
  }
}
