import {BrowserRouter , Routes , Route} from 'react-router-dom' 

import Home from './pages/home'
import ProductDetails from './pages/productDetails'

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path="/product-details/:productId" element={<ProductDetails></ProductDetails>}></Route>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
