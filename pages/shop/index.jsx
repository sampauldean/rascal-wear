import Products from '../../components/sections/Products'
import Animate from '../../components/atoms/Animate'
import Client from 'shopify-buy';
import style from "../../components/sections/Products.module.scss"

// Initialize the Shopify SDK
const client = Client.buildClient({
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  domain: process.env.SHOPIFY_STORE_DOMAIN,
});

export async function getStaticProps() {
  // Fetch data from Shopify
  const products = await client.product.fetchAll();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)), // Convert Shopify objects to plain JSON
    },
    revalidate: 5,
  };
}

const ShopPage = ({products}) => {
  return (
    <>
    <section className={style.Products}>
      <div className={`container`}>
        <Animate>
          <h1 className={`${style.Products__title} animate animate--fade-up heading`}>Shop</h1>
        </Animate>
        <Products products={products} />
      </div>
    </section>
    </>
  )
}

export default ShopPage
