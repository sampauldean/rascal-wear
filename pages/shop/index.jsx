import Products from '../../components/sections/Products'
import Animate from '../../components/atoms/Animate'
import style from "../../components/sections/Products.module.scss"

import { gql, GraphQLClient } from "graphql-request";

const endpoint = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;


const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": token,
  },
});

export async function getProducts() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
              }
            }
            featuredImage {
              altText
              url
            }
          }
        }
      }
    }
  `;
  
  try {
    const data = await graphQLClient.request(query);
    console.log(data);
    if (!data || !data.products) {
      console.error('No products retrieved');
      return [];
    }
    return data.products.edges;
  } catch (error) {
    console.error('Error retrieving products:', error);
    return [];
  }
}

export async function getStaticProps() {
  const products = await getProducts();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
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
