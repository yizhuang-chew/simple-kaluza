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
import { faBagShopping, faHeart, faHouse, faUser, faSearch, faBars, faGripVertical, faList, faChevronRight, faArrowRight} from '@fortawesome/free-solid-svg-icons'


library.add(faHouse, faUser, faBagShopping, faHeart, faSearch, faBars, faArrowRight)


function KaluzaCategoryStep2() {
  let [product, setProduct] = useState(null);
  let { productId } = useParams();


  useEffect((productId) => {
    getProducts(productId);
  }, []);
  
  const getProducts = async (productId) => {

    if(product || !productId) {
      return;
    }
  };

  return (
    <div className="App">
        <Header />


        <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
         
          <div className="col-span-3">
            
            <div className="grid md:grid-cols-1 grid-cols-2 gap-6">
              <div className="bg-white shadow rounded overflow-hidden group">
                <Link to={`/k/step3/${productId}`}>
                  <div className="pt-4 pb-3 px-4 ">
                    <div className="">
                      <p className="text-xl font-semibold text-center">I'm a new customer <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></p> 
                      <h3 className="text-sm text-center">Join AGL and enjoy exlusive offers as a new customer</h3>
                    </div>
                  </div>
                </Link>
              </div>
              
              <div className="bg-white shadow rounded overflow-hidden group">
                <Link to={`/k/step3`}>
                  <div className="pt-4 pb-3 px-4 ">
                    <div className="">
                      <p className="text-xl font-semibold text-center">I'm an existing customer <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></p>
                      <h3 className="text-sm text-center">Save time logging in with your email</h3>
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
