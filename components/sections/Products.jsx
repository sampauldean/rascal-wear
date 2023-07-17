import ProductCard from '../molecules/ProductCard';
import Animate from '../atoms/Animate';

import * as style from './Products.module.scss'

const Products = (props) => {
  const { products } = props;

  if (!products) {
    return null; // or return a loading state if desired
  }

  return (
    <Animate>
      <div className={`${style.Products__grid} animate animate--fade-up`}>
        {products.map(product => (
          <ProductCard key={product.node.id} product={product} />
        ))}
      </div>
    </Animate>
  )
}

export default Products;