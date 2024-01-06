import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsService {
    StripeprocessPayment(orderId: number, paymentData: CreatePaymentDto): Promise<any>;
    PaypalprocessPayment(orderId: number, token: {
        bearer_token: string;
    }): Promise<any>;
}
