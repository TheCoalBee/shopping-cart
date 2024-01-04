import { useState, useEffect } from 'react';
import './App.css';
import Cart from './Components/Cart';
import Products from './Components/Products';
import localforage from 'localforage';
import { cart as cartObj } from './cart';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

function App() {
  const [cart, setCart] = useState(cartObj);

  const totalItems = cart.products.reduce((sum, product) => 
        sum + Number(product.quantity), 0);

  {useEffect(() => {
    async function getCart() {
      const tempProducts = await localforage.getItem("cart");
      (tempProducts && setCart({
        ...cart,
        products:tempProducts,
      }))
    }

    getCart();
  }, [])}

  function handleAddProductToCart(productId) {
    const tempCart = cart;
    tempCart.addProductToCart(productId);
    setCart({
      ...cart,
      products: tempCart.products,
    })
  }

  function handleChangeQuantity(productId, newQuantity) {
    const tempCart = cart;
    tempCart.changeQuantity(productId, newQuantity);
    setCart({
      ...cart,
      products: tempCart.products,
    })
  }

  function handleRemoveProductFromCart(productId) {
    const tempCart = cart;
    tempCart.removeProductFromCart(productId);
    setCart({
      ...cart,
      products: tempCart.products,
    })
  }

  function handleGetProductQuantity(productId) {
    const tempCart = cart;
    const index = tempCart.getIndex(productId);
    return (index > -1) ? tempCart.products[index].quantity : 0;
  }

  function handleInCart(productId) {
    return cart.inCart(productId);
  }

  return (
    <BrowserRouter>
      <Link to="/cart">Cart {totalItems > 0 ? `(${totalItems})` : ""}</Link>
      <Link to="/products">Products</Link>
      <Routes>
        <Route>
          <Route path="cart" element={<Cart 
            cart={cart} 
            changeQuantity={handleChangeQuantity} removeProductFromCart={handleRemoveProductFromCart}
          />}/>
          <Route path="products" element={<Products 
            inCart={handleInCart}
            addProductToCart={handleAddProductToCart}
            getProductQuantity={handleGetProductQuantity}
          />}/>
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App;
