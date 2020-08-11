import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransformationService } from './transformation.service';

@Injectable()
export class FtpService {
  constructor(
    private readonly configService: ConfigService,
    private readonly transformationService: TransformationService,
  ) {}
}
