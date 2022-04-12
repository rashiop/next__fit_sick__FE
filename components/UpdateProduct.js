import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';

import useForm from '../lib/useForm';

import { ALL_PRODUCTS_QUERY } from './Products';

import DisplayError from './ErrorMessage';
import Form from './styles/Form';

/// 1. Get existing product
/// 2. Get mutation to update prod
/// 3. Handle the updates

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String!
    $description: String!
    $price: Int!
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      price
      description
    }
  }
`;

function UpdateProduct({ id }) {
  const {
    loading: fetchLoading,
    data = {},
    error: fetchError,
  } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  const { inputs, handleChange, resetForm, clearForm } = useForm(
    data?.Product,
    fetchLoading
  );

  const [updateProduct, { loading: saveLoading, error: saveError }] =
    useMutation(UPDATE_PRODUCT_MUTATION, {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    });

  if (fetchLoading) return <p>Loading...</p>;

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        clearForm();
        await updateProduct();

        Router.push({
          pathName: `/product/${id}`,
        });
      }}
    >
      <DisplayError error={fetchError ?? saveError} />
      <fieldset aria-busy={saveLoading}>
        <p>Update {id}</p>
        <label htmlFor="name">
          Name
          <textarea
            required
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={clearForm}>
          Clear Form
        </button>
        <button type="button" onClick={resetForm}>
          Reset Form
        </button>
        <button type="submit">+ Edit Product</button>
      </fieldset>
    </Form>
  );
}

export default UpdateProduct;
