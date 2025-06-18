import { Injectable, Search } from '@nestjs/common';
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

  async searchItems(nodeId: string) {
    if (!nodeId) {
      throw new Error('Node ID is required');
    }

    const response = await callPAAPI(
      {
        Marketplace: process.env.AMAZON_MARKETPLACE,
        PartnerType: process.env.AMAZON_PARTNER_TYPE,
        PartnerTag: process.env.AMAZON_PARTNER_TAG,
        SearchIndex: 'Books', // Example SearchIndex, can be changed based on requirements
        Resources: [
          'ItemInfo.Title',
          'ItemInfo.ByLineInfo',
          'Images.Primary.Large',
          'Images.Primary.Medium',
          'Images.Primary.Small',
          'ItemInfo.ContentInfo',
        ],
        BrowseNodeId: nodeId,
        ItemCount: 10, // Number of items to return
        SortBy: 'Featured', // Sorting criteria
      },
      'SearchItems',
    );

    return response;
  }
}
