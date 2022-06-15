import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { RiCoupon2Fill } from 'react-icons/ri';
import {AiOutlineSend} from 'react-icons/ai';
import CartCard from "../components/CartCard";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <Layout>
        <div className="font-bold text-gray-700 text-center text-2xl">Summery Page</div>
        {
        cart?.products?.length ?  
        <div className="flex justify-center">
        <div className="flex flex-col w-full md:flex-row md:w-3/5 self-center py-4">
        <div className="flex flex-col w-full md:w-4/6">
          {cart?.products?.map((prod) => (
            <CartCard product={prod} key={prod?.product_slug} />
          ))}
        </div>
        <div className="flex flex-col p-4 m-2 md:ml-4 mt-2 w-full md:w-2/6 border  rounded border-gray-400">
        <div className="flex flex-row items-center">
                <div className="flex flex-row justify-between ">
                    <RiCoupon2Fill size={30} />
                    <div className="font-semibold ml-2">Apply Coupons</div>
                </div>
                <div className="border border-red-500 text-red-500  px-4 rounded ml-4 hover:bg-red-500 hover:text-white cursor-pointer">Apply</div>
        </div>
        <hr className="my-2" />
        <div className="text-gray-700 font-semibold">Price Details ({cart?.products?.length} Items)</div>
        <div className="flex flex-row justify-between items-center my-2">
            <div className="text-gray-700 ">Total MRP</div>
            <div className="text-gray-700 ">₹{cart?.products?.reduce((acc,emm) => acc+emm.price ,0)}</div>
        </div>
        <div className="flex flex-row justify-between items-center my-2">
            <div className="text-gray-700 ">Discount on MRP</div>
            <div className="text-green-700 ">-₹{(cart?.products?.reduce((acc,emm) => acc+emm.price ,0)-cart?.total_price)?.toFixed(2)}</div>
        </div>
        <div className="flex flex-row justify-between items-center my-2">
            <div className="text-gray-700 ">Coupon Discount</div>
            <div className="text-red-500 rounded hover:bg-red-500 hover:text-white px-2 cursor-pointer ">Apply Coupon</div>
        </div>
        <div className="flex flex-row justify-between items-center my-2">
            <div className="text-gray-700 ">Convenience Fee</div>
            <div className="text-green-700 ">FREE</div>
        </div>
        <hr className="my-2" />
        <div className="flex flex-row justify-between items-center my-2">
            <div className="text-gray-700 font-semibold ">Total Amount</div>
            <div className="text-green-700 font-semibold">₹{cart?.total_price?.toFixed(2)}</div>
        </div>
        <button className="flex flex-row items-center bg-red-500 p-2 rounded px-8 hover:bg-red-400">
                    <AiOutlineSend className="mr-2" color="#FFFFFF" size={25} />
                     <div className="font-semibold text-lg ml-4 text-white">PLACE ORDER</div>
        </button>
        </div>
        </div>
        </div>
        :
        <div className="flex flex-col justify-center">
            <div className="text-center mt-2 font-semibold text-lg">Your Cart is Empty</div>
            <div className="text-orange-600 self-center px-4 mt-2 border-2 text-center border-orange-600 rounded p-2 hover:bg-orange-600 hover:text-white cursor-pointer" onClick={() => navigate("/")}>
                Explore Products
            </div>
        </div>
        }
    </Layout>
  );
};

export default Cart;
