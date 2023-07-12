import Products from '../../components/sections/Products'
import Client from 'shopify-buy';

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
      <div>ShopPage</div>
      <Products products={products} />
    </>
  )
}

export default ShopPage
