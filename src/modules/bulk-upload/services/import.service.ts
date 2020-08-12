import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransformationService } from './transformation.service';
import { toClass } from 'class-converter';
import { FileBaseDataDto, AdvertiserDto } from '../dtos';
import * as Client from 'ftp';
import * as CSVtoJson from 'csvtojson';
import * as moment from 'moment';

@Injectable()
export class ImportService {
  private client: Client;
  private regexFileName: RegExp;

  constructor(
    private readonly configService: ConfigService,
    private readonly transformationService: TransformationService,
  ) {
    this.regexFileName = new RegExp(/Yashi_\d{4}-05-\d{2}\.csv/, 'g');
  }

  importFiles() {
    this.connect();
    this.client.on('ready', () => {
      this.client.list(async (err, list) => {
        if (err) {
          this.client.destroy();
          throw err;
        }
        const fileNames: string[] = list.filter((x) => this.regexFileName.test(x.name)).map((x) => x.name);
        this.client.destroy();

        const advertisers = await this.getAdvertisers();

        const fileBaseDatas = await this.getFileDatas(fileNames[0], advertisers);

        console.log(fileBaseDatas);
      });
    });
  }

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
   * @returns {Promise<AdvertiserDto[]>}
   * @memberof ImportService
   */
  private getAdvertisers(): Promise<AdvertiserDto[]> {
    return new Promise((resolve, reject) => {
      let advertisers: AdvertiserDto[] = [];
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
   * @param {string} fileName
   * @param {AdvertiserDto[]} advertisers
   * @returns {Promise<FileBaseDataDto[]>}
   * @memberof ImportService
   */
  private getFileDatas(fileName: string, advertisers: AdvertiserDto[]): Promise<FileBaseDataDto[]> {
    return new Promise((resolve, reject) => {
      let fileBaseDatas: FileBaseDataDto[] = [];
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
