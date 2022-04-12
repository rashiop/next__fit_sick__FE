import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';

import DisplayError from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  if (!id) return <p>Not Found</p>;

  const {
    data: { Product: product } = {},
    loading,
    error,
  } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading</p>;
  if (error) return <DisplayError error={error} />;

  return (
    <ProductStyles>
      <Head>
        <title>SickFit - {product?.name}</title>
      </Head>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product?.photo?.image?.altText ?? ''}
      />
      <div className="details">
        <h2>{product?.name}</h2>
        <p>{product?.description}</p>
      </div>
    </ProductStyles>
  );
}

const ProductStyles = styled.div`
  align-items: center;
  background-color: red;
  display: grid;
  gap: 2rem;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  justify-content: center;
  max-width: var(--maxWidth);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
