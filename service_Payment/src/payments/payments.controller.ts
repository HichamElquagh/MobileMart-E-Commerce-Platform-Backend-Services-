import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('Payments')
export class PaymentsController {

  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('/Stripe/:orderId')
  async StripeprocessPayment(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() paymantdata: CreatePaymentDto,
  ) {
    const payment = await this.paymentsService.StripeprocessPayment(orderId, paymantdata);
    return { payment };
  }


  @Post('Paypal/:orderId')
  async PaypalprocessPayment(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() paymantdata: CreatePaymentDto,
  ) {
    const payment = await this.paymentsService.PaypalprocessPayment(orderId, paymantdata);
    return { payment };
  }
}
