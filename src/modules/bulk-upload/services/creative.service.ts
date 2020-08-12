import { Injectable, Global } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileBaseDataDto } from '../dtos';
import { Creative, CreativeData } from '../models';
import { OrderService } from '../services/order.service';

@Injectable()
export class CreativeService {
  constructor(
    @InjectModel(Creative)
    private readonly creativeModel: typeof Creative,
    @InjectModel(CreativeData)
    private readonly creativeDataModel: typeof CreativeData,
    private readonly orderService: OrderService,
  ) {}

  async findOrCreateCreative(fileBaseDto: FileBaseDataDto): Promise<[Creative, boolean]> {
    const order = await this.orderService.findOneOrder(fileBaseDto);

    const creative = {
      orderId: order.id,
      yashiCreativeId: fileBaseDto.creativeId,
      name: fileBaseDto.creativeName,
      previewUrl: fileBaseDto.previewUrl,
    };

    return this.creativeModel.findOrCreate({
      defaults: creative,
      where: {
        orderId: order.id,
        yashiCreativeId: fileBaseDto.creativeId,
      },
    });
  }

  async findOrCreateCreativeData(fileBaseDto: FileBaseDataDto): Promise<[CreativeData, boolean]> {
    const creative = await this.findOneCreative(fileBaseDto);

    const orderData = {
      creative: creative.id,
      logDate: fileBaseDto.logDate,
      impressionCount: fileBaseDto.impressionCount,
      clickCount: fileBaseDto.clickCount,
      viewedCount25: fileBaseDto.viewedCount25,
      viewedCount50: fileBaseDto.viewedCount50,
      viewedCount75: fileBaseDto.viewedCount75,
      viewedCount100: fileBaseDto.viewedCount100,
    };

    return this.creativeDataModel.findOrCreate({
      defaults: orderData,
      where: {
        creativeId: creative.id,
        logDate: fileBaseDto.logDate,
      },
    });
  }

  async findOneCreative(fileBaseDto: FileBaseDataDto): Promise<Creative> {
    const order = await this.orderService.findOneOrder(fileBaseDto);
    return this.creativeModel.findOne({
      where: {
        orderId: order.id,
        yashiCreativeId: fileBaseDto.creativeId,
      },
    });
  }
}
