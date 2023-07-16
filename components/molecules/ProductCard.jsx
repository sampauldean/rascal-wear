import Link from 'next/link'
import Image from 'next/image'

import * as style from './ProductCard.module.scss'

const ProductCard = ({ product }) => {

  console.log('PRODUCT:', product)

  return (
    <div className={style.Products__card} key={product.id}>
      <h3 className={style.Products__card_title}>{product.title}</h3>
      <p className={style.Products__card_description}>{product.description}</p>
      <Image
        src={product.images[0].src}
        alt={product.images[0].altText}
        width={100}
        height={100}
        layout="responsive"
      />

    </div>
)
}

export default ProductCard