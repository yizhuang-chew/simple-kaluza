import logo from "../assets/images/logo.svg";
import startbanner from "../assets/images/agl_illus_dig_letsgetstarted.svg";
import newbanner from "../assets/images/man-with-mobile.svg";
import existingbanner from "../assets/images/girl-with-tick.svg";
import "../App.css";
import "../Main.css";
import Header from "../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import config from "../config";
import { useEffect, useState, useContext, version } from "react";
import { useParams, Link } from "react-router-dom";
import { apiRoot } from "../commercetools";
import { setQueryArgs } from "../util/searchUtil";
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

function KaluzaCategoryStep2() {
  let [product, setProduct] = useState(null);
  let { productId } = useParams();

  useEffect((productId) => {
    getProducts(productId);
  }, []);

  const getProducts = async (productId) => {
    if (product || !productId) {
      return;
    }
  };

  return (
    <div className="App">
      <Header />

      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <div class="guided-banner-container gradientBlue pl-10 pt-20 pr-10 pb-20">
          <div>
            <img src={startbanner} alt="hello" />
            <span class="font-display text-white">Great choice!</span>
            <div class="mt-5" />
            <span class="text-white">
              Do you have a current energy, internet, or phone account with us?
            </span>
          </div>
        </div>
        <div className="col-span-3">
          <div className="grid md:grid-cols-1 gap-6">
            <div className="bg-white shadow rounded overflow-hidden group">
              <Link to={`/k/step3/${productId}`}>
                <div className="pt-5 pb-5 px-4 flex">
                  <img src={newbanner} alt="hello" />
                  <div className="pl-10 pt-20">
                    <p className="text-xl font-semibold">
                      I'm a new customer{" "}
                      <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                    </p>
                    <h3 className="text-sm">
                      Join AGL and enjoy exlusive offers as a new customer
                    </h3>
                  </div>
                </div>
              </Link>
            </div>

            <div className="bg-white shadow rounded overflow-hidden group">
              <Link to={`/k/step3`}>
                <div className="pt-5 pb-5 px-4 flex">
                  <img src={existingbanner} alt="hello" />
                  <div className="pl-10 pt-20">
                    <p className="text-xl font-semibold">
                      I'm an existing customer{" "}
                      <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                    </p>
                    <h3 className="text-sm">
                      Save time logging in with your email
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* ./products */}
      </div>
    </div>
  );
}

export default KaluzaCategoryStep2;
