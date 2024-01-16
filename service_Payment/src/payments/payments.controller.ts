import { Controller, Post,Req,Body, Param, ParseIntPipe, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import{Request} from 'express';

@Controller('Payments')
export class PaymentsController {

  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('Stripe/:orderId')
  async StripeprocessPayment(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() paymantdata: CreatePaymentDto,
  ) {
    const payment = await this.paymentsService.StripeprocessPayment(orderId, paymantdata);
  }


  @Post('Paypal/:orderId')
  async PaypalprocessPayment(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() token: { bearer_token: string },
  ) {
    const payment = await this.paymentsService.PaypalprocessPayment(orderId, token);
    return {payment};
  }

  @Get('Paypal/Confirm_Payment/:orderId')
  async ConfirmPaypalprocessPayment(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Req() request: Request,
  ) {
    const token = { bearer_token: request.query.ttoken as string };
    const payment = await this.paymentsService.ConfirmPaypalprocessPayment(orderId, token); 
    return { payment };
  }
}
