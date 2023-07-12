import Animate from '../atoms/Animate'
import Image from 'next/image'
import style from "./Products.module.scss"

const Products = (props) => {
  const { products } = props;

  if (!products) {
    return null; // or return a loading state if desired
  }

  return (
    <>
      {/* <Animate> */}
        <div className={style.Products}>
          {products.map((product) => (
            <div key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      {/* </Animate> */}
    </>
  )
}

export default Products