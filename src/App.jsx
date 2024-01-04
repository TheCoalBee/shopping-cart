import { createContext, useState, useEffect } from 'react';
import './App.css';
import Cart from './Components/Cart';
import Products from './Components/Products';
import { products } from './products';
import localforage from 'localforage';
import { cart as cartObj } from './cart';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

export const ShopContext = createContext({
  products: [],
  cart: [],
  addProductToCart: () => {},
  changeQuantity: () => {},
  removeProductFromCart: () => {},
  getProductQuantity: () => {},
  inCart: () => {}
})

function App() {
  const [cart, setCart] = useState(cartObj);

  const totalItems = cart.products.reduce((sum, product) => 
        sum + Number(product.quantity), 0);

  useEffect(() => {
    async function getCart() {
      const tempProducts = await localforage.getItem("cart");
      (tempProducts && setCart({
        ...cart,
        products:tempProducts,
      }))
    }

    getCart();
  }, [])

  function addProductToCart(productId) {
    const tempCart = cart;
    tempCart.addProductToCart(productId);
    setCart({
      ...cart,
      products: tempCart.products,
    })
  }

  function changeQuantity(productId, newQuantity) {
    const tempCart = cart;
    tempCart.changeQuantity(productId, newQuantity);
    setCart({
      ...cart,
      products: tempCart.products,
    })
  }

  function removeProductFromCart(productId) {
    const tempCart = cart;
    tempCart.removeProductFromCart(productId);
    setCart({
      ...cart,
      products: tempCart.products,
    })
  }

  function getProductQuantity(productId) {
    const tempCart = cart;
    const index = tempCart.getIndex(productId);
    return (index > -1) ? tempCart.products[index].quantity : 0;
  }

  function inCart(productId) {
    return cart.inCart(productId);
  }

  return (
    <ShopContext.Provider value={{products, cart, addProductToCart, changeQuantity, getProductQuantity, removeProductFromCart, inCart}}>
      <BrowserRouter>
        <Link to="/cart">Cart {totalItems > 0 ? `(${totalItems})` : ""}</Link>
        <Link to="/products">Products</Link>
        <Routes>
          <Route>
              <Route path="cart" element={<Cart />}/>
              <Route path="products" element={<Products />}/>
          </Route>
        </Routes>

      </BrowserRouter>
    </ShopContext.Provider>
  )
}

export default App;
