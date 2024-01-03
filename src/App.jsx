import { useState, useEffect } from 'react';
import './App.css';
import Cart from './Components/Cart';
import Products from './Components/Products';
import localforage from 'localforage';
import { cart as cartObj } from './cart';

function App() {
  const [cart, setCart] = useState(cartObj);

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

  function handleInCart(productId) {
    return cart.inCart(productId);
  }

  return (
    <>
      <Products 
        inCart={handleInCart}
        addProductToCart={handleAddProductToCart}
      />
      <Cart 
        cart={cart} 
        changeQuantity={handleChangeQuantity} removeProductFromCart={handleRemoveProductFromCart}
      />
    </>
  )
}

export default App
