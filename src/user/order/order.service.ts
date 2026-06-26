import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {



  //ثبت و ایجاد سفارش جدید
  async createOrder() {
    try {


    } catch (error) {
      console.error('خطا در ثبت و ایجاد سفارش جدید ', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در ثبت و ایجاد سفارش جدید  رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }





  //دریافت لیست تمام سفارشات کاربر
  async getOrders(userId:number):Promise<OrdersResponseDto[]> {
    try {

      const user = await this.prisma.user.findUnique({
        where:{id:userId}
      })

      if(!user) throw new NotFoundException;

      const orders = await this.prisma.order.findMany({
        where:{userId:userId},
        
        select: {
                id: true,
                userId: true,
                totalAmount: true,
                status: true,
                paymentStatus: true,
                shippingAddress: true,
                trackingCode: true,
                createdAt: true,
                updatedAt: true,
                // اطلاعات کاربر
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
                // آیتم‌های سفارش
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
                },
                // اطلاعات پرداخت
                payment: {
                    select: {
                        id: true,
                        amount: true,
                        paymentMethod: true,
                        paymentDate: true,
                        transactionId: true,
                    }
                },
                // اطلاعات ارسال
                shipment: {
                    select: {
                        id: true,
                        trackingNumber: true,
                        shippingCompany: true,
                        estimatedDelivery: true,
                        deliveredAt: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc' // جدیدترین سفارشات اول
            }
      })

      if(!orders || orders.length===0) throw new NotFoundException;

      return orders.map(order => new OrdersResponseDto(order));

    } catch (error) {
      console.error('خطا در دریافت لیست تمام سفارشات کاربر', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در دریافت لیست تمام سفارشات کاربر رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }






  //دریافت جزئیات یک سفارش خاص
  async getOrderById(userId:number , orderId : number):Promise<OrdersResponseDto> {

    try {

      const user = await this.prisma.user.findUnique({
        where:{id:userId}
      })

      if(!user) throw new NotFoundException;

      const order = await this.prisma.order.findFirst({
        where:{id:orderId , userId:userId},
        select: {
                    id: true,
                    userId: true,
                    totalAmount: true,
                    status: true,
                    paymentStatus: true,
                    shippingAddress: true,
                    trackingCode: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                            address: true,
                        }
                    },
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
                    },
                    payment: {
                        select: {
                            id: true,
                            amount: true,
                            paymentMethod: true,
                            paymentDate: true,
                            transactionId: true,
                            status: true,
                        }
                    },
                    shipment: {
                        select: {
                            id: true,
                            trackingNumber: true,
                            shippingCompany: true,
                            estimatedDelivery: true,
                            deliveredAt: true,
                            status: true,
                        }
                    }
              }
      })


      if(!order) throw new NotFoundException;

      return new OrdersResponseDto(order);


    } catch (error) {
      console.error('خطا در دریافت جزئیات یک سفارش خاص', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در دریافت جزئیات یک سفارش خاص رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }






  //لغو سفارش توسط کاربر قبل از ارسال
  async cancelOrder() {
    try {
    } catch (error) {
      console.error('خطا در لغو سفارش توسط کاربر  قبل از ارسال', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در لغو سفارش توسط کاربر  قبل از ارسال رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }







  //دریافت لیست تمامی سفارشات سایت توسط ادمین
  async getAdminOrders():Promise<OrdersResponseDto[]> {
    try {

      const orders = await this.prisma.order.findMany({

        select: {
                id: true,
                userId: true,
                totalAmount: true,
                status: true,
                paymentStatus: true,
                shippingAddress: true,
                trackingCode: true,
                createdAt: true,
                updatedAt: true,
                // اطلاعات کاربر
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        address: true,
                    }
                },
                // آیتم‌های سفارش
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
                },
                // اطلاعات پرداخت
                payment: {
                    select: {
                        id: true,
                        amount: true,
                        paymentMethod: true,
                        paymentDate: true,
                        transactionId: true,
                        status: true,
                    }
                },
                // اطلاعات ارسال
                shipment: {
                    select: {
                        id: true,
                        trackingNumber: true,
                        shippingCompany: true,
                        estimatedDelivery: true,
                        deliveredAt: true,
                        status: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc' // جدیدترین سفارشات اول
            }
      })

      if(!orders || orders.length===0) throw new NotFoundException;

      return orders.map(order => new OrdersResponseDto(order));


    } catch (error) {
      console.error('خطا در دریافت لیست تمامی سفارشات سایت توسط ادمین', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در دریافت لیست تمامی سفارشات سایت توسط ادمین رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }






  //مشاهده جزئیات دقیق یک سفارش برای پردازش توسط ادمین
  async getAdminOrder() {
    try {
    } catch (error) {
      console.error(
        'خطا در مشاهده جزئیات دقیق یک سفارش برای پردازش توسط ادمین',
        error,
      );

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در مشاهده جزئیات دقیق یک سفارش برای پردازش توسط ادمین رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }





  
  //بروزرسانی وضعیت سفارش (مثلاً تغییر به "ارسال شد"): توسط ادمین
  async editOrderStatus() {
    try {
    } catch (error) {
      console.error('خطا در بروزرسانی وضعیت سفارش توسط ادمین', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'خطایی در بروزرسانی وضعیت سفارش توسط ادمین رخ داد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
