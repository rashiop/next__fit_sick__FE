import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import useForm from '../lib/useForm';

import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $token: String!
    $email: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      token: $token
      email: $email
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, clearForm } = useForm({
    token,
    email: '',
    password: '',
  });

  const [
    reset,
    {
      data: { redeemUserPasswordResetToken: resetError } = {},
      error: successfulError,
      loading,
    },
  ] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        // submit
        const response = await reset().catch(console.error);

        if (response?.data?.redeemUserPasswordResetToken?.code === null) {
          clearForm();
        }
      }}
    >
      <h2>Reset Your Password</h2>
      <DisplayError error={resetError || successfulError} />
      <fieldset aria-busy={loading}>
        {resetError === null && <p>Success! You may now sign in</p>}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            autoComplete="email"
            onChange={handleChange}
            value={inputs.email}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Your password"
            onChange={handleChange}
            value={inputs.password}
          />
        </label>
        <button type="submit">Reset Password</button>
      </fieldset>
    </Form>
  );
}

Reset.propTypes = {
  token: PropTypes.string,
};
