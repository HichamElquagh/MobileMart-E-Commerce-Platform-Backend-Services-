import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    StripeprocessPayment(orderId: number, paymantdata: CreatePaymentDto): Promise<{
        payment: any;
    }>;
    PaypalprocessPayment(orderId: number, paymantdata: CreatePaymentDto): Promise<{
        payment: any;
    }>;
}
