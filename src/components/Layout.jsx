import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillHandbagFill } from 'react-icons/bs';
import { BiExit, BiUserCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/user.slice';

const Layout = ({children}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { cart } = useSelector((state) => state.cart);
    let products_qty = cart?.products?.length || 0;
    
    const signOut = () => {
        dispatch(logout());
    }
    const goToLogin = () => {
        navigate("/login");
    }
    return(
        <>
        <div className='w-full'>
            <div className='hidden md:block fixed top-0 w-full p-3 px-4 bg-indigo-600 z-50 shadow-md'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='text-white font-bold text-2xl cursor-pointer ' onClick={() => navigate("/")}>BORDER SHOP</div>
                    <div className='flex flex-row justify-start ml-16 flex-1'>
                        <div className='text-white font-semibold mx-6 cursor-pointer hover:text-orange-400' onClick={() => navigate("/category/mens")}>Mens</div>
                        <div className='text-white font-semibold mx-6 cursor-pointer hover:text-orange-400' onClick={() => navigate("/category/womens")}>Womens</div>
                        <div className='text-white font-semibold mx-6 cursor-pointer hover:text-orange-400' onClick={() => navigate("/category/kids")}>Kids</div>
                        <div className='text-white font-semibold mx-6 cursor-pointer hover:text-orange-400' onClick={() => navigate("/category/footware")}>Footware</div>
                    </div>
                    <div className='flex flex-row items-center'>
                        {user ? 
                        <img src={user.photo} className="rounded-full h-8 border-2 border-white cursor-pointer w-8" alt={user.email}  />
                        :
                        <BiUserCircle className='cursor-pointer' size={40} color="#FFFFFF" onClick={goToLogin} />
                        }
                        <div className='relative mx-4' onClick={() => navigate("/cart")}>
                        <BsFillHandbagFill size={30} className="cursor-pointer ml-2" color='white' />
                        <div className='text-white bg-red-600 px-2 py-1 rounded-full absolute' style={{top:-10, right:-5}}><p className='text-xs'>{products_qty}</p></div>
                        </div>
                        {user && 
                        <BiExit onClick={signOut} size={30} className="cursor-pointer ml-2" color='white' />
                        }
                    </div>
                </div>
            </div>
            <div className='md:hidden fixed top-0 w-full p-3 px-4 bg-indigo-600 z-50 shadow-md'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='text-white font-bold text-2xl' onClick={() => navigate("/")}>BSHOP</div>

                    <div className='flex flex-row items-center'>
                        {user ? 
                        <img src={user.photo} className="rounded-full h-8 border-2 border-white cursor-pointer w-8" alt={user.email} />
                        :
                        <BiUserCircle className='cursor-pointer' size={40} color="#FFFFFF" onClick={goToLogin} />
                        }
                        <div className='relative mx-4' onClick={() => navigate("/cart")}>
                        <BsFillHandbagFill size={30} className="cursor-pointer ml-2" color='white' />
                        <div className='text-white bg-red-600 px-2 py-1 rounded-full absolute' style={{top:-10, right:-5}}><p className='text-xs'>{products_qty}</p></div>
                        </div>
                        {user && 
                        <BiExit onClick={signOut} size={30} className="cursor-pointer ml-2" color='white' />
                        }
                    </div>

                </div>
            </div>
        </div>
        <div className='mt-20'>
            {children}
        </div>
        </>
    )
}

export default Layout;