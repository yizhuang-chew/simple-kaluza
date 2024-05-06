import logo from "../assets/images/logo.svg";
import "../App.css";
import "../Main.css";
import Header from "../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState, useContext, version } from "react";
import config from "../config";
import { getCart, addToCart, updateCart } from "../util/cart-util";
import { apiRoot } from "../commercetools";
import {
  faBagShopping,
  faHeart,
  faHouse,
  faUser,
  faSearch,
  faBars,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
library.add(faHouse, faUser, faBagShopping, faHeart, faSearch, faBars, faClock);

function KaluzaCart() {
  let [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    let myCart = await getCart();

    console.log(cart);

    if (myCart) {
      setCart({
        info: myCart,
        lineItems: await includeLineItems(myCart.lineItems),
      });
    }
  };

  const includeLineItems = async (lineItems) => {
    let includedAddOns = [];

    console.log("my lineItems", lineItems);

    // add the add ons
    for (const [key, value] of Object.entries(lineItems)) {
      console.log("VALUE", value);
      let obj = {
        main: value,
        included: await fetchAddons(value.custom?.fields, "AddOn"),
        rate: extractRate(value)
      };

      includedAddOns.push(obj);
    }

    return includedAddOns;
  };

  const extractRate = (lineItem) => {
    // Check if the product has the 'Electricity' or 'Gas' attribute
    const standingRateAttribute = lineItem.variant.attributes.find(attr => attr.name === 'StandingRate');
    const standingRateValue = standingRateAttribute? standingRateAttribute.value: 0;
    const unitRateAttribute = lineItem.variant.attributes.find(attr => attr.name === 'UnitRate');
    const unitRateValue = unitRateAttribute? unitRateAttribute.value: 0;
    const consumption = 123;

    const rate = Math.ceil(standingRateValue * 365 + unitRateValue * consumption);
    return rate;
  };

  const fetchAddons = async (attributes, attrKey) => {
    let includedAddOns = [];

    if (attributes && attributes[attrKey]) {
      let subProduct = await fetchAPIProduct(attributes[attrKey]);
      includedAddOns.push(subProduct);
    }

    return includedAddOns;
  };

  const fetchAPIProduct = async (prodId) => {
    let res1 = await apiRoot.products().withId({ ID: prodId }).get().execute();

    return res1.body.masterData.current;
  };

  if (!cart) {
    return null;
  }

  console.log("my cart", cart);

  return (
    <div className="App">
      <Header />

      <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
        <div className="col-span-9 border border-gray-200 p-4 rounded">
          <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase pl-10">
            Your Cart
          </h4>

          <div className="space-y-2">
            <div className="">
              {cart.lineItems.map(
                (row, index) =>
                  (row.main.productType.id ===
                    "4b46d754-40ab-432c-b17d-fee089e1f1ae" ||
                    row.main.productType.id ===
                      "06acc983-f8ce-4fe8-9da1-95b0ab3c1c35") && (
                    <div key={index}>
                      <div className="flex justify-between border-t border-gray-200 p-10">
                        <div>
                          <h3 className="text-gray-800 font-medium">
                            {row.main.name[config.locale]}
                          </h3>
                          <p className="text-sm text-gray-600">
                            ${row.rate} incl GST estimated annual cost
                          </p>
                          <p className="text-sm text-blue-600">Remove</p>
                        </div>

                        <div>
                          <p className="text-gray-800 font-medium">
                            Based on Usage
                          </p>
                        </div>
                      </div>
                      {row.included.map((includedRow, includedIndex) => (
                        <div className="flex justify-between p-10">
                          <div>
                            <h3 className="text-gray-800 font-medium">
                              {includedRow.name[config.locale]}
                            </h3>
                          </div>

                          <div>
                            <p className="text-gray-800 font-medium">Weekly</p>
                          </div>
                          <div>
                            <p className="text-gray-800 font-medium">${(includedRow.masterVariant.prices[0].value.centAmount/100).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
              )}
            </div>

            <div className="">
              {cart.lineItems.map(
                (row, index) =>
                  (row.main.productType.id ===
                    "7c23da2c-1bbb-407c-875b-4a3c21b4e545" || row.main.productType.id ===
                    "ee89647a-7a3a-496c-a27b-6e4ebe788356") && (
                    <div key={index}>
                      <div className="flex justify-between border-t border-gray-200 p-10">
                        <div>
                          <h3 className="text-gray-800 font-medium">
                            {row.main.name[config.locale]}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {row.main.variant.sku}
                          </p>
                          <p className="text-sm text-blue-600">Remove</p>
                        </div>

                        <div>
                          <p className="text-gray-800 font-medium">
                            Free
                          </p>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        <div className="col-span-3 border border-gray-200 p-4 rounded">
          <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
            Checkout now to join agl
          </h4>
          <div className="space-y-2">
            <div className="flex">
              <p className="text-gray-800 font-medium w-10">
                <FontAwesomeIcon icon="fa-solid fa-clock" />
              </p>
              <h5 className="text-gray-800 font-medium">
                Signing up now takes minutes
              </h5>
            </div>
            <div className="flex">
              <p className="text-gray-800 font-medium  w-10">
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </p>
              <h5 className="text-gray-800 font-medium">
                You'll need a driver's license.
              </h5>
            </div>
            <div>
              <input
                type="text"
                name="search"
                id="search"
                className="w-full border border-primary"
                style={{ border: "1px solid black" }}
                placeholder="Email Address"
              />
            </div>
          </div>

          <div className="flex items-center mb-4 mt-2"></div>

          <Link
            to={`/kcheckout`}
            className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
          >
            Check Out Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default KaluzaCart;
