import logo from '../assets/images/logo.svg';
import '../App.css';
import '../Main.css';
import Header from '../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { useEffect, useState, useContext, version } from 'react';
import { getCart, addToCart, updateCart } from '../util/cart-util';
import { faBagShopping, faHeart, faHouse, faUser, faSearch, faBars, faClock } from '@fortawesome/free-solid-svg-icons'
library.add(faHouse, faUser, faBagShopping, faHeart, faSearch, faBars, faClock)

function KaluzaCart() {
    let [cart, setCart] = useState(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        let cart = await getCart();

        console.log(cart);

        setCart(cart);
    }

    if(!cart) {
        return null
      }


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
                    <div className="flex justify-between border-t border-gray-200 p-10">
                        <div>
                            <h3 className="text-gray-800 font-medium">Gas AGL Value Saver</h3>
                            <p className="text-sm text-gray-600">$854.00 incl GST estimated annual cost</p>
                            <p className="text-sm text-blue-600">Remove</p>
                        </div>

                        <div>
                            <p className="text-gray-800 font-medium">Based on Usage</p>
                        </div>
                    </div>
                    <div className="flex justify-between p-10">
                        <div>
                            <h3 className="text-gray-800 font-medium">Carbon Neutral - Gas</h3>
                        </div>

                        <div>
                            <p className="text-gray-800 font-medium">Weekly</p>
                        </div>
                        <div>
                            <p className="text-gray-800 font-medium">$.50</p>
                        </div>
                    </div>

                    <div className="flex justify-between border-t border-gray-200 p-10">
                        <div>
                            <h3 className="text-gray-800 font-medium">Electricity AGL Value</h3>
                            <p className="text-sm text-gray-600">12% less than Reference Price $1,960.00 incl GST annual estimated cost for a household using 4913 kWh on a single rate tariff in the Endeavour Energy network.</p>
                            <p className="text-sm text-blue-600">Remove</p>
                        </div>

                        <div>
                            <p className="text-gray-800 font-medium">Based on Usage</p>
                        </div>
                    </div>
                    <div className="flex justify-between p-10">
                        <div>
                            <h3 className="text-gray-800 font-medium">Carbon Neutral - Electricity</h3>
                        </div>

                        <div>
                            <p className="text-gray-800 font-medium">Weekly</p>
                        </div>
                        <div>
                            <p className="text-gray-800 font-medium">$1.00</p>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
            
            
        </div>

        <div className="col-span-3 border border-gray-200 p-4 rounded">
            <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
            Checkout now to join agl
            </h4>
            <div className="space-y-2">
            <div className="flex justify-between">
                <p className="text-gray-800 font-medium"><FontAwesomeIcon icon="fa-solid fa-clock" /></p>
                <h5 className="text-gray-800 font-medium">Signing up now takes minutes</h5>
            </div>
            <div className="flex justify-between">
                <p className="text-gray-800 font-medium"><FontAwesomeIcon icon="fa-solid fa-user" /></p>
                <h5 className="text-gray-800 font-medium">You'll need a driver's license.</h5>
            </div>
            <div>
                <input type="text" name="search" id="search"
                    className="w-full border border-primary"
                    style={{ border: '1px solid black' }}
                    placeholder="Email Address" />
            </div>
            </div>
            
            <div className="flex items-center mb-4 mt-2">
            
            
            </div>

            <Link to={`/kcheckout`} className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">
                Check Out Now
            </Link>
        </div>
        </div>
    </div>
  );
}

export default KaluzaCart;
