import { Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ImportService } from './services';

@ApiTags('Bulk-Upload')
@Controller('bulk-upload')
export class BulkUploadController {
  constructor(private readonly importService: ImportService) {}

  @Post()
  @ApiOperation({ summary: 'Import all data in database' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully imported.',
  })
  BulkUpload(): boolean {
    this.importService.importFile();
    return true;
  }
}
