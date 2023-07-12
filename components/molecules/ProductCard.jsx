import Link from 'next/link'
import Image from 'next/image'

import * as style from './ProductCard.module.scss'

const ProductCard = ({ product }) => {

  console.log(product.title)

  return (
    <div className={style.Products__card} key={product.id}>
      <h3 className={style.Products__card_title}>{product.title}</h3>
      <p className={style.Products__card_description}>{product.description}</p>
    </div>
)
}

export default ProductCard