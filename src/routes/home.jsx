import logo from '../assets/images/logo.svg';
import banner from '../assets/images/main.png';
import '../App.css';
import '../Main.css';
import Header from '../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBagShopping, faHeart, faStar, faHouse, faUser, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
library.add(faHouse, faUser, faBagShopping, faHeart, faSearch, faBars, faStar)


function Home() {
  return (
    <div className="App">
        <Header />
        
        <div
            className="bg-cover bg-no-repeat bg-center py-36"
            style={{ marginTop: '-1em', color: 'white', backgroundImage: 'url("assets/images/main.png")' }}
            >
            <div className="container">
                <h1 className="text-4xl text-primary font-medium mb-4 capitalize">
                $200 sign-up credit when you join AGL electricity
                </h1>
                <p className="text-black">
                Plus, get Netflix included for the life of your plan with the AGL Netflix Plan.
                </p>
                <div className="mt-12">
                <Link to={`/k/step1`}
                        href="/c/aeeb3d68-a221-4217-b2a0-821a12abfd8c"
                        className="bg-primary border border-primary text-white px-8 py-3 font-medium 
                            rounded-md hover:bg-transparent hover:text-primary"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
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

export default Home;


<img src={logo} className="App-logo" alt="logo" />
