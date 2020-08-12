import { property } from 'class-converter';

export class FileBaseDataDto {
  @property('Date')
  logDate: number;

  @property('Advertiser ID')
  advertiserId: number;

  @property('Advertiser Name')
  advertiserName: string;

  @property('Campaign ID')
  campaignId: number;

  @property('Campaign Name')
  campaignName: string;

  @property('Order ID')
  orderId: number;

  @property('Order Name')
  orderName: string;

  @property('Creative ID')
  creativeId: number;

  @property('Creative Name')
  creativeName: string;

  @property('Creative Preview URL')
  previewUrl: string;

  @property('Impressions')
  impressionCount: number;

  @property('Clicks')
  clickCount: number;

  @property('25% Viewed')
  viewedCount25: number;

  @property('50% Viewed')
  viewedCount50: number;

  @property('75% Viewed')
  viewedCount75: number;

  @property('100% Viewed')
  viewedCount100: number;

  @property('Media Cost')
  mediaCost: number;

  @property('Data Cost')
  dataCost: number;

  @property('Client Cost')
  clientCost: number;
}
