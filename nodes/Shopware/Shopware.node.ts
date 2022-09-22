import { INodeExecutionData, INodePropertyOptions, INodeType, INodeTypeDescription } from 'n8n-workflow';
import {IExecuteFunctions,} from 'n8n-core';


import { apiRequest } from './requestHelper';
import { orderFields, orderOperation } from './Order';

import { productFields, productOperation } from './entities/product/Product';
import { syncFields, syncOperation } from './entities/sync/Sync';

import { ProductRequests } from './entities/product/Requests';

export class Shopware implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Shopware API Client',
		name: 'Shopware',
		icon: 'file:shopware_logo_blue-RGB_VER.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Shopware 6 API Client',
		defaults: {
			name: 'Shopware 6 API Client',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'ShopwareApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'API-Typ',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Sync',
						value: 'resource_sync',
					},
					{
						name: 'Order',
						value: 'resource_order',
					},
					{
						name: 'Product',
						value: 'resource_product',
					},
				],
				default: 'resource_sync',
				noDataExpression: true,
				required: true,
				description: 'API-Type',
			},
			...syncOperation,
			...syncFields,
			...orderOperation,
			...orderFields,
			...productOperation,
			...productFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][] | null> {

		const resource  = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const items 	  = this.getInputData();
		let responseData = {};
		const returnItems: INodeExecutionData[] = [];


		const productRequests = new ProductRequests(this);

		console.log("Resource-Type " + resource);
		switch (resource) {

			case 'resource_sync':

				for (let i = 0; i < items.length; i++) {

					console.log('Sync-Request: ', JSON.stringify(items[i].json, null, 2));

					responseData = await apiRequest.call(
						this,
						'POST',
						`api/_action/sync`,
						 items[i].json,
					);

					console.log('Sync-Response: ', JSON.stringify(responseData, null, 2));


					returnItems.push.apply(
						returnItems,
						this.helpers.returnJsonArray(responseData),
					);
				}
				break;

				// https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Magento/Magento2.node.ts
				// https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Magento/OrderDescription.ts
				// https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/credentials/Magento2Api.credentials.ts
			case 'resource_order':

				const orderId = this.getNodeParameter('orderId', 0) as string;
				responseData = await apiRequest.call(
					this,
					'GET',
					`api/order/${orderId}`,
				);
				break;

			case 'resource_product':
				if (operation === 'get_product_by_number') {

					for (let i = 0; i < items.length; i++) {

						console.log('CurrentIndex: ', 	i);
						const productNumber = this.getNodeParameter('productNumber', i) as string;
						console.log('ProductNumber: ', 	productNumber);
						console.log('Items: ', 	items);
						console.log('NodeParameter: ', 	this.getNodeParameter('productNumber', i));
						responseData = await productRequests.findProductByProductNumber(productNumber);

						console.log('Response: ', responseData);
						returnItems.push.apply(
							returnItems,
							this.helpers.returnJsonArray(responseData),
						);
					}
				}
				break;

			default:
				// Kein Request
		}


		// Map data to n8n data structure
		return [returnItems];
	}
}
