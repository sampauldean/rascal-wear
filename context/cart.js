import { createContext, useContext, useState, useEffect } from 'react'
import { retrieveCart, addToCart as apiAddToCart, updateCart as apiUpdateCart } from '../utils/shopify'

const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState(null)

  useEffect(() => {
    const initializeCart = async () => {
      // Here we could check for existing cart ID in local storage
      // If it exists, use that one, otherwise create a new cart
      let existingCartId = localStorage.getItem('cartId')
      if (!existingCartId) {
        const newCart = await apiAddToCart('your-product-id-here', 1)
        existingCartId = newCart.cart.id
        localStorage.setItem('cartId', existingCartId)
      }
      const cart = await retrieveCart(existingCartId)
      setCart(cart)
    }
    initializeCart()
  }, [])

  const addToCart = async (productId, quantity) => {
    // Update cart in the api
    const updatedCart = await apiAddToCart(productId, quantity)
    // Update the local state
    setCart(updatedCart)
  }

  const removeFromCart = async (itemId) => {
    // Update cart in the api
    const updatedCart = await apiUpdateCart(cart.id, itemId, 0)
    // Update the local state
    setCart(updatedCart)
  }

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
