import React from 'react'
import { products } from '../products'

export default function Products({inCart, addProductToCart, getProductQuantity}) {
  return (
    <div id="products">
        <h1>Products</h1>
        <p>{products.length} products displayed.</p>
        <ul>
            {products.map((product) => {
                console.log(product.id);
                const quantity = getProductQuantity(product.id);
                return <li 
                            key={product.id}
                            className={"product"}

                    >
                        {inCart(product.id) && <p className={'product-in-cart'}>{quantity} in cart</p> }
                        <img 
                            src={product.src} 
                            alt={product.name} 
                            className={"product-img"}
                        />
                        <h2
                            className={"product-name"}
                        >
                            {product.name}
                        </h2>
                        <h3
                            className={"product-price"}
                        >
                            ${product.price}
                            <button 
                                className={"product-add"}
                                onClick={() => addProductToCart(product.id)}
                            >
                                Add
                            </button>
                        </h3>
                    </li>
            })}
        </ul>
    </div>
  )
}
