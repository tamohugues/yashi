import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileBaseDataDto } from '../dtos';
import { Campaign, CampaignData } from '../models';

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign)
    private readonly campaignModel: typeof Campaign,
    @InjectModel(CampaignData)
    private readonly campaignDataModel: typeof CampaignData,
  ) {}

  findOrCreateCampaign(fileBaseDto: FileBaseDataDto): Promise<[Campaign, boolean]> {
    const campaign = {
      yashiCampaignId: fileBaseDto.campaignId,
      name: fileBaseDto.campaignName,
      yashiAdvertiserId: fileBaseDto.advertiserId,
      advertiserName: fileBaseDto.advertiserName,
    };

    return this.campaignModel.findOrCreate({
      defaults: campaign,
      where: {
        yashiCampaignId: fileBaseDto.campaignId,
        yashiAdvertiserId: fileBaseDto.advertiserId,
      },
    });
  }

  async findOrCreateCampaignData(fileBaseDto: FileBaseDataDto): Promise<[CampaignData, boolean]> {
    const campaign = await this.findOneCampaign(fileBaseDto.campaignId, fileBaseDto.advertiserId);

    const campaignData = {
      campaignId: campaign.id,
      logDate: fileBaseDto.logDate,
      impressionCount: fileBaseDto.impressionCount,
      clickCount: fileBaseDto.clickCount,
      viewedCount25: fileBaseDto.viewedCount25,
      viewedCount50: fileBaseDto.viewedCount50,
      viewedCount75: fileBaseDto.viewedCount75,
      viewedCount100: fileBaseDto.viewedCount100,
    };

    return this.campaignDataModel.findOrCreate({
      defaults: campaignData,
      where: {
        campaignId: campaign.id,
        logDate: fileBaseDto.logDate,
      },
    });
  }

  private findOneCampaign(yashiCampaignId: number, yashiAdvertiserId: number): Promise<Campaign> {
    return this.campaignModel.findOne({
      where: {
        yashiCampaignId,
        yashiAdvertiserId,
      },
    });
  }
}
