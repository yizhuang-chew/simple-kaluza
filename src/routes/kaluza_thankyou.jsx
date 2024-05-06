import logo from "../assets/images/logo.svg";
import agllogo from "../assets/images/agl-jtc-logo.svg";
import thankyoubanner from "../assets/images/banner-thankyou.png";
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
import { getCart, addToCart, updateCart } from "../util/cart-util";
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

function KaluzaThankYou() {
  return (
    <div className="App">
      <Header />

      <div className="container grid">
        <img src={thankyoubanner} alt="thankyoubanner" />
      </div>
      <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">
            Login To Manage Your Plans
          </h2>
          <form action="#" method="post" autoComplete="off">
            <div className="space-y-2">
              <div>
                <label htmlFor="email" className="text-gray-600 mb-2 block">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="youremail.@domain.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-gray-600 mb-2 block">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="*******"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                Login
              </button>
            </div>
          </form>
          {/* login with */}
          <div className="mt-6 flex justify-center relative">
            <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
              Or login with
            </div>
            <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200" />
          </div>
          <div className="mt-4 flex gap-4">
            <a
              href="#"
              className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
            >
              facebook
            </a>
            <a
              href="#"
              className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
            >
              google
            </a>
          </div>
        </div>
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

export default KaluzaThankYou;
