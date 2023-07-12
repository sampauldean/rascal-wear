import Image from 'next/image'
import ProductCard from '../molecules/ProductCard';

import * as style from './Products.module.scss'

const Products = (props) => {
  const { products } = props;

  if (!products) {
    return null; // or return a loading state if desired
  }

  return (
    <>
      <div className={style.Products__grid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default Products