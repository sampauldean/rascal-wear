import Link from 'next/link'
import Image from 'next/image'
import {useCart} from '../../context/cart'
import * as style from './ProductCard.module.scss'

const ProductCard = ({ product: { node: product } }) => {
  const {addToCart} = useCart()

  return (
    <div className={style.Products__card} key={product.id}>
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
      <button onClick={() => addToCart(product.id, 1)}>Add to Cart</button>
      <Link href={`/shop/${product.handle}`}>View Details</Link>
    </div>
  )
}

export default ProductCard
