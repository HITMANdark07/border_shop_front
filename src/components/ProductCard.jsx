import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({product}) => {

    const navigate = useNavigate();
    return(
        <div className='hover:shadow-md cursor-pointer relative rounded m-4' style={{width:220,height:360}} onClick={() => {
            navigate(`/product/${product.product_slug}`)
        }}>
            <img src={product.images[0]} alt="demo"  />
            <div className='absolute left-2 p-1 px-2 rounded bg-opacity-70 flex flex-row bg-gray-200 items-center' style={{bottom:75}}>
                <div className='font-semibold'>{product.rating}</div>
                <AiFillStar className='ml-2' color="green" />
                <div className='font-semibold mx-2'>|</div>
                <div className='font-semibold mx-2'>{product.discount}% OFF</div>
            </div>
            <div className='flex flex-col p-2'>
                <div className='font-semibold truncate overflow-ellipsis w-full '>{product.name}</div>
                <div className='flex flex-row items-center'>
                    <div className='font-semibold'>Rs. {product.price - (product.discount/100)*product.price}</div>
                    <div className='text-xs line-through text-gray-700 mx-2'>Rs. {product.price}</div>
                    <div className='text-sm text-orange-400'>({product.discount}% OFF)</div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;