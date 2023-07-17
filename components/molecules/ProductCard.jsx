import Link from 'next/link'
import Image from 'next/image'

import * as style from './ProductCard.module.scss'

const ProductCard = ({ product: { node: product } }) => {

  return (
    <Link
      href={`/shop/${product.handle}`}
      className={style.Products__card} 
      key={product.id}
    >
      <div className={style.Products__card_text_container}>
        <h3 className={style.Products__card_title}>{product.title}</h3>
        <p className={style.Products__card_description}>{product.description}</p>
      </div>
      <div className={style.Products__card_image_container}>
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
          fill
        />
      </div>
    </Link>
)
}

export default ProductCard
