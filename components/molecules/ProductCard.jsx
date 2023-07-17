import Link from 'next/link'
import Image from 'next/image'

import * as style from './ProductCard.module.scss'

const ProductCard = ({ product }) => {

  console.log('PRODUCT:', product)

  return (
    <div className={style.Products__card} key={product.node.id}>
      <div className={style.Products__card_text_container}>
        <h3 className={style.Products__card_title}>{product.node.title}</h3>
        <p className={style.Products__card_description}>{product.node.description}</p>
      </div>
      <div className={style.Products__card_image_container}>
        <Image
          src={product.node.featuredImage.url}
          alt={product.node.featuredImage.altText}
          fill
        />
      </div>
    </div>
)
}

export default ProductCard