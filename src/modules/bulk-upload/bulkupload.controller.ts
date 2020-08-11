import { Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Bulk-Upload')
@Controller('bulk-upload')
export class BulkUploadController {
  @Post()
  @ApiOperation({ summary: 'Import all data in database' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully imported.',
  })
  async BulkUpload(): Promise<boolean> {
    return true;
  }
}
