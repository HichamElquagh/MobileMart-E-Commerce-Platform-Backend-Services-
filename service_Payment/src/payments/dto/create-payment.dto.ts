export class CreatePaymentDto {
    // payment.dto.ts
    type: string;
    number: string;
    exp_month: number;
    exp_year: number;
    cvc: string;
    amount: number;
  
  
}
