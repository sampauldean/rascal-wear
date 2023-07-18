const endpoint = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

import { gql, GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": token,
    "Content-Type": "application/json",
  },
});

export async function addToCart(itemId, quantity) {
  const createCartMutation = gql`
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartInput: {
      lines: [
        {
          quantity: parseInt(quantity),
          merchandiseId: itemId,
        },
      ],
    },
  };
  try {
    const data = await graphQLClient.request(createCartMutation, variables);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateCart(cartId, itemId, quantity) {
  const updateCartMutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartId: cartId,
    lines: [
      {
        quantity: parseInt(quantity),
        merchandiseId: itemId,
      },
    ],
  };

  try {
    const data = await graphQLClient.request(updateCartMutation, variables);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function retrieveCart(cartId) {
  const cartQuery = gql`
    query cartQuery($cartId: ID!) {
      cart(id: $cartId) {
        id
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                    priceRange {
                      minVariantPrice {
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
        }

        estimatedCost {
          totalAmount {
            amount
          }
        }
      }
    }
  `;
  const variables = {
    cartId,
  };
  try {
    const data = await graphQLClient.request(cartQuery, variables);
    return data.cart;
  } catch (error) {
    throw new Error(error);
  }
}
export const getCheckoutUrl = async (cartId) => {
  const getCheckoutUrlQuery = gql`
    query checkoutURL($cartId: ID!) {
      cart(id: $cartId) {
        checkoutUrl
      }
    }
  `;
  const variables = {
    cartId: cartId,
  };

  try {
    return await graphQLClient.request(getCheckoutUrlQuery, variables);
  } catch (error) {
    throw new Error(error);
  }
};