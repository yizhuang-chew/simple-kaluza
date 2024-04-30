import logo from '../assets/images/logo.svg';
import '../App.css';
import '../Main.css';
import Header from '../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import config from '../config'
import { useEffect, useState, useContext, version } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiRoot } from '../commercetools';
import { setQueryArgs } from '../util/searchUtil';
import { faBagShopping, faHeart, faHouse, faUser, faSearch, faBars, faGripVertical, faList, faChevronRight} from '@fortawesome/free-solid-svg-icons'


library.add(faHouse, faUser, faBagShopping, faHeart, faSearch, faBars)


function KaluzaStep1() {
  let [products, setProducts] = useState(null);


  useEffect(() => {
    getProducts();
  }, []);

  
  
  const getProducts = async () => {

    if(products) {
      return;
    }

    let kProducts = [
      {
        name: "AGL Value Saver",
        nameDescription: "Low Variable Rates",
        electricity: {
          percentage: "18%",
          price: "1,827",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        gas: {
          percentage: "12",
          price: "808",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      },
      {
        name: "AGL Netflix Plan",
        nameDescription: "Great value electricity plan including Netflix",
        electricity: {
          percentage: "17%",
          price: "1,849",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        gas: {
          percentage: "12",
          price: "808",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      },
      {
        name: "AGL Solar Savers",
        nameDescription: "Up to 10c/kWhsolar Fit",
        electricity: {
          percentage: "06%",
          price: "2,094",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        gas: {
          percentage: "12",
          price: "808",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      }
    ];

    setProducts(kProducts);
  };


  if(!products) {
    return null
  }

  return (
    <div className="App">
        <Header />

        

        <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
          
        
          {/* products */}
          <div className="col-span-3">
            <div className="flex items-center mb-4">
              <h2>Choose A Plan</h2>
            </div>
            <div className="grid md:grid-cols-1 grid-cols-3 gap-1">
            {products.map((row, index) => (
              <div key={index} className="bg-white shadow rounded overflow-hidden group">
                <Link to={`/k/step2`}>
                  <div className="pt-4 pb-3 px-4 ">
                    <div className="">
                      <p className="text-xl font-semibold text-center">{row.name}</p>
                      <h3 className="text-sm text-center">{row.nameDescription}</h3>
                    </div>
                    <div style={{ marginTop: "50px" }} className="pt-5 border-t-2 border-zinc-100">
                      <p className="text-sm font-semibold">Electricity</p>
                      <div className="flex items-baseline mb-1 space-x-2">
                        <div style={{ marginRight: "50px" }}>
                          <p className="text-blue-800 text-3xl font-semibold">{row.electricity.percentage}</p>
                          <span className="text-zinc-500 text-[10px]">Less than the reference price</span>
                        </div>
                        <div>
                          <p className="text-3xl font-semibold">${row.electricity.price} <span className="text-xs">/year</span></p>
                          <span className="text-zinc-500 text-[10px]">including GST for a residential cUstomer Using 4913 kWn per annum on a single rate tarift in the endeavour energy network for 3152 monthly</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: "10px" }} className="">
                      <p className="text-sm font-semibold">Gas</p>
                      <div className="flex items-baseline mb-1 space-x-2">
                        <div>
                        <p className="text-blue-800 text-3xl font-semibold">{row.gas.percentage}</p>
                        <span className="text-zinc-500 text-xs">month energy plan period</span>
                        </div>
                        <div>
                        <p className="text-3xl font-semibold">${row.gas.price} <span className="text-xs">/year</span></p>
                        <span className="text-zinc-500 text-xs">Heres more right text text</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: "100px" }} className="">
                      <p className="text-xs underline text-blue-800 text-center">Basic Plan Information</p>
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

        
        <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
          <div className="container grid grid-cols-1 ">
            <div className="col-span-1 space-y-4">
              <img src="assets/images/logo.svg" alt="logo" className="w-30" />
              <div className="mr-2">
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, hic?
                </p>
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
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Solutions
                  </h3>
                  <div className="mt-4 space-y-4">
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 block"
                    >
                      Marketing
                    </a>
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 block"
                    >
                      Analitycs
                    </a>
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 block"
                    >
                      Commerce
                    </a>
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 block"
                    >
                      Insights
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Support
                  </h3>
                  <div className="mt-4 space-y-4">
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 block"
                    >
                      Pricing
                    </a>
                    {/* <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Documentation</a> */}
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 block"
                    >
                      Guides
                    </a>
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 block"
                    >
                      API Status
                    </a>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Solutions
                  </h3>
                  <div className="mt-4 space-y-4">
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 block"
                    >
                      Marketing
                    </a>
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 block"
                    >
                      Analitycs
                    </a>
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 block"
                    >
                      Commerce
                    </a>
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 block"
                    >
                      Insights
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Support
                  </h3>
                  <div className="mt-4 space-y-4">
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 block"
                    >
                      Pricing
                    </a>
                    {/* <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Documentation</a> */}
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 block"
                    >
                      Guides
                    </a>
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 block"
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
