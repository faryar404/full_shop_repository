import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

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
  async paymentStatus() {
    try {
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
  async paymentHistory() {
    try {
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
  async getAllPayments() {
    try {
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
  async getPaymentById() {
    try {
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
