"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const { PrismaClient } = require('@prisma/client');
const stripe = require('stripe')('sk_test_51ORcLoAhVZrvalPmoN7zx0aZUyLfXBc9O1EFhyycunDQZfAzBARYPOC3Kat8cDTtOgfcS83QbHxC0zcLsVByXZBg00C5Bvr6SV');
let PaymentsService = class PaymentsService {
    async StripeprocessPayment(orderId, paymentData) {
        try {
            const prisma = new PrismaClient();
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
                throw new common_1.NotFoundException(`Order with id ${orderId} not found.`);
            }
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(order.total * 100),
                currency: 'usd',
                payment_method: 'pm_card_visa',
                confirm: true,
                return_url: 'https://your-website.com/success',
                metadata: {
                    orderId: order.id.toString(),
                    customerName: order.customer.name,
                    productName: order.OrderItem.product.name,
                },
            });
            if (paymentIntent.status === 'succeeded') {
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
            }
            else {
                throw new Error(`Payment failed with status: ${paymentIntent.status}`);
            }
        }
        catch (error) {
            return error.message;
        }
    }
    async PaypalprocessPayment(orderId, paymentData) {
        try {
            const prisma = new PrismaClient();
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
                throw new common_1.NotFoundException(`Order with id ${orderId} not found.`);
            }
            return { order };
        }
        catch (error) {
            return error.message;
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)()
], PaymentsService);
//# sourceMappingURL=payments.service.js.map