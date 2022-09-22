import {IExecuteFunctions} from "n8n-core";
import {apiRequest} from "../../requestHelper";
import {INodeParameters, NodeParameterValue} from "n8n-workflow";

export class ProductRequests {

	private main: IExecuteFunctions;

	constructor(main: IExecuteFunctions) {
		this.main = main;
	}

	async findProductByProductNumber(productNumber: string) {
		return apiRequest.call(
			this.main,
			'POST',
			'api/search/product',
			this.createPayload(productNumber),
		);
	}

	// tslint:disable-next-line:no-any
	createPayload(productNumber: string) : any {
		const payload = {
			"filter": [
				{
					"type": "equals",
					"field": "productNumber",
					"value": productNumber,
				},
			],
			"page": 1,
			"limit": 1,
			"associations": {
				"media": {
					"sort": [
						{
							"field": "position",
							"order": "ASC",
							"naturalSorting": false,
						},
					],
					"total-count-mode": 1,
				},
				"properties": {
					"sort": [
						{
							"field": "name",
							"order": "ASC",
							"naturalSorting": false,
						},
					],
					"total-count-mode": 1,
				},
				"prices": {
					"sort": [
						{
							"field": "quantityStart",
							"order": "ASC",
							"naturalSorting": true,
						},
					],
					"total-count-mode": 1,
				},
				"tags": {
					"sort": [
						{
							"field": "name",
							"order": "ASC",
							"naturalSorting": false,
						},
					],
					"total-count-mode": 1,
				},
				"seoUrls": {
					"filter": [
						{
							"type": "equals",
							"field": "isCanonical",
							"value": true,
						},
					],
					"total-count-mode": 1,
				},
				"crossSellings": {
					"sort": [
						{
							"field": "position",
							"order": "ASC",
							"naturalSorting": false,
						},
					],
					"associations": {
						"assignedProducts": {
							"sort": [
								{
									"field": "position",
									"order": "ASC",
									"naturalSorting": false,
								},
							],
							"associations": {
								"product": {
									"associations": {
										"options": {
											"associations": {
												"group": {
													"total-count-mode": 1,
												},
											},
											"total-count-mode": 1,
										},
									},
									"total-count-mode": 1,
								},
							},
							"total-count-mode": 1,
						},
					},
					"total-count-mode": 1,
				},
				"cover": {
					"total-count-mode": 1,
				},
				"categories": {
					"total-count-mode": 1,
				},
				"visibilities": {
					"associations": {
						"salesChannel": {
							"total-count-mode": 1,
						},
					},
					"total-count-mode": 1,
				},
				"options": {
					"associations": {
						"group": {
							"total-count-mode": 1,
						},
					},
					"total-count-mode": 1,
				},
				"configuratorSettings": {
					"associations": {
						"option": {
							"total-count-mode": 1,
						},
					},
					"total-count-mode": 1,
				},
				"unit": {
					"total-count-mode": 1,
				},
				"productReviews": {
					"total-count-mode": 1,
				},
				"mainCategories": {
					"total-count-mode": 1,
				},
				"customFieldSets": {
					"total-count-mode": 1,
				},
				"featureSet": {
					"total-count-mode": 1,
				},
			},
			"total-count-mode": 1,
		};
		return payload;
	}
}
