import logo from '../assets/images/logo.svg';
import '../App.css';
import '../Main.css';
import Header from '../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import config from '../config'
import { useEffect, useState, useContext, version } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiRoot } from '../commercetools';
import { setQueryArgs } from '../util/searchUtil';
import { getCart, addToCart, updateCart } from '../util/cart-util';
import { faBagShopping, faHeart, faHouse, faUser, faSearch, faBars, faGripVertical, faList, faChevronRight, faArrowRight} from '@fortawesome/free-solid-svg-icons'


library.add(faHouse, faUser, faBagShopping, faHeart, faSearch, faBars, faArrowRight)


  


function KaluzaCategoryStep3() {
  
  let { productId } = useParams();
  let [cart, setCart] = useState(null);
  let [product, setProduct] = useState(null);
  let [isCheckedElectricity, setIsCheckedElectricity] = useState(false);
  let [isCheckedGas, setIsCheckedGas] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    getProducts(productId);
  }, []);
  
  const getProducts = async (productId) => {

    if(product || !productId) {
      return;
    }

    const queryArgs = setQueryArgs();

    /* Last, but not least, add a couple of reference expansions to include channel and customer group data */
    queryArgs.expand = [
      'masterVariant.prices[*].channel',
      'masterVariant.prices[*].customerGroup',
      'masterVariant.prices[*].discounted.discount',
      'masterVariant.price.discounted.discount',
      'variants[*].prices[*].channel',
      'variants[*].prices[*].customerGroup',
      'variants[*].prices[*].discounted.discount',
      'variants[*].price.discounted.discount',
    ];

    let res =  await apiRoot
      .products()
      .withId({ ID: productId })
      .get({ queryArgs: queryArgs })
      .execute();

    if(res && res.body) {
      let mainProduct = res.body.masterData.current;

      let mainElectricity = await fetchAddons(mainProduct.masterVariant.attributes, "Electricity");
      let mainGas = await fetchAddons(mainProduct.masterVariant.attributes, "Gas");
      let electricityAddon = await fetchAddons(mainElectricity.masterData.current.masterVariant.attributes, "CarbonNeutralAddOn");
      let gasAddon = await fetchAddons(mainGas.masterData.current.masterVariant.attributes, "CarbonNeutralAddOn");

      setProduct({
        main: res.body,
        mainElectricity: mainElectricity,
        mainGas: mainGas,
        electricityAddon: electricityAddon,
        gasAddon: gasAddon
      });
    }
  };

  const fetchAPIProduct = async (prodId) => {
    let res1 =  await apiRoot
                .products()
                .withId({ ID: prodId })
                .get()
                .execute()

    return res1.body;
  }

  const fetchAddons = async (attributes, attrKey) => {

    let subProduct = {};

    // add the add ons
    for (const [key, value] of Object.entries(attributes)) {
        
        if (value.name === attrKey) {
          subProduct =  await fetchAPIProduct(value.value.id);
        }
    }

    return subProduct;
  }

  const handleCheckboxElecrityChange = () => {
    setIsCheckedElectricity(!isCheckedElectricity);
  };

  const handleCheckboxGasChange = () => {
    setIsCheckedGas(!isCheckedGas);
  };

  const deleteCart = async() => {
    let cart = await getCart();
    sessionStorage.removeItem('cartId');
    setCart(null);    
    if(cart) {
      await apiRoot
        .carts()
        .withId({ ID: cart.id})
        .delete({
          queryArgs: {
            version: cart.version
          }
        })
        .execute();
    }
  }

  const addItems = async() => {
    await deleteCart();

    let customElectricity = {}
    let customGas = {}

    console.log("product", product)


    if (isCheckedElectricity) {
      customElectricity = {
        "type": {
          "typeId": "type",
          'key': "addOnElectricity"
        },
        "fields": {
          "product": product.electricityAddon.id
        }
      }
    }

    const result1 = await addToCart(product.mainElectricity.id, product.mainElectricity.masterData.current.masterVariant.id, customElectricity, 1);

    if (isCheckedGas) {
      customGas = {
        "type": {
          "typeId": "type",
          'key': "addOnGas"
        },
        "fields": {
          "product": product.gasAddon.id
        }
      }
    }

    const result2 = await addToCart(product.mainGas.id, product.mainGas.masterData.current.masterVariant.id, customGas, 1);

    navigate("/kcart")

  };

  return (
    <div className="App">
        <Header />


        <div className="container grid">
          <div className="grid grid-cols-1">
            <div className="columns-1">
              <h2 className="text-3xl font-medium uppercase mt-10 mb-10">
                Add Carbon Neutral
              </h2>
              <p styles={{display: "block"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
         
          <div className="col-span-3">
            <div className="grid md:grid-cols-1 grid-cols-1 gap-6">
                <div style={{ marginTop: "20px" }} className="bg-white shadow rounded overflow-hidden group">
                  <div className="flex items-baseline mb-1 space-x-2 p-10">
                    <div className="mr-20">
                      <p className="">Add Carbon Neutral Electricity</p>
                    </div>
                    <div>
                      <p className="">$1.00</p>
                      <span className="">Gst Included</span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        className="mr-2 leading-tight"
                        checked={isCheckedElectricity}
                        onChange={handleCheckboxElecrityChange}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "20px" }} className="bg-white shadow rounded overflow-hidden group">
                  <div className="flex items-baseline mb-1 space-x-2  p-10">
                    <div className="mr-20">
                      <p className="">Add Carbon Neutral Gas</p>
                    </div>
                    <div>
                      <p className="">$.50</p>
                      <span className="">Gst Included</span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        className="mr-2 leading-tight"
                        checked={isCheckedGas}
                        onChange={handleCheckboxGasChange}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "20px" }} className="">
                    <div style={{ marginTop: "10px" }}>
                    <button
                        className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                    onClick={() => addItems()}>Continue</button>
                      
                    </div>
                  </div>
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

export default KaluzaCategoryStep3;
