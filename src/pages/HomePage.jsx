import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../store/actions/products.action';

const HomePage = () =>{

    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts());
    },[dispatch]);
    
    useEffect(() => {
        window.scrollTo({top:0,behavior:'smooth'})
      },[]);
    return(
        <Layout>
            <div className='flex flex-row justify-center flex-wrap'>
            {
                products.map((product) => (
                    <ProductCard key={product.product_slug} product={product} />
                ))
            }
            </div>
        </Layout>
    )
}

export default HomePage;