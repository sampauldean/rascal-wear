import ProductCard from '../molecules/ProductCard';
import Animate from '../atoms/Animate';
import { builder, BuilderComponent, Builder } from '@builder.io/react'

import * as style from './Products.module.scss'

const Products = (props) => {
  const { products } = props;

  if (!products) {
    return null; // or return a loading state if desired
  }

  return (
    <Animate>
    <div className={`${style.Products} animate animate--fade-up`}>
    hello
    </div>
      <div className={`${style.Products__grid} animate animate--fade-up`}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Animate>
  )
}

Builder.registerComponent(Products, {
  name: 'Products',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Coming Soon',
    },
  ],

});