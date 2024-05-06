import logo from "../assets/images/logo.svg";
import agllogo from "../assets/images/agl-jtc-logo.svg";
import "../App.css";
import "../Main.css";
import Header from "../components/header";
import { getPriceByCtIDs } from "../util/priceUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import config from "../config";
import { useEffect, useState, useContext, version } from "react";
import { useParams, Link } from "react-router-dom";
import { apiRoot } from "../commercetools";
import { setQueryArgs } from "../util/searchUtil";
import { productList } from "../util/productMap";
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
} from "@fortawesome/free-solid-svg-icons";

library.add(faHouse, faUser, faBagShopping, faHeart, faSearch, faBars);

function KaluzaStep1() {
  let [products, setProducts] = useState(null);
  const [input1Value, setInput1Value] = useState("");
  const [input2Value, setInput2Value] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const handleInput1Change = (e) => {
    setInput1Value(e.target.value);
  };

  const handleInput2Change = (e) => {
    setInput2Value(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const getProducts = async () => {
    if (products) {
      return;
    }

    let kProducts = productList;

    // Get array of ctIDs to retrieve prices for
    const ctIDs = kProducts.reduce((acc, product) => {
      if (product.electricity) {
        acc.push(product.electricity.ctID);
      }
      if (product.gas) {
        acc.push(product.gas.ctID);
      }
      return acc;
    }, []);

    const prices = await getPriceByCtIDs(ctIDs);

    // Update product prices based on the received prices
  for (const product of kProducts) {
    if (product.electricity && prices[product.electricity.ctID]) {
      product.electricity.price = prices[product.electricity.ctID];
    }
    if (product.gas && prices[product.gas.ctID]) {
      product.gas.price = prices[product.gas.ctID];
    }
  }

    setProducts(kProducts);
  };

  if (!products) {
    return null;
  }

  return (
    <div className="App">
      <Header />

      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        {/* products */}
        <div className="col-span-3">
          <div className="flex items-center mb-4">
            <h2 className="font-display">Compare electricity and gas plans</h2>
          </div>
          <div className="grid md:grid-cols-1 grid-cols-1 gap-6">
            <div className="bg-white shadow rounded overflow-hidden group">
              <div className="container mx-auto mt-8">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="flex items-center">
                    <div className="w-1/3 mr-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Enter Your Street Address
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={input1Value}
                        onChange={handleInput1Change}
                        placeholder="Address"
                      />
                    </div>
                    <div className="w-1/3 mr-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        I'm Looking For
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={input2Value}
                        onChange={handleInput2Change}
                        placeholder="Electricity"
                      />
                    </div>
                    <div className="w-1/3">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        View Estimated Cost
                      </label>
                      <select
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        value={selectedOption}
                        onChange={handleDropdownChange}
                      >
                        <option value="">Select an option</option>
                        <option value="option1">Yearly</option>
                        <option value="option2">Quarterly</option>
                        <option value="option3">Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-1 grid-cols-3 gap-1">
            {products.map((row, index) => (
              <div
                key={index}
                className="bg-white shadow rounded overflow-hidden group"
              >
                <Link to={`/k/step2/${row.ctID}`}>
                  <div className="pt-4 pb-3 px-4 ">
                    <div className="">
                      <p className="text-xl font-semibold text-center">
                        {row.name}
                      </p>
                      <h3 className="text-sm text-center">
                        {row.nameDescription}
                      </h3>
                    </div>
                    <div
                      style={{ marginTop: "50px" }}
                      className="pt-5 border-t-2 border-zinc-100"
                    ></div>
                    {row.electricity && (
                      <div style={{ marginTop: "20px" }} className="min-h-60">
                        <p className="text-sm font-semibold">Electricity</p>
                        <div className="flex items-baseline mb-1 space-x-2">
                          <div style={{ marginRight: "50px" }}>
                            <p className="text-blue-800 text-3xl font-semibold">
                              {row.electricity.percentage}
                            </p>
                            <span className="text-zinc-500 text-xs">
                              Less than the Reference Price
                            </span>
                          </div>
                          <div>
                            <p className="text-3xl font-semibold">
                              ${row.electricity.price}{" "}
                              <span className="text-xs">/year</span>
                            </p>
                            <span className="text-zinc-500 text-xs">
                              {row.electricity.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    {row.gas && (
                      <div style={{ marginTop: "20px" }} className="min-h-60">
                        <p className="text-sm font-semibold">Gas</p>
                        <div className="flex items-baseline mb-1 space-x-2">
                          <div style={{ marginRight: "50px" }}>
                            <p className="text-blue-800 text-3xl font-semibold">
                              {row.gas.percentage}
                            </p>
                            <span className="text-zinc-500 text-xs">
                              month energy plan period
                            </span>
                          </div>
                          <div>
                            <p className="text-3xl font-semibold">
                              ${row.gas.price}{" "}
                              <span className="text-xs">/year</span>
                            </p>
                            <span className="text-zinc-500 text-xs">
                              {row.gas.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div style={{ marginTop: "100px" }} className="">
                      <p className="text-xs underline text-blue-800 text-center">
                        Basic Plan Information
                      </p>
                      <div style={{ marginTop: "10px" }}>
                        <a
                          href="#"
                          className="bg-blue-800 border text-sm border-primary text-white text-center justify-center px-8 py-3 font-medium rounded-3xl hover:bg-transparent hover:text-primary flex items-center"
                        >
                          Sign Up Now
                        </a>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* ./products */}
      </div>

      <footer
        className="pt-16 pb-12 border-t border-gray-100 gradientBlue"
      >
        <div className="container grid grid-cols-1">
          <div className="col-span-1 space-y-4">
            <img src={agllogo} alt="logo" className="w-30" />
            <div className="mr-2">
              
            </div>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <i className="fa-brands fa-facebook-square" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <i className="fa-brands fa-instagram-square" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <i className="fa-brands fa-twitter-square" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <i className="fa-brands fa-github-square" />
              </a>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-white">
                  Solutions
                </h3>
                <div className="mt-4 space-y-4">
                  <a
                    href="#"
                    className="text-base text-gray-100 hover:text-gray-500 block"
                  >
                    Marketing
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-100 hover:text-gray-500 block"
                  >
                    Analitycs
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-100 hover:text-gray-500 block"
                  >
                    Commerce
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-100 hover:text-gray-500 block"
                  >
                    Insights
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-white">
                  Support
                </h3>
                <div className="mt-4 space-y-4">
                  <a
                    href="#"
                    className="text-base text-gray-100 hover:text-gray-500 block"
                  >
                    Pricing
                  </a>
                  {/* <a href="#" class="text-base text-gray-100 hover:text-gray-500 block">Documentation</a> */}
                  <a
                    href="#"
                    className="text-base text-gray-100 hover:text-gray-500 block"
                  >
                    Guides
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-100 hover:text-gray-500 block"
                  >
                    API Status
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-white">
                  Solutions
                </h3>
                <div className="mt-4 space-y-4">
                  <a
                    href="#"
                    className="text-base text-gray-100 hover:text-gray-500 block"
                  >
                    Marketing
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-100 hover:text-gray-500 block"
                  >
                    Analitycs
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-100 hover:text-gray-500 block"
                  >
                    Commerce
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-100 hover:text-gray-500 block"
                  >
                    Insights
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-white">
                  Support
                </h3>
                <div className="mt-4 space-y-4">
                  <a
                    href="#"
                    className="text-base text-gray-100 hover:text-gray-500 block"
                  >
                    Pricing
                  </a>
                  {/* <a href="#" class="text-base text-gray-100 hover:text-gray-500 block">Documentation</a> */}
                  <a
                    href="#"
                    className="text-base text-gray-100 hover:text-gray-500 block"
                  >
                    Guides
                  </a>
                  <a
                    href="#"
                    className="text-base text-gray-100 hover:text-gray-500 block"
                  >
                    API Status
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default KaluzaStep1;
