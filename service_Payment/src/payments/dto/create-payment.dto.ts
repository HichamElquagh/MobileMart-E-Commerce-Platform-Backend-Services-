export class CreatePaymentDto {
    type: string;
    card: {
      number: string;
      exp_month: number;
      exp_year: number;
      cvc: string;
    };
    amount: number;
  }
  