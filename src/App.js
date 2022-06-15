import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import Cart from './pages/Cart';
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import CategoryProduct from "./pages/CategoryProduct";

function App() {

  // const {user} = useSelector(state => state.user) ;
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if(user){
  //     dispatch(getDonationsPerUser(user?._id));
  //     dispatch(getDonators('volunteer'));
  //     dispatch(getWalletBalance(user?._id));
  //   }
  // },[user]);
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:product_slug' element={<ProductPage />} />
        <Route path="/category/:category" element={<CategoryProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
