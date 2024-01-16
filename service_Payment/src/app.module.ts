import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [PaymentsModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
