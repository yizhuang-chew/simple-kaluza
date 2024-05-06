import logo from "../assets/images/logo.svg";
import agllogo from "../assets/images/agl-jtc-logo.svg";
import startbanner from "../assets/images/agl_illus_dig_letsgetstarted.svg";
import digitalbanner from "../assets/images/agl_illus_dig_contact.svg";
import "../App.css";
import "../Main.css";
import Header from "../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import config from "../config";
import { useEffect, useState, useContext, version } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apiRoot } from "../commercetools";
import { setQueryArgs } from "../util/searchUtil";
import { getCart, addToCart, updateCart, addToCartSKU } from "../util/cart-util";
import {
  faBagShopping,
  faHeart,
  faHouse,
  faUser,
  faSearch,
  faBars,
  faGripVertical,
  faList,
  faChevronRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faHouse,
  faUser,
  faBagShopping,
  faHeart,
  faSearch,
  faBars,
  faArrowRight
);

function KaluzaCategoryStep3() {
  let { productId } = useParams();
  let [cart, setCart] = useState(null);
  let [product, setProduct] = useState(null);
  let [isCheckedElectricity, setIsCheckedElectricity] = useState(false);
  let [isCheckedGas, setIsCheckedGas] = useState(false);
  let [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts(productId);
  }, []);

  const getProducts = async (productId) => {
    if (product || !productId) {
      return;
    }

    const queryArgs = setQueryArgs();

    /* Last, but not least, add a couple of reference expansions to include channel and customer group data */
    queryArgs.expand = [
      "masterVariant.prices[*].channel",
      "masterVariant.prices[*].customerGroup",
      "masterVariant.prices[*].discounted.discount",
      "masterVariant.price.discounted.discount",
      "variants[*].prices[*].channel",
      "variants[*].prices[*].customerGroup",
      "variants[*].prices[*].discounted.discount",
      "variants[*].price.discounted.discount",
    ];

    let res = await apiRoot
      .products()
      .withId({ ID: productId })
      .get({ queryArgs: queryArgs })
      .execute();

    if (res && res.body) {
      let mainProduct = res.body.masterData.current;
      let productType = res.body.productType.id;
      let mainElectricity = {};
      let mainGas = {};
      let electricityAddon = {};
      let gasAddon = {};
      let netflixList = [];

      console.log("PRODUCTTYPE", productType);

      if (productType === "4b46d754-40ab-432c-b17d-fee089e1f1ae") {
        // Elec
        mainElectricity = res.body;
        electricityAddon = await fetchAddons(
          mainElectricity.masterData.current.masterVariant.attributes,
          "CarbonNeutralAddOn"
        );
        netflixList = fetchBundleItems(
          mainElectricity.masterData.current.masterVariant.attributes,
          "BundleItems"
        );
        if (netflixList.length > 0) {
          setSelectedPlan(netflixList[0].Variant);
        }
      } else if (productType === "06acc983-f8ce-4fe8-9da1-95b0ab3c1c35") {
        // Gas
        mainGas = res.body;
        gasAddon = await fetchAddons(
          mainGas.masterData.current.masterVariant.attributes,
          "CarbonNeutralAddOn"
        );
      } else {
        //Bundle
        mainElectricity = await fetchAddons(
          mainProduct.masterVariant.attributes,
          "Electricity"
        );
        mainGas = await fetchAddons(
          mainProduct.masterVariant.attributes,
          "Gas"
        );
        electricityAddon = await fetchAddons(
          mainElectricity.masterData.current.masterVariant.attributes,
          "CarbonNeutralAddOn"
        );
        gasAddon = await fetchAddons(
          mainGas.masterData.current.masterVariant.attributes,
          "CarbonNeutralAddOn"
        );
        netflixList = fetchBundleItems(
          mainElectricity.masterData.current.masterVariant.attributes,
          "BundleItems"
        );
        if (netflixList.length > 0) {
          setSelectedPlan(netflixList[0].Variant);
        }
      }

      setProduct({
        id: productId,
        productType: productType,
        main: res.body,
        mainElectricity: mainElectricity,
        mainGas: mainGas,
        electricityAddon: electricityAddon,
        gasAddon: gasAddon,
        netflixList: netflixList,
      });
    }
  };

  const fetchAPIProduct = async (prodId) => {
    let res1 = await apiRoot.products().withId({ ID: prodId }).get().execute();

    return res1.body;
  };

  const fetchAddons = async (attributes, attrKey) => {
    let subProduct = {};

    // add the add ons
    for (const [key, value] of Object.entries(attributes)) {
      if (value.name === attrKey) {
        subProduct = await fetchAPIProduct(value.value.id);
      }
    }

    return subProduct;
  };

  const fetchBundleItems = (attributes, attrKey) => {
    let bundleItems = [];

    // add the add ons
    for (const [key, value] of Object.entries(attributes)) {
      if (value.name === attrKey) {
        for (const item of value.value) {
          const bundleItem = {};
          for (const attr of item) {
            bundleItem[attr.name] = attr.value;
          }
          // bundleItem[key1] = value1
          bundleItems.push(bundleItem);
        }
      }
    }

    bundleItems.reverse();

    return bundleItems;
  };

  const handleCheckboxElecrityChange = () => {
    setIsCheckedElectricity(!isCheckedElectricity);
  };

  const handleCheckboxGasChange = () => {
    setIsCheckedGas(!isCheckedGas);
  };

  const handlePlanSelection = (isChecked, variant) => {
    console.log(variant);
    setSelectedPlan(isChecked ? variant : null); // Replace "selectedPlanId" with the actual ID of the plan
  };

  const deleteCart = async () => {
    let cart = await getCart();
    sessionStorage.removeItem("cartId");
    setCart(null);
    if (cart) {
      await apiRoot
        .carts()
        .withId({ ID: cart.id })
        .delete({
          queryArgs: {
            version: cart.version,
          },
        })
        .execute();
    }
  };

  const addItems = async () => {
    await deleteCart();

    let customElectricity = {};
    let customGas = {};

    if (product.productType === "662cf4d5-3973-4e68-ad1b-7c0ecbb7a50b") {
      const result = await addToCart(product.id, 1, null, 1);
    }

    if (product.mainElectricity?.id) {
      customElectricity = {
        type: {
          typeId: "type",
          key: "ElectricityLineItem",
        },
      };
      if (isCheckedElectricity) {
        customElectricity.fields = {
          AddOn: product.electricityAddon.id,
        };
      }

      const result1 = await addToCart(
        product.mainElectricity.id,
        product.mainElectricity.masterData.current.masterVariant.id,
        customElectricity,
        1
      );
      if (isCheckedElectricity) {
        const result1AddOn = await addToCart(
          product.electricityAddon.id,
          1,
          null,
          1
        );
      }
    }
    if (product.mainGas?.id) {
      customGas = {
        type: {
          typeId: "type",
          key: "GasLineItem",
        },
      };
      if (isCheckedGas) {
        customGas.fields = {
          AddOn: product.gasAddon.id,
        };
      }

      const result2 = await addToCart(
        product.mainGas.id,
        product.mainGas.masterData.current.masterVariant.id,
        customGas,
        1
      );

      if (isCheckedGas) {
        const result2AddOn = await addToCart(product.gasAddon.id, 1, null, 1);
      }
    }
    if (selectedPlan) {
      const resultNetflix = await addToCartSKU(selectedPlan, {type: {key: "NetflixLineItem"}}, 1);
    }

    navigate("/kcart");
  };

  return (
    <div className="App">
      <Header />

      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 items-start">
        <div class="col-span-1 guided-banner-container gradientBlue pl-10 pt-20 pr-10 pb-20 ">
          <div>
            <img src={startbanner} alt="hello" />
            <span class="font-display text-white">Get Carbon Neutral</span>
            <div class="mt-5" />
            <span class="text-white">
              Support projects that reduce or remove emissions
            </span>
          </div>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-1">
            <div className="columns-1">
              <h2 className="text-3xl font-medium uppercase mt-10 mb-5">
                Add Carbon Neutral
              </h2>
              <p styles={{ display: "block" }}>
                When you add Carbon Neutral to a plan, we buy eligible carbon
                credits from accredited projects to offset the emissions
                associated with the energy supplied and used in your home. See
                how it works
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-1 grid-cols-1 gap-2">
            {product?.electricityAddon && product.electricityAddon?.id && (
              <div
                style={{ marginTop: "20px" }}
                className="bg-white shadow rounded overflow-hidden group"
              >
                <div className="flex items-baseline mb-1 space-x-2 p-10">
                  <div className="mr-20 w-120">
                    <p className="">Add Carbon Neutral Electricity</p>
                  </div>
                  <div>
                    <p className="">$1.00</p>
                    <span className="">Gst Included</span>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="mr-2 leading-tight ml-10"
                      checked={isCheckedElectricity}
                      onChange={handleCheckboxElecrityChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {product?.gasAddon && product.gasAddon?.id && (
              <div
                style={{ marginTop: "20px" }}
                className="bg-white shadow rounded overflow-hidden group"
              >
                <div className="flex items-baseline mb-1 space-x-2  p-10">
                  <div className="mr-20 w-120">
                    <p className="">Add Carbon Neutral Gas</p>
                  </div>
                  <div>
                    <p className="">$0.50</p>
                    <span className="">Gst Included</span>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="mr-2 leading-tight ml-10"
                      checked={isCheckedGas}
                      onChange={handleCheckboxGasChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ./products */}
      </div>
      {product?.netflixList.length > 0 && (
        <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-2 items-start">
          <div class="col-span-1 guided-banner-container gradientBlue pl-10 pt-20 pr-10 pb-20 ">
            <div>
              <img src={digitalbanner} alt="hello" />
              <span class="font-display text-white">
                Your electricity plan includes Netflix
              </span>
              <div class="mt-5" />
              <span class="text-white">
                Choose your Netflix tier and get the popcorn ready
              </span>
            </div>
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-1">
              <div className="columns-1">
                <h2 className="text-3xl font-medium uppercase mt-10 mb-5">
                  Choose your Netflix tier
                </h2>
                <p styles={{ display: "block" }}>
                  Start using Netflix when your new electricity plan begins and
                  you’ve activated it. It’s easy! We’ll send you all the
                  information you need.
                </p>
                <p styles={{ display: "block" }} class="mt-3">
                  Already have Netflix? Link your account when you sign up to
                  the AGL Netflix Plan to stop your existing Netflix billing
                  method.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-1 grid-cols-1 gap-2">
              {product?.netflixList.map((row, index) => (
                <div
                  key={row.Variant}
                  style={{ marginTop: "20px" }}
                  className="bg-white shadow rounded overflow-hidden group"
                >
                  <div className="flex items-baseline mb-1 space-x-2 p-10">
                    <div className="mr-20 w-120">
                      <p className="">{row.Variant}</p>
                    </div>
                    <div>
                      <p className="">
                        + ${row.PriceWithBundle.centAmount / 100}
                      </p>
                      <span className="">(approx.) per month</span>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="netflixPlan"
                        className="mr-2 leading-tight ml-10"
                        checked={selectedPlan === row.Variant}
                        onChange={(e) =>
                          handlePlanSelection(e.target.checked, row.Variant)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ./products */}
        </div>
      )}
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 items-start">
        <div className="col-span-1" />
        <div className="col-span-3">
          <div style={{ marginTop: "10px", marginBottom: "100px" }}>
            <div>
              <button
                className="block w-120 float-right py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                onClick={() => addItems()}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KaluzaCategoryStep3;
