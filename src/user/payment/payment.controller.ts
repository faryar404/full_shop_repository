import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UserType } from '@prisma/client';
import { User } from 'src/user/decorators/user.decorator';
import type {UserInfo} from 'src/user/decorators/user.decorator';
import { Role } from 'src/dependence/decorators/roles.decorator';


@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("payments/checkout")
  async paymentCheckout() {
    return this.paymentService.paymentCheckout();
  }




  @Get("payments/:id/status")
  async paymentStatus() {
    return this.paymentService.paymentStatus();
  }



  @Get("payments/history")
  async paymentHistory() {
    return this.paymentService.paymentHistory();
  }



  
  @Post("payments/webhook")
  async paymentWebhook() {
    return this.paymentService.paymentWebhook();
  }



  @Role(UserType.ADMIN)
  @Get("admin/payments")
  async getAllPayments() {
    return this.paymentService.getAllPayments();
  }



  @Role(UserType.ADMIN)
  @Get("admin/payments/:id")
  async getPaymentById() {
    return this.paymentService.getPaymentById();
  }



  @Role(UserType.ADMIN)
  @Post("admin/payments/:id/refund")
  async paymentRefund() {
    return this.paymentService.paymentRefund();
  }

}
