import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../store/actions/cart.action';

const CartCard = ({product}) => {

    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const removeFromCart = (product) => {
        let total = cart?.total_price- (product?.price - ((product?.discount / 100) * product?.price));
        let products = [...cart?.products];
        products = products.filter((prod) => prod.product_slug!==product.product_slug);
        // console.log(total,product);
        dispatch(updateCart({cart_id:cart.cart_id,email_id:user?.email_id,products:products,total:total}))
    }

    return (
        <div className="flex flex-row relative items-center p-2 w-full border rounded border-gray-400 m-2">
            <img src={product?.images[0]} alt="sor" className="h-40" />
            <div className="flex flex-col px-2 h-40 mr-2">
              <div className="font-semibold">{product?.name}</div>
              <div className="flex flex-row justify-start">
                <div className="bg-gray-200 font-semibold p-1 rounded  text-xs">Size: {product?.selected_size?.symbol}</div>
                <div className="bg-gray-200 ml-4 font-semibold p-1 rounded  text-xs">Qty: 1</div>
              </div>
              <div className='flex flex-row items-center '>
                    <div className='font-semibold'>₹ {product.price - (product.discount/100)*product.price}</div>
                    <div className='text-xs line-through text-gray-700 mx-2'>₹ {product.price}</div>
                    <div className='text-sm text-orange-400'>({product?.discount}% OFF)</div>
              </div>
            </div>
            <AiOutlineClose size={25} className="absolute cursor-pointer right-2 top-3" onClick={() => removeFromCart(product)} />
          </div>
    )
}

export default CartCard;