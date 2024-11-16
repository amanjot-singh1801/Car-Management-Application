
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Products from './pages/Products';
import CreateProduct from './pages/CreateProduct';
import ProductDetail from './pages/ProductDetail';
import EditProduct from './pages/EditProduct';
import OpenRoute from './components/Auth/OpenRoute';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {

  return (
    <div className="App">
        <Routes>
          
          <Route path='/' element={<OpenRoute> <SignUp /> </OpenRoute>} />
          <Route path='/login' element={<OpenRoute> <Login /> </OpenRoute>} />
          <Route path='/products' element={<PrivateRoute> <Products /> </PrivateRoute>} />
          <Route path='/createProduct' element={ <PrivateRoute> <CreateProduct/> </PrivateRoute>  }></Route>
          <Route path="/product/:productId" element={ <PrivateRoute> <ProductDetail/> </PrivateRoute> } />
          <Route path="/editproduct/:productId" element={<PrivateRoute> <EditProduct/> </PrivateRoute> } />
        </Routes>
    </div>
  );
}

export default App;
