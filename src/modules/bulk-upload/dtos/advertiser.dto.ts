import { property } from 'class-converter';

export class AdvertiserDto {
  @property('Advertiser ID')
  id: number;

  @property('Advertiser Name')
  name: string;
}
