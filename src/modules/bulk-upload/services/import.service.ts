import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransformationService } from './transformation.service';
import * as Client from 'ftp';
import * as CSVtoJson from 'csvtojson';

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

  importFile() {
    this.connect();
    this.client.on('ready', () => {
      this.client.list((err, list) => {
        if (err) {
          this.client.destroy();
          throw err;
        }
        const fileNames: string[] = list.filter((x) => this.regexFileName.test(x.name)).map((x) => x.name);
        this.client.destroy();

        this.getFile(fileNames[0]);
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

  getFile(fileName: string) {
    this.connect();
    this.client.on('ready', () => {
      this.client.get(fileName, async (err, stream) => {
        if (err) throw err;
        stream.once('close', () => {
          this.client.destroy();
        });
        const data = await this.readStream(stream);

        CSVtoJson({ trim: true, output: 'json', checkType: true })
          .fromString(data)
          .subscribe((jsonLine) => {
            console.dir(jsonLine);
          });
      });
    });
  }

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
