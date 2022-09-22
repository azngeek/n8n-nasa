import { INodeProperties } from 'n8n-workflow';


export const syncOperation: INodeProperties[] = [
	{
		displayName: 'Sync Operations',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['resource_sync'],
			},
		},
		options: [
			{
				name: 'Syncs',
				value: 'sync',
				description: 'Sync a payload',
				action: 'Sync a payload',
			},
		],
		default: 'sync',
	},
];

export const syncFields: INodeProperties[] = [
	{
		displayName: 'Reindex',
		name: 'syncReindex',
		type: 'boolean',
		default: true, // Initial state of the toggle
		description: 'Run reindex after sync',
		displayOptions: { // the resources and operations to display this element with
			show: {
				resource: [
					'resource_sync',
				],
				operation: [
					'sync',
				],
			},
		},
	},
];
