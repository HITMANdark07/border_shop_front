import React,{ useEffect } from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { googleLogin } from '../store/actions/user.action';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import googleLogo from '../assets/google-logo.png';
import { BiUserCircle } from 'react-icons/bi';
import Layout from '../components/Layout';

const LoginPage = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { cart } = useSelector((state) => state.cart);
    const informParent = (tokenId, profileObj) => {
        const sendData = {
            name: profileObj.givenName+" "+profileObj.familyName,
            email: profileObj.email,
            photo: profileObj.imageUrl,
            idToken:tokenId,
        }
        dispatch(googleLogin(sendData));
    }

    useEffect(() => {
        if(user && cart){
            navigate("/cart");
        }else if(user){
            navigate("/")
        }
    },[user,navigate,cart]);

    useEffect(() => {
        window.scrollTo({top:0,behavior:'smooth'})
    },[]);
    return(
        <Layout>
            {/* <h2 className='font-semibold text-2xl text-center'>LOGINPAGE</h2>
            <GoogleLoginButton informParent={informParent} text="LOGIN WITH GOOGLE" /> */}
            <div className='flex flex-col justify-center'>
            <img src={googleLogo} alt="google-logo" className='w-1/4 self-center' />
            <div className='font-semibold text-center text-lg -mt-6'>Sign in using Google Account</div>
            <div className='flex justify-center w-full '>
            <div className='flex flex-col bg-gray-300 md:w-1/3 w-1/2 justify-self-center rounded p-4 bg-opacity-70'>
                <BiUserCircle size={80} className="self-center" color='rgba(0,0,0,0.6)' />
                <div className='flex flex-row justify-center mt-2'>
                <GoogleLoginButton informParent={informParent} text="LOGIN WITH GOOGLE" /> 
                </div>
            </div>
            </div>
            </div>
        </Layout>
    )
}

export default LoginPage;