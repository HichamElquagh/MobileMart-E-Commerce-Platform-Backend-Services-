import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Request } from 'express';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    StripeprocessPayment(orderId: number, paymantdata: CreatePaymentDto): Promise<void>;
    PaypalprocessPayment(orderId: number, token: {
        bearer_token: string;
    }): Promise<{
        payment: any;
    }>;
    ConfirmPaypalprocessPayment(orderId: number, request: Request): Promise<{
        payment: any;
    }>;
}
