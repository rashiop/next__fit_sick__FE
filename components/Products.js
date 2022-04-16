import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

import DisplayError from './ErrorMessage';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <DisplayError error={error} />;
  }

  return (
    <div>
      <p>Products</p>
      <ProductsListStyles>
        {data?.allProducts?.length !== 0 &&
          data.allProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </ProductsListStyles>
    </div>
  );
}

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;
