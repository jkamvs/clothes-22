const axios = require("axios");
const adaptListProducts = require("./productsAdapter");

async function getAPIproducts(categoryId) {
	const options = {
		method: "GET",
		url: "https://asos2.p.rapidapi.com/products/v2/list",
		params: {
			store: "US",
			offset: "0",
			categoryId: `${categoryId}`,
			limit: "48",
		},
		headers: {
			"X-RapidAPI-Host": "asos2.p.rapidapi.com",
			"X-RapidAPI-Key": "4b263d20a9msha7e9b0bfbc799a1p11d5f6jsn447afdb350bc",
		},
	};

	return axios(options)
		.then(({ data }) => adaptListProducts(data))
		.catch((e) => console.log(e.message));
}

module.exports = getAPIproducts;
