import { INodeProperties } from 'n8n-workflow';


export const productOperation: INodeProperties[] = [
	{
		displayName: 'Avilable requests',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['resource_product'],
			},
		},
		options: [
			{
				name: 'Get a Single Product by ID',
				value: 'get_by_id',
				description: 'Get a single product',
				action: 'Ship an order',
			},
			{
				name: 'Get a Single Product by Number',
				value: 'get_product_by_number',
				description: 'Get a single product by product number',
				action: 'Ship an order',
			},
		],
		default: 'get_product_by_number',
	},
];

export const productFields: INodeProperties[] = [
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['resource_product'],
				operation: ['get_product_by_id'],
			},
		},
	},
	{
		displayName: 'Product Number',
		name: 'productNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['resource_product'],
				operation: ['get_product_by_number'],
			},
		},
	},
];
