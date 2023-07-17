// pages/shop/[handle].jsx
import { gql, GraphQLClient } from "graphql-request";

const endpoint = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": token,
  },
});

export async function getStaticPaths() {
  const query = `
    {
      products(first: 100) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `;
  
  const data = await graphQLClient.request(query);
  const paths = data.products.edges.map(({node}) => ({ params: { handle: node.handle } }));

  return { paths, fallback: false };  // fallback: false means that non-existent pages will 404.
}

export async function getStaticProps({ params }) {
  const { handle } = params;
  
  const query = `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
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
  `;

  const variables = {
    handle,
  };

  const data = await graphQLClient.request(query, variables);

  return {
    props: {
      product: data.productByHandle,
    },
    revalidate: 5,
  };
}

const ProductPage = ({ product }) => {
  return (
    <div>
      <h1>{product.title}</h1>
      {/* Add other product details here */}
    </div>
  );
}

export default ProductPage;
