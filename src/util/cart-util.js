import { apiRoot } from '../commercetools';
import config from '../config';

let VERBOSE=true;

// Fetch cart from commercetools, expanding all discount references for display purposes

const queryArgs = {expand: [
    'lineItems[*].discountedPricePerQuantity[*].discountedPrice.includedDiscounts[*].discount',
    'lineItems[*].price.discounted.discount',
    'discountCodes[*].discountCode'
  ]};

  const handleError = (e) => {
    console.log("CART ERROR",e);
    sessionStorage.setItem('error',e.message);
  }

export const getCart = async() => {
  const cartId = sessionStorage.getItem('cartId');
  console.log('CART UTIL Session cart id',cartId);
  if(!cartId)
    return null;
  
  let res =  await apiRoot
    .carts()
    .withId({ ID: cartId })
    .get({ queryArgs: queryArgs })
    .execute();

  if(!config.forceRecalcCart) {
    return res?.body;
  }
  // Force a recalculate, refreshing product data, etc.
  if(res?.body && res.body.cartState==='Active') {
    console.log('Recalculating...');
    let recalculatedCart = await apiRoot
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({
          queryArgs: queryArgs,
          body: {
            version: res.body.version,
            actions: [
              {
                action: "recalculate",
                updateProductData: true,
              }
            ]
          }
        })
        .execute()
    console.log(recalculatedCart.body);
    return recalculatedCart.body;
  }
  return null;
}

// return the cart after update
export const updateCart = async(actions) => {
  if(!Array.isArray(actions)) {
    actions = [ actions ];
  }

  console.log('actions',actions);

  let cart = await getCart();
  if(!cart)
    return;

  let res =  await apiRoot
    .carts()
    .withId({ ID: cart.id })
    .post({
      queryArgs: queryArgs,
      body: {
        version: cart.version,
        actions: actions
      }
    })
    .execute()
    .catch((e) => handleError(e));

  if(res?.body) {
    VERBOSE && console.log(res.body);
    return res.body;
  }
  return cart;
}

export const addToCart = async (productId, variantId, custom, quantity) => {

  const currency = "AUD";
  const country = "AU";
  const channelId = sessionStorage.getItem('channelId');
  const customerGroupId = sessionStorage.getItem('customerGroupId');
  const storeKey = sessionStorage.getItem('storeKey');

  const lineItem = {
    productId,
    variantId
  };
  if(channelId) {
    lineItem.distributionChannel={
      id: channelId,
      typeId: 'channel'
    }
    lineItem.supplyChannel={
      id: channelId,
      typeId: 'channel'
    }
  }
  // Add custom fields, if any
  lineItem.custom = custom;

  lineItem.quantity = quantity;
  
  let cart = await getCart();
  
  let result;
  if(cart) {
    // add item to current cart
    console.log('Adding to current cart',cart.id,cart.version, lineItem);
    result = await apiRoot
      .carts()
      .withId({ID: cart.id})
      .post({
        body: {
          version: cart.version,
          actions: [{
            action: 'addLineItem',
            ...lineItem
          }]
        }
    }).execute()
    .catch((e) => handleError(e));
  } else {
    console.log('creating cart & adding item');
    // Create cart and add item in one go. Save cart id

    console.log("my line items", lineItem);

    const createCartBody = {
      inventoryMode: 'None',
      currency: currency,
      lineItems: [lineItem],
      custom: {
        type: {
          typeId: "type",
          key: "Order",
        },
        fields: {
          CustomerType: "New",
          PostalCode: "2000",
          NewAddress: true,
          MedicalSupport: false,
        }
      }
    };
    if(country) {
      createCartBody.country = country;
    }
    if(customerGroupId) {
      createCartBody.customerGroup = {
        typeId: 'customer-group',
        id: customerGroupId,
      }
    }
    if(storeKey) {
      createCartBody.store = {
        typeId: 'store',
        key: storeKey,
      }
    }
  
    result = await apiRoot
      .carts()
      .post({
        body: createCartBody
      })
      .execute()
      .catch((e)  => handleError(e));
  }
  if(result) {
    console.log('result',result);
    sessionStorage.setItem('cartId',result.body.id);
  }
  return result;
}

export const addToCartSKU = async (sku, custom, quantity) => {

  const currency = "AUD";
  const country = "AU";
  const channelId = sessionStorage.getItem('channelId');
  const customerGroupId = sessionStorage.getItem('customerGroupId');
  const storeKey = sessionStorage.getItem('storeKey');

  const lineItem = {
    sku
  };
  if(channelId) {
    lineItem.distributionChannel={
      id: channelId,
      typeId: 'channel'
    }
    lineItem.supplyChannel={
      id: channelId,
      typeId: 'channel'
    }
  }
  // Add custom fields, if any
  lineItem.custom = custom;

  lineItem.quantity = quantity;
  
  let cart = await getCart();
  
  let result;
  if(cart) {
    // add item to current cart
    console.log('Adding to current cart',cart.id,cart.version, lineItem);
    result = await apiRoot
      .carts()
      .withId({ID: cart.id})
      .post({
        body: {
          version: cart.version,
          actions: [{
            action: 'addLineItem',
            ...lineItem
          }]
        }
    }).execute()
    .catch((e) => handleError(e));
  } else {
    console.log('creating cart & adding item');
    // Create cart and add item in one go. Save cart id

    console.log("my line items", lineItem);

    const createCartBody = {
      inventoryMode: 'None',
      currency: currency,
      lineItems: [lineItem],
      custom: {
        type: {
          typeId: "type",
          key: "Order",
        },
        fields: {
          CustomerType: "New",
          PostalCode: "2000",
          NewAddress: true,
          MedicalSupport: false,
        }
      }
    };
    if(country) {
      createCartBody.country = country;
    }
    if(customerGroupId) {
      createCartBody.customerGroup = {
        typeId: 'customer-group',
        id: customerGroupId,
      }
    }
    if(storeKey) {
      createCartBody.store = {
        typeId: 'store',
        key: storeKey,
      }
    }
  
    result = await apiRoot
      .carts()
      .post({
        body: createCartBody
      })
      .execute()
      .catch((e)  => handleError(e));
  }
  if(result) {
    console.log('result',result);
    sessionStorage.setItem('cartId',result.body.id);
  }
  return result;
}

export const convertToOrder = async(cartId, cartVersion) => {
  let result;
  result = await apiRoot.orders()
     .post({
       body: {
       cart: {
         id: cartId,
         version: cartVersion
       },
       version: cartVersion
     }
   })
   .execute()
   .catch((e) => console.log("here", e))

   return result;
}