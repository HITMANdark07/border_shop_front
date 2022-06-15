import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillStar,AiOutlineArrowRight } from "react-icons/ai";
import { BsFillHandbagFill,BsTruck } from 'react-icons/bs';
import { getProduct } from "../store/actions/product.action";
import useWindowDimensions from '../hooks/useWindowDimensions';
import { selectSize } from "../store/slices/product.slice";
import { useState } from "react";
import { createCart, updateCart } from "../store/actions/cart.action";

const ProductPage = () => {
  const { product_slug } = useParams();
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { product, loading } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProduct(product_slug));
  }, [dispatch, product_slug]);

  const addToBag = () => {
    if(product?.selected_size){
      if(cart){
        let total = cart?.total_price+ (product?.price - ((product?.discount / 100) * product?.price));
        let products = [...cart?.products];
        products.push(product);
        dispatch(updateCart({cart_id:cart.cart_id,email_id:user?.email_id,products:products,total:total}));
      }else{
        let priceOfProduct = product?.price - (product?.discount / 100) * product?.price;
        dispatch(createCart({
          email_id:user?.email_id,
          products:[product],
          total:priceOfProduct
        }))
      }
    }else{
      setError(true);
    }
  }
  const compateObj = (obj1, obj2) => {
    return JSON.stringify(obj1)===JSON.stringify(obj2);
  }
  const isAddedToCart = () => {
    let x = cart?.products?.find((prod) => prod?.product_slug === product?.product_slug);
    if (x) return true;
    else return false;
  }
  useEffect(() => {
    window.scrollTo({top:0,behavior:'smooth'})
  },[]);

  return (
    <Layout>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="w-full flex flex-col md:flex-row justify-between p-2 md:p-6">
          <div className="md:w-4/6 w-full relative flex flex-row flex-wrap p-4">
            {product?.images?.map((image, i) => (
              <img
                src={image}
                key={i}
                className="m-2"
                style={{ width: width<400 ? '90%':'45%' }}
                alt={product?.name + "-" + i}
              />
            ))}
          </div>
          <div className="md:w-2/6 relative flex flex-col p-4">
            <div className="font-bold text-xl">{product?.name}</div>
            <div className="p-1 px-2 rounded bg-opacity-70 w-1/2 border border-gray-300 flex flex-row  items-center">
              <div className="font-semibold">{product?.rating}</div>
              <AiFillStar className="ml-2" color="green" />
              <div className="font-semibold mx-2">|</div>
              <div className="font-light mx-2">{product?.discount}% OFF</div>
            </div>
            <hr className="my-4" />
            <div className="flex flex-row items-center">
              <div className="font-semibold text-xl">
                Rs. {product?.price - (product?.discount / 100) * product?.price}
              </div>
              <div className="text-xl font-light line-through text-gray-700 mx-4">
                Rs. {product?.price}
              </div>
              <div className="text-xl font-semibold text-orange-400">
                ({product?.discount}% OFF)
              </div>
            </div>
            <div className="text-green-600 font-semibold my-2">
              inclusive of all taxes
            </div>
            <div className="font-semibold mt-4">SELECT SIZE</div>
            <div className={`font-light text-red-500 ${error ? '':'hidden'}`}>Please select a size</div>
            <div className="flex flex-row flex-wrap items-center -ml-2">
            {
                product?.sizes?.map((size) => (
                    <div className={`${compateObj(product?.selected_size,size) ? 'border-red-500': ''} border cursor-pointer m-2 border-gray-400 p-2 px-4 rounded-full ${size.available>0 ? 'hover:border-red-500':'bg-gray-200 text-gray-400'}`} key={size.symbol} onClick={() => {
                      if(size.available>0){
                        dispatch(selectSize(size));
                        setError(false);
                      }
                    }}>
                        <div className={`${compateObj(product?.selected_size,size) ? 'text-red-500': ''} font-semibold ${size.available>0 ? 'hover:text-red-500':''}`}>{size.symbol}</div>
                    </div>
                ))
            }
            </div>
            <div className="flex flex-row item-center mt-4">
                {
                  isAddedToCart() ?
                  <button className="flex flex-row items-center bg-red-500 p-2 rounded px-8 hover:bg-red-400">
                     <div className="font-semibold text-xl text-white" onClick={() => navigate("/cart")}>GO TO BAG</div>
                    <AiOutlineArrowRight color="#FFFFFF" className="ml-4" size={25} />
                  </button>
                  :
                  <button className="flex flex-row items-center bg-red-500 p-2 rounded px-8 hover:bg-red-400" onClick={addToBag}>
                    <BsFillHandbagFill color="#FFFFFF" size={30} />
                     <div className="font-semibold text-xl ml-4 text-white">ADD TO BAG</div>
                  </button>
                }
            </div>
            <div className="flex flex-row items-center mt-2">
                <div className="font-semibold">DELIVERY OPTIONS</div>
                <BsTruck size={25} className='ml-4' color="gray" />
            </div>
            <div className="flex flex-row items-center justify-between border border-gray-400 md:w-3/4 rounded p-2 px-4 mt-2">
                <input className="outline-none border-transparent" type="text" placeholder="Enter pincode" />
                <button className="text-red-600">Check</button>
            </div>
            <p className="text-xs">Please enter PIN code to check delivery time & Pay on Delivery Availability</p>
            <div className="flex flex-col mt-4">
                <div className="font-light">100% Original Products</div>
                <div className="font-light">Pay on delivery might be available</div>
                <div className="font-light">Easy 30 days returns and exchanges</div>
                <div className="font-light">Try & Buy might be available</div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductPage;
