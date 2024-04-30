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

function KaluzaCheckout() {
    let [cart, setCart] = useState(null);
    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [selectedOption3, setSelectedOption3] = useState('');

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        let cart = await getCart();

        console.log(cart);

        setCart(cart);
    }

    const handleOption1Change = (e) => {
      setSelectedOption1(e.target.value);
    };

    const handleOption2Change = (e) => {
      setSelectedOption2(e.target.value);
    };

    const handleOption3Change = (e) => {
      setSelectedOption3(e.target.value);
    };

    if(!cart) {
        return null
      }


    return (
      <div className="App">
        <Header />

        <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
        
        <div className="col-span-9 border border-gray-200 p-4 rounded">
            
            <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase pl-10">
            Billing Details
            </h4>
            <div className="space-y-2">
                <div className="">
                  <div className="pb-10">
                    <div className="flex justify-between border-t border-gray-200 pl-10 pt-10">
                        <div>
                            <h3 className="text-gray-800 font-medium">How Often Should we send your electricity bill?</h3>
                        </div>
                    </div>
                    <div className="flex justify-between pl-10">
                      <div>
                          <input
                            type="radio"
                            className="form-radio text-indigo-600"
                            value="option1"
                            checked={selectedOption1 === 'option1'}
                            onChange={handleOption1Change}
                          />
                          <span className="text-gray-800 font-medium ml-2">Monthly</span>
                      </div>
                    </div>
                    <div className="flex justify-between pl-10">
                      <div>
                          <input
                            type="radio"
                            className="form-radio text-indigo-600"
                            value="option2"
                            checked={selectedOption1 === 'option2'}
                            onChange={handleOption1Change}
                          />
                          <span className="text-gray-800 font-medium ml-2">Quartly</span>
                      </div>
                    </div>
                  </div>
                  <div className="pb-10">
                    <div className="flex justify-between border-t border-gray-200 pl-10 pt-10">
                        <div>
                            <h3 className="text-gray-800 font-medium">How Often Should we send your gas bill?</h3>
                        </div>
                    </div>
                    <div className="flex justify-between pl-10">
                      <div>
                          <input
                            type="radio"
                            className="form-radio text-indigo-600"
                            value="option1"
                            checked={selectedOption2 === 'option1'}
                            onChange={handleOption2Change}
                          />
                          <span className="text-gray-800 font-medium ml-2">Monthly</span>
                      </div>
                    </div>
                    <div className="flex justify-between pl-10">
                      <div>
                          <input
                            type="radio"
                            className="form-radio text-indigo-600"
                            value="option2"
                            checked={selectedOption2 === 'option2'}
                            onChange={handleOption2Change}
                          />
                          <span className="text-gray-800 font-medium ml-2">Quartly</span>
                      </div>
                    </div>
                  </div>

                  <div className="pb-10">
                    <div className="flex justify-between border-t border-gray-200 pl-10 pt-10">
                        <div>
                            <h3 className="text-gray-800 font-medium">Do you want to setup direct debit for your energy bill?</h3>
                        </div>
                    </div>
                    <div className="flex justify-between pl-10">
                      <div>
                          <input
                            type="radio"
                            className="form-radio text-indigo-600"
                            value="option1"
                            checked={selectedOption3 === 'option1'}
                            onChange={handleOption3Change}
                          />
                          <span className="text-gray-800 font-medium ml-2">Credit Card</span>
                      </div>
                    </div>
                    <div className="flex justify-between pl-10">
                      <div>
                          <input
                            type="radio"
                            className="form-radio text-indigo-600"
                            value="option2"
                            checked={selectedOption3 === 'option2'}
                            onChange={handleOption3Change}
                          />
                          <span className="text-gray-800 font-medium ml-2">Bank Account</span>
                      </div>
                    </div>
                    <div className="flex justify-between pl-10">
                      <div>
                          <input
                            type="radio"
                            className="form-radio text-indigo-600"
                            value="option3"
                            checked={selectedOption3 === 'option3'}
                            onChange={handleOption3Change}
                          />
                          <span className="text-gray-800 font-medium ml-2">Don't Setup Direct Debit</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to={`/checkout`} className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">
                Check Out Now
            </Link>
            </div>
            
            
            
            
            
        </div>

        <div className="col-span-3 border border-gray-200 p-4 rounded">
            <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
            Order Summary
            </h4>
            <div className="space-y-2">
            <div className="flex justify-between">
                <p className="text-gray-800 font-medium">Energy</p>
                <h5 className="text-gray-800 font-medium">348 Foothill Dr, Fillmore, CA 93015</h5>
            </div>
            <div className="flex justify-between">
                <p className="text-gray-800 font-medium">Electricity AGL Value Saver</p>
                <h5 className="text-gray-800 font-medium">Carbon Neutral - Electricity</h5>
            </div>
            <div className="flex justify-between">
                <p className="text-gray-800 font-medium">Gas AGL Value Saver</p>
                <h5 className="text-gray-800 font-medium">Carbon Neutral - Gas</h5>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default KaluzaCheckout;
