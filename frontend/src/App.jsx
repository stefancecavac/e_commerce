import {BrowserRouter , Routes , Route} from 'react-router-dom' 

import Home from './pages/home'
import ProductDetails from './pages/productDetails'

import Navbar from './components/navbar'

function App() {


  return (
    <>
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path="/product-details/:productId" element={<ProductDetails></ProductDetails>}></Route>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
