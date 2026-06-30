import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserType } from '@prisma/client';
import { User } from 'src/user/decorators/user.decorator';
import type {UserInfo} from 'src/user/decorators/user.decorator';
import { Role } from 'src/dependence/decorators/roles.decorator';


@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("orders")
  async createOrder() {
    return this.orderService.createOrder();
  }



  @Get("orders")
  async getOrders(
    @User() user:UserInfo
  ):Promise<OrdersResponseDto[]> {
    return this.orderService.getOrders(user.id);
  }




  @Get("orders/:id")
  async getOrderById(
    @Param("id" , ParseIntPipe) orderId:number,
    @User() user:UserInfo
  ):Promise<OrdesrResponseDto> {
    return this.orderService.getOrderById(user.id , orderId);
  }




  @Post("orders/:id/cancel")
  async cancelOrder() {
    return this.orderService.cancelOrder();
  }




  @Role(UserType.ADMIN)
  @Get("admin/orders")
  async getAdminOrders(
    @User() user:UserInfo
  ):Promise<OrdersResponseDto[]> {
    return this.orderService.getAdminOrders();
  }





  @Role(UserType.ADMIN)
  @Get("admin/orders/:id")
  async getAdminOrder(
    @Param("id" , ParseIntPipe) orderId:number
  ):Promise<OrdersResponseDto> {
    return this.orderService.getAdminOrder(orderId);
  }





  @Role(UserType.ADMIN)
  @Patch("admin/orders/:id/status")
  async editOrderStatus() {
    return this.orderService.editOrderStatus();
  }
}
