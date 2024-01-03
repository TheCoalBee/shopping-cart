import React, { useState, useEffect } from 'react'
import { products } from '../products';

export default function Cart({cart, changeQuantity, removeProductFromCart}) {

    const totalPrice = cart.products.reduce((sum, product) => {
        const productPrice = products.find(item => item.id === product.id).price;
        return sum + (productPrice * product.quantity);
    }, 0).toFixed(2);

    const totalItems = cart.products.reduce((sum, product) => 
        sum + Number(product.quantity), 0);

    return (
        <div id="cart">
            <h1>Cart</h1>
            <p>{totalItems} items in cart</p>
            <ul>
                {cart.products.map(item => {
                    const product = products.find(product => product.id === item.id)

                    return <li 
                    key={product.id}
                    className={"cart-product"}

            >
                <img 
                    src={product.src} 
                    alt={product.name} 
                    className={"cart-product-img"}
                />
                <div className="cart-product-details">
                    <h2
                        className={"cart-product-name"}
                    >
                        {product.name}
                    </h2>
                    <h3
                        className={"cart-product-price"}
                    >
                        ${product.price}
                    </h3>
                </div>
                <div className={"cart-product-actions"}>
                    <input type="number" value={item.quantity} onChange={(e) => changeQuantity(product.id, e.target.value)} className={"cart-product-quantity"}/>
                    <button 
                        className={"cart-product-remove"}
                        onClick={() => removeProductFromCart(product.id)}
                    >
                        Remove
                    </button>
                </div>
            </li>
                })}
            </ul>
            <p>Total: ${totalPrice}</p>
        </div>
    )
}
