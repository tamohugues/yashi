import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileBaseDataDto } from '../dtos';
import { Order, OrderData } from '../models';
import { CampaignService } from '../services/campaign.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    @InjectModel(OrderData)
    private readonly orderDataModel: typeof OrderData,
    private readonly campaignService: CampaignService,
  ) {}

  async findOrCreateOrder(fileBaseDto: FileBaseDataDto): Promise<[Order, boolean]> {
    const campaign = await this.campaignService.findOneCampaign(fileBaseDto.campaignId, fileBaseDto.advertiserId);

    const order = {
      campaignId: campaign.id,
      yashiOrderId: fileBaseDto.orderId,
      name: fileBaseDto.orderName,
    };

    return this.orderModel.findOrCreate({
      defaults: order,
      where: {
        campaignId: campaign.id,
        yashiOrderId: fileBaseDto.orderId,
      },
    });
  }

  async findOrCreateOrderData(fileBaseDto: FileBaseDataDto): Promise<[OrderData, boolean]> {
    const order = await this.findOneOrder(fileBaseDto);

    const orderData = {
      orderId: order.id,
      logDate: fileBaseDto.logDate,
      impressionCount: fileBaseDto.impressionCount,
      clickCount: fileBaseDto.clickCount,
      viewedCount25: fileBaseDto.viewedCount25,
      viewedCount50: fileBaseDto.viewedCount50,
      viewedCount75: fileBaseDto.viewedCount75,
      viewedCount100: fileBaseDto.viewedCount100,
    };

    return this.orderDataModel.findOrCreate({
      defaults: orderData,
      where: {
        orderId: order.id,
        logDate: fileBaseDto.logDate,
      },
    });
  }

  async findOneOrder(fileBaseDto: FileBaseDataDto): Promise<Order> {
    const campaign = await this.campaignService.findOneCampaign(fileBaseDto.campaignId, fileBaseDto.advertiserId);
    return this.orderModel.findOne({
      where: {
        campaignId: campaign.id,
        yashiOrderId: fileBaseDto.orderId,
      },
    });
  }
}
