import React from 'react'
import '../styles/normalize.css'
import '../styles/global.scss'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
