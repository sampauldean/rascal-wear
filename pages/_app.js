import React from 'react'
import '../styles/normalize.css'
import '../styles/global.scss'
import {CartProvider} from '../context/cart'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </>
  )
}

export default MyApp
