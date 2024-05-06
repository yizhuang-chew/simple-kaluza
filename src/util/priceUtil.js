import { apiRoot } from '../commercetools';

export const getPriceByCtIDs = async (ctIDs) => {
  try {
    // Construct the where filter to include only products with specified ctIDs
    const whereFilter = ctIDs.map(ctID => `id="${ctID}"`).join(' or ');

    // Make the API call to retrieve prices for products with specified ctIDs
    const response = await apiRoot
      .productProjections()
      .get({ where: whereFilter, expand: 'price' })
      .execute();

    const prices = {};

    console.log("RESPONSE", response)

    // Extract prices from the response
    if (response?.body?.results.length > 0) {
      for (const product of response.body.results) {
        const rate = extractRate(product);
        if (rate !== null) {
          prices[product.id] = rate;
        }
      }
    }

    return prices;
  } catch (error) {
    console.error('Error fetching prices:', error);
    return {}; // Return an empty object if an error occurs
  }
};

const extractRate = (product) => {
    // Check if the product has the 'Electricity' or 'Gas' attribute
    const standingRateAttribute = product.masterVariant.attributes.find(attr => attr.name === 'StandingRate');
    const standingRateValue = standingRateAttribute? standingRateAttribute.value: 0;
    const unitRateAttribute = product.masterVariant.attributes.find(attr => attr.name === 'UnitRate');
    const unitRateValue = unitRateAttribute? unitRateAttribute.value: 0;
    const consumption = 123;

    const rate = Math.ceil(standingRateValue * 365 + unitRateValue * consumption);
    return rate;
  };