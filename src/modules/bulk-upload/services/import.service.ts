import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { toClass } from 'class-converter';
import { FileBaseDataDto, AdvertiserDto } from '../dtos';
import { CampaignService } from './campaign.service';
import { OrderService } from './order.service';
import { CreativeService } from './creative.service';
import * as Client from 'ftp';
import * as CSVtoJson from 'csvtojson';
import * as moment from 'moment';

@Injectable()
export class ImportService {
  private client: Client;
  private regexFileName: RegExp;

  constructor(
    private readonly configService: ConfigService,
    private readonly campaignService: CampaignService,
    private readonly orderService: OrderService,
    private readonly creativeService: CreativeService,
  ) {
    this.regexFileName = new RegExp(/Yashi_\d{4}-05-\d{2}\.csv/, 'g');
  }

  /**
   * import all data form file to mysql database
   *
   * @memberof ImportService
   */
  async importFiles() {
    const fileNames: string[] = await this.getFileNames();
    const advertisers: AdvertiserDto[] = await this.getAdvertisers();

    for (let i = 0; i < fileNames.length; i++) {
      const fileBaseDatas: FileBaseDataDto[] = await this.getFileDatas(fileNames[i], advertisers);

      for (let y = 0; y < fileBaseDatas.length; y++) {
        await this.campaignService.findOrCreateCampaign(fileBaseDatas[y]);
        await this.campaignService.findOrCreateCampaignData(fileBaseDatas[y]);
        await this.orderService.findOrCreateOrder(fileBaseDatas[y]);
        await this.orderService.findOrCreateOrderData(fileBaseDatas[y]);
        await this.creativeService.findOrCreateCreative(fileBaseDatas[y]);
        await this.creativeService.findOrCreateCreativeData(fileBaseDatas[y]);
      }
    }
  }

  /**
   * get all file name from ftp filter by regex
   *
   * @private
   * @returns {Promise<string[]>}
   * @memberof ImportService
   */
  private getFileNames(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.connect();
      this.client.on('ready', () => {
        this.client.list(async (err, list) => {
          if (err) {
            this.client.destroy();
            reject(err);
          }
          const fileNames: string[] = list.filter((x) => this.regexFileName.test(x.name)).map((x) => x.name);
          this.client.destroy();
          resolve(fileNames);
        });
      });
    });
  }

  /**
   * connect to ftp
   *
   * @private
   * @memberof ImportService
   */
  private connect() {
    this.client = new Client();
    this.client.connect({
      host: this.configService.get('FTP.HOST'),
      port: this.configService.get('FTP.PORT'),
      user: this.configService.get('FTP.USER'),
      password: this.configService.get('FTP.PASSWORD'),
    });
  }

  /**
   * get all advertisers data from ftp file
   *
   * @private
   * @returns {Promise<AdvertiserDto[]>}
   * @memberof ImportService
   */
  private getAdvertisers(): Promise<AdvertiserDto[]> {
    return new Promise((resolve, reject) => {
      const advertisers: AdvertiserDto[] = [];
      this.connect();
      this.client.on('ready', () => {
        this.client.get('Yashi_Advertisers.csv', async (err, stream) => {
          if (err) {
            this.client.destroy();
            reject(err);
          }
          stream.once('close', () => {
            this.client.destroy();
          });

          const data = await this.readStream(stream);

          CSVtoJson({ trim: true, output: 'json', checkType: true })
            .fromString(data)
            .subscribe((jsonLine) => {
              advertisers.push(toClass(jsonLine, AdvertiserDto));
            })
            .on('done', (err) => {
              resolve(advertisers);
            });
        });
      });
    });
  }

  /**
   * get all file data from ftp filter by advertiser id
   *
   * @private
   * @param {string} fileName
   * @param {AdvertiserDto[]} advertisers
   * @returns {Promise<FileBaseDataDto[]>}
   * @memberof ImportService
   */
  private getFileDatas(fileName: string, advertisers: AdvertiserDto[]): Promise<FileBaseDataDto[]> {
    return new Promise((resolve, reject) => {
      const fileBaseDatas: FileBaseDataDto[] = [];
      this.connect();
      this.client.on('ready', () => {
        this.client.get(fileName, async (err, stream) => {
          if (err) {
            this.client.destroy();
            reject(err);
          }
          stream.once('close', () => {
            this.client.destroy();
          });
          const data = await this.readStream(stream);

          CSVtoJson({
            trim: true,
            output: 'json',
            checkType: true,
            colParser: {
              Date: (item, head, resultRow, row, colIdx) => moment(item, 'YYYY-MM-DD').unix(),
            },
          })
            .fromString(data)
            .subscribe((jsonLine) => {
              fileBaseDatas.push(toClass(jsonLine, FileBaseDataDto));
            })
            .on('done', (err) => {
              const resut = fileBaseDatas.filter((x) => advertisers.findIndex((a) => a.id === x.advertiserId) >= 0);
              resolve(resut);
            });
        });
      });
    });
  }

  /**
   * read stream and return string value in promise
   *
   * @private
   * @param {*} stream
   * @param {string} [encoding='utf8']
   * @returns {Promise<string>}
   * @memberof ImportService
   */
  private readStream(stream, encoding = 'utf8'): Promise<string> {
    stream.setEncoding(encoding);

    return new Promise((resolve, reject) => {
      let data = '';

      stream.on('data', (chunk) => (data += chunk));
      stream.on('end', () => resolve(data));
      stream.on('error', (error) => reject(error));
    });
  }
}
