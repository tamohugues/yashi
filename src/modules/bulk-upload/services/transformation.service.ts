import { Injectable } from '@nestjs/common';
import { FtpService } from './ftp.service';

@Injectable()
export class TransformationService {
  constructor(private readonly ftpService: FtpService) {}
}
