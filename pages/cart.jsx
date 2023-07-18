import React from 'react'
import {useCart} from '../context/cart'
import Link from 'next/link'

export default function Cart() {
  const {cart, removeFromCart} = useCart()

  if (!cart || !cart.lines) return <div>Your cart is empty</div>

  return (
    <div>
      {cart.lines.edges.map(({node: item}) => (
        <div key={item.id}>
          <h3>{item.merchandise.product.title}</h3>
          <p>{item.merchandise.product.description}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <Link href="/checkout">Proceed to Checkout</Link>
    </div>
  )
}
