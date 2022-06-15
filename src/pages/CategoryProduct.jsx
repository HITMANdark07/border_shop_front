import React, {useEffect} from 'react';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getProductsByCategory } from '../store/actions/products.action';
import ProductCard from '../components/ProductCard';

const CategoryProduct = () => {
    const dispatch = useDispatch();
    const { category } = useParams();
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProductsByCategory(category));
        window.scrollTo({top:0,behavior:'smooth'})
    },[dispatch,category]);
    
    return (
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

export default CategoryProduct;