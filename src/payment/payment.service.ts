import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PaymentService {





  //شروع فرآیند پرداخت و اتصال به درگاه:
  async paymentCheckout() {
    try {
    } catch (error) {
      console.error('خطا در شروع فرآیند پرداخت و اتصال به درگاه: ', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در شروع فرآیند پرداخت و اتصال به درگاه:  رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }






  //بررسی وضعیت یک تراکنش خاص توسط کاربر
  async paymentStatus(userId:number ,paymentId:number):Promise<PaymentStatusResponseDto> {
    try {

      const user = await this.prisma.user.findUnique({
        where:{id:userId}
      })

      if(!user) throw new NotFoundException;

      const payment = await this.prisma.payment.findFirst({
        where:{id:paymentId ,
           order: {
            userId: userId  
        }
        },
        select: {
                    id: true,
                    amount: true,
                    paymentMethod: true,
                    status: true,
                    transactionId: true,
                    paymentDate: true,
                    createdAt: true,
                    updatedAt: true,
                    order: {
                        select: {
                            id: true,
                            totalAmount: true,
                            status: true,
                            trackingCode: true,
                            orderItems: {
                                select: {
                                    id: true,
                                    productId: true,
                                    quantity: true,
                                    price: true,
                                    product: {
                                        select: {
                                            id: true,
                                            name: true,
                                            images: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
      })

      if(!payment) throw new NotFoundException;

      return new PaymentStatusResponseDto(payment);


    } catch (error) {
      console.error('خطا در بررسی وضعیت یک تراکنش خاص توسط کاربر', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در بررسی وضعیت یک تراکنش خاص توسط کاربر رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }







  //دریافت تاریخچه پرداخت‌های کاربر
  async paymentHistory(userId:number):Promise<PaymentHistoryResponseDto[]> {
    try {

      const user = await this.prisma.user.findUnique({
        where:{id:userId}
      })

      if(!user) throw new NotFoundException;

      const payments = await this.prisma.payment.findMany({
        where:{
          order:{
            userId:userId
          }
        },
        select: {
                    id: true,
                    amount: true,
                    paymentMethod: true,
                    status: true,
                    transactionId: true,
                    paymentDate: true,
                    createdAt: true,
                    updatedAt: true,
                    order: {
                        select: {
                            id: true,
                            totalAmount: true,
                            status: true,
                            trackingCode: true,
                            shippingAddress: true,
                            createdAt: true,
                            orderItems: {
                                select: {
                                    id: true,
                                    productId: true,
                                    quantity: true,
                                    price: true,
                                    product: {
                                        select: {
                                            id: true,
                                            name: true,
                                            images: true,
                                            price: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc' // جدیدترین تراکنش‌ها اول
                }
      })

      if(!payments||payments.length===0) throw new NotFoundException;

      return payments.map(payment => new PaymentHistoryResponseDto(payment));
      
    } catch (error) {
      console.error('خطا در دریافت تاریخچه پرداخت‌های کاربر', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در دریافت تاریخچه پرداخت‌های کاربر رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }







  //دریافت تاییدیه پرداخت از سمت درگاه
  async paymentWebhook() {
    try {
    } catch (error) {
      console.error('خطا در دریافت تاییدیه پرداخت از سمت درگاه ', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در دریافت تاییدیه پرداخت از سمت درگاه  رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }







  //دریافت لیست تمامی تراکنش‌های سایت: توسط ادمین
  async getAllPayments():Promise<PaymentResponseDto[]> {
    try {

      const payments = await this.prisma.payment.findMany({
        select: {
                    id: true,
                    amount: true,
                    paymentMethod: true,
                    paymentDate: true,
                    transactionId: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    userId: true,
                    orderId: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                        }
                    },
                    order: {
                        select: {
                            id: true,
                            trackingCode: true,
                            totalAmount: true,
                            status: true,
                            shippingAddress: true,
                        }
                    }
                },
                orderBy: {
                    paymentDate: 'desc'
                }
      })

      if(!payments || payments.length===0) throw new NotFoundException;

      return payments.map(payment => new PaymentResponseDto(payment));


    } catch (error) {
      console.error(
        'خطا در دریافت لیست تمامی تراکنش‌های سایت: توسط ادمین',
        error,
      );

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در دریافت لیست تمامی تراکنش‌های سایت: توسط ادمین رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }







  //مشاهده جزئیات یک تراکنش خاص توسط ادمین
  async getPaymentById(paymentId:number):Promise<PaymentResponseDto> {
    try {

      const payment = await this.prisma.payment.findUnique({
        where:{id:paymentId},
        select: {
                    id: true,
                    amount: true,
                    paymentMethod: true,
                    paymentDate: true,
                    transactionId: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    userId: true,
                    orderId: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                            address: true,
                        }
                    },
                    order: {
                        select: {
                            id: true,
                            trackingCode: true,
                            totalAmount: true,
                            status: true,
                            shippingAddress: true,
                            orderItems: {
                                select: {
                                    id: true,
                                    productId: true,
                                    quantity: true,
                                    price: true,
                                    product: {
                                        select: {
                                            id: true,
                                            name: true,
                                            images: true,
                                            price: true,
                                            description: true,
                                            category: {
                                                select: {
                                                    id: true,
                                                    name: true,
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
      })

      if(!payment) throw new NotFoundException;

      return new PaymentResponseDto(payment);

      
    } catch (error) {
      console.error('خطا در مشاهده جزئیات یک تراکنش خاص توسط ادمین', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در مشاهده جزئیات یک تراکنش خاص توسط ادمین رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }





  
  //بازگشت وجه در صورت لغو سفارش، توسط ادمین
  async paymentRefund() {
    try {
    } catch (error) {
      console.error('خطا در بازگشت وجه در صورت لغو سفارش ، توسط ادمین', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در بازگشت وجه در صورت لغو سفارش ، توسط ادمین،رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
