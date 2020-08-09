import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FtpService {
  constructor(private readonly configService: ConfigService) {}
}
