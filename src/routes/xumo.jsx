import logo from '../assets/images/logo.svg';
import '../App.css';
import '../Main.css';
import Header from '../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBagShopping, faHeart, faHouse, faUser, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import config from '../config'
import { useEffect, useState, useContext, version } from 'react';
import { useParams } from 'react-router-dom';
import { apiRoot } from '../commercetools';
import { setQueryArgs } from '../util/searchUtil';
import { getCart, addToCart, updateCart } from '../util/cart-util';

library.add(faHouse, faUser, faBagShopping, faHeart, faSearch, faBars)

const Xumo = () => {
  let { productId } = useParams();
  let [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct(productId);
  });

  const fetchProduct = async (productId) => {
    
    if(product || !productId) {
      return;
    }
    
    const queryArgs = setQueryArgs();

    let res =  await apiRoot
      .productProjections()
      .withId({ ID: productId })
      .get({ queryArgs: queryArgs })
      .execute();

    console.log("blah", res.body)

    if(res && res.body) {
      setProduct({
        main: res.body,
        includedFree: await fetchAddons(res.body.masterVariant.attributes, "includedFree"),
        includedChoices: await fetchAddons(res.body.masterVariant.attributes, "includedChoices"),
        includeFree: await fetchFree(res.body.masterVariant.attributes, "automaticallyIncludeFree"),
      });
      
    }
  };

  const fetchFree = async (attributes, attrKey) => {

    let isFree = false;

    // add the add ons
    for (const [key, value] of Object.entries(attributes)) {
      if (value.name === attrKey) {
        isFree = value.value;
        break;
      }
    }

    return isFree;
  }

  const fetchAPIProduct = async (prodId) => {
    let res1 =  await apiRoot
                .products()
                .withId({ ID: prodId })
                .get()
                .execute()

    return res1.body.masterData.current;
  }

  const fetchAddons = async (attributes, attrKey) => {

    let includedAddOns = [];

    // add the add ons
    for (const [key, value] of Object.entries(attributes)) {
        
        if (value.name === attrKey) {

            for (const [key, newValue] of Object.entries(value.value)) {
                let subProduct =  await fetchAPIProduct(newValue.id);
                includedAddOns.push(subProduct);
            }
        }
    }

    return includedAddOns;
  }

  if(!product) {
    return null
  }

  let includedFree = []

  product.includedFree.forEach( function (row) {
    const variants = [];
    variants.push(row.masterVariant)

    row.variants.forEach( function (newRow) {
      variants.push(newRow)
    })
    includedFree.push({name: row.name["en-US"], variants: variants} )
  })

  let includedChoices = []

  product.includedChoices.forEach( function (row) { 
    const variants = [];
    variants.push(row.masterVariant)

    row.variants.forEach( function (newRow) {
      variants.push(newRow)
    })
    includedChoices.push({name: row.name["en-US"], variants: variants} )
  })


  return (
    <div className="App">
        <Header />

        {/* product-detail */}
        <div className="container grid grid-cols-2 gap-6">
          <div>
            <img
              src={product.main.masterVariant.images[0].url}
              alt="product"
              className="w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-medium uppercase mb-2">
              {product.main.name[config.locale]}
            </h2>

            <p>Place the description here</p>

            

            <div className="pt-4">
                
                <div className="flex items-center gap-2"></div>

                <DynamicForm
                  includedFree={includedFree}
                  includedChoices={includedChoices}
                  product={product}
                />
            </div>
            <div className="flex gap-3 mt-4">
              
              
            </div>
          </div>
        </div>
        {/* ./product-detail */}
        {/* description */}
        <div className="container pb-16">
          <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
            Product details
          </h3>
          <div className="w-3/5 pt-6">
            <div className="text-gray-600">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                necessitatibus deleniti natus dolore cum maiores suscipit optio itaque
                voluptatibus veritatis tempora iste facilis non aut sapiente dolor
                quisquam, ex ab.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, quae
                accusantium voluptatem blanditiis sapiente voluptatum. Autem ab,
                dolorum assumenda earum veniam eius illo fugiat possimus illum dolor
                totam, ducimus excepturi.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quia
                modi ut expedita! Iure molestiae labore cumque nobis quasi fuga,
                quibusdam rem? Temporibus consectetur corrupti rerum veritatis numquam
                labore amet.
              </p>
            </div>
          </div>
        </div>
    </div>
    
  );
};


const DynamicForm = ({ includedFree, includedChoices, product }) => {
  const [inputValue, setInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(product)
  };

  const handleQuantityChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleCheckboxChange1 = (e) => {
    setIsChecked1(e.target.checked);
  };

  return (
    <form onSubmit={handleSubmit}>
      {product.includeFree && (
      <div className="pt-4">
        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        Quantity
        </h3>
        <div className="flex items-center gap-2"></div>
        <select value={selectValue} onChange={handleSelectChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
      </div>
      )}

      {product.includeFree && (
        <h1>Free for 12 mos (First one included)</h1>
      )}

      {product.includeFree && includedChoices.map((row, index) => (
        <div className="pt-4" key={index}>
          <div className="flex items-center gap-2"></div>
        <label>
          {row.variants[0].sku}
          
          <input
            type="radio"
            value={row.name}
            checked={radioValue === row.name}
            onChange={handleRadioChange}
          />
        </label>
            
        </div>
      ))}

      {!product.includeFree && includedFree.map((row, index) => (
        
        <div className="pt-4" key={index}>
          <div className="flex items-center gap-2"></div>
          <label>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            {row.variants[0].sku}
          </label>
          <p>Get a FREE Xumo Stream Box for 12 months</p>
        <p><a href="">Xumo Important Details</a></p>
        </div>
      ))}

      {!product.includeFree && (
        <div className="pt-4">
        <div className="flex items-center gap-2"></div>
        <label>
          <input
              type="checkbox"
              checked={isChecked1}
              onChange={handleCheckboxChange1}
            />
          Xumo Stream Box
        </label>
        <p>Stream live, Watch On Demand and enjoy popular apps for all entertainment needs in one place.</p>
        <p>Starting at $5.00/mo</p>
        <div className="pt-4">
        <div className="flex items-center gap-2"></div>
        <select value={selectValue} onChange={handleSelectChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
      </div>
      
        </div>

      )}

      <div>
      {!product.includeFree && (
        <h3>Xumo Stream Box Payment Terms</h3>
      )}
      {!product.includeFree && includedChoices.map((row, index) => (
        
        <div className="pt-4" key={index}>
          
          
          <div className="flex items-center gap-2"></div>
        <label>
          {row.variants[0].sku}
          
          <input
            type="radio"
            value={row.name}
            checked={radioValue === row.name}
            onChange={handleRadioChange}
          />
        </label>
        </div>
      ))}

      </div>

      


        <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
          <button
            href="#"
            className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
            type="submit"
          >
            <FontAwesomeIcon icon="fas fa-shopping-bag" /> Add to cart
          </button>
          
        </div>
    </form>
  );
}



export default Xumo;
