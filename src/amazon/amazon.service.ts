import { Injectable } from '@nestjs/common';
import { callPAAPI } from 'src/lib/paapi';

@Injectable()
export class AmazonService {
  async getBrowseNodes(id: string) {
    if (!id) {
      throw new Error('ASIN is required');
    }

    const response = await callPAAPI(
      {
        Marketplace: process.env.AMAZON_MARKETPLACE,
        PartnerType: process.env.AMAZON_PARTNER_TYPE,
        PartnerTag: process.env.AMAZON_PARTNER_TAG,
        Resources: ['BrowseNodes.Ancestor', 'BrowseNodes.Children'],
        BrowseNodeIds: [id],
      },
      'GetBrowseNodes',
    );

    return response;
  }
}
