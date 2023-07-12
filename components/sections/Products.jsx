import React from 'react';
import { builder, BuilderComponent, Builder } from '@builder.io/react'

const Products = (props) => {
  const { products } = props;

  if (!products) {
    return null; // or return a loading state if desired
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Products