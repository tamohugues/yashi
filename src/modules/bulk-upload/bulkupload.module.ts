import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BulkUploadController } from './bulkupload.controller';
import { CampaignService, CreativeService, ImportService, OrderService } from './services';
import { Campaign, CampaignData, Creative, CreativeData, Order, OrderData } from './models';

@Module({
  imports: [SequelizeModule.forFeature([Campaign, CampaignData, Creative, CreativeData, Order, OrderData])],
  controllers: [BulkUploadController],
  providers: [OrderService, CampaignService, CreativeService, ImportService],
})
export class BulkUploadModule {}
