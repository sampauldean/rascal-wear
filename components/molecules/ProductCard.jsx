import Link from 'next/link'
import Image from 'next/image'

import * as style from './ProductCard.module.scss'

const ProductCard = ({ product }) => {

  console.log('PRODUCT:', product)

  return (
    <div className={style.Products__card} key={product.id}>
      <div className={style.Products__card_text_container}>
        <h3 className={style.Products__card_title}>{product.title}</h3>
        <p className={style.Products__card_description}>{product.description}</p>
      </div>
      <div className={style.Products__card_image_container}>
        <Image
          src={product.images[0].src}
          alt={product.images[0].altText}
          fill
        />
      </div>
    </div>
)
}

export default ProductCard