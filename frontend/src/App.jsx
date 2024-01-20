import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/home'
import ProductDetails from './pages/productDetails'
import Login from './pages/login'
import Register from './pages/register'

import Navbar from './components/navbar'
import { useUserContext } from './hooks/useUserContext'
import AddProduct from './pages/addProduct'
import MyProducts from './pages/myProducts'

function App() {
  const { user } = useUserContext()

  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path="/product-details/:productId" element={<ProductDetails></ProductDetails>}></Route>

          <Route path='/user/login'

            element={!user ? <Login></Login> : <Navigate to='/'></Navigate>}></Route>
          <Route path='/user/register'
            element={!user ? <Register></Register> : <Navigate to='/'></Navigate>}></Route>

          <Route path='/addproduct' element={user ? <AddProduct></AddProduct> : <Navigate to='/'></Navigate>}></Route>

          <Route path='/userproducts' element={user ? <MyProducts></MyProducts> : <Navigate to='/'></Navigate>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
