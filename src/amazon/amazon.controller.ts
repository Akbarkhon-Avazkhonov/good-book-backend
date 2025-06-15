import { Controller, Post, Body } from '@nestjs/common';
import { AmazonService } from './amazon.service';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('Amazon API')
@Controller('amazon')
export class AmazonController {
  constructor(private readonly amazonService: AmazonService) {}

  @Post('browse-nodes')
  @ApiOperation({ summary: 'Получить browseNodes по ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '13887280011',
          description: 'ID browse node (например, из Amazon BrowseNodes API)',
        },
      },
      required: ['id'],
    },
  })
  getBrowseNodes(@Body() body: { id: string }) {
    return this.amazonService.getBrowseNodes(body.id);
  }
}
