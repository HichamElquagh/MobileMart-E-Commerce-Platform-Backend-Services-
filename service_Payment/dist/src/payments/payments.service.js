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
const axios_1 = require("axios");
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
            const paymentMethod = await stripe.paymentMethods.create({
                type: paymentData.type,
                card: paymentData.card,
            });
            return { paymentMethod };
        }
        catch (error) {
            return error.message;
        }
    }
    async PaypalprocessPayment(orderId, token) {
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
            else {
                console.log(order);
                console.log(order.total.toFixed(2));
                const paypalOrder = await axios_1.default.post("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
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
                        "return_url": `https://localhost:3000/Payments/Paypal/Confirm_Payment/:${order.id}?token=${token.bearer_token}`,
                        "cancel_url": "https://example.com/cancel"
                    }
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token.bearer_token}`,
                    },
                });
                if (paypalOrder.data.status === 'CREATED') {
                    const orderUpdate = await prisma.order.update({
                        where: { id: orderId },
                        data: {
                            paypalOrderId: paypalOrder.data.id,
                        },
                    });
                }
                return paypalOrder.data;
            }
        }
        catch (error) {
            return error.message;
        }
    }
    async ConfirmPaypalprocessPayment(orderId, token) {
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
            else {
                console.log(order);
                console.log(order.total.toFixed(2));
            }
            const captureResponse = await axios_1.default.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${order.paypalOrderId}/capture`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.bearer_token}`,
                },
            });
            const payment = await prisma.payment.create({
                data: {
                    orderId: order.id,
                    amount: order.total,
                    currency: 'USD',
                    method: 'paypal',
                    status: captureResponse.data.status,
                    createdAt: new Date(),
                },
            });
            return payment;
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