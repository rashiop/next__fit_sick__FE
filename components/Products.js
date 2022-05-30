import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { perPage } from '../config';

import DisplayError from './ErrorMessage';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($first: Int!, $skip: Int = 0) {
    allProducts(first: $first, skip: $skip) {
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

export default function Products({ page = 1 }) {
  const prevPage = +page - 1;
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      first: perPage,
      skip: prevPage * perPage,
    },
  });

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

Products.propTypes = {
  page: PropTypes.number,
};
