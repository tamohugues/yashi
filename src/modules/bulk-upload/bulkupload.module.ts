import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BulkUploadController } from './bulkupload.controller';
import { CampaignService, CreativeService, FtpService, OrderService, TransformationService } from './services';
import { Campaign, CampaignData, Creative, CreativeData, Order, OrderData } from './models';

@Module({
  imports: [SequelizeModule.forFeature([Campaign, CampaignData, Creative, CreativeData, Order, OrderData])],
  controllers: [BulkUploadController],
  providers: [CampaignService, CreativeService, FtpService, OrderService, TransformationService],
})
export class BulkUploadModule {}
