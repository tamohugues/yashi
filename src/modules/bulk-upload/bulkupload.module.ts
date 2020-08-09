import { Module } from '@nestjs/common';
import { BulkUploadController } from './bulkupload.controller';
import {
  CampaignService,
  CreativeService,
  FtpService,
  OrderService,
  TransformationService,
} from './services';

@Module({
  imports: [],
  controllers: [BulkUploadController],
  providers: [
    CampaignService,
    CreativeService,
    FtpService,
    OrderService,
    TransformationService,
  ],
})
export class BulkUploadModule {}
