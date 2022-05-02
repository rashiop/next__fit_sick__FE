import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';

import useForm from '../lib/useForm';

import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const error =
    data?.authenticateUserWithPassword?.__typename ===
      'UserAuthenticationWithPasswordFailure' &&
    data?.authenticateUserWithPassword;

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        // submit
        const response = await signin();

        if (response.data?.authenticateUserWithPassword?.sessionToken) {
          clearForm();
          Router.push('/');
        }
      }}
    >
      <h2>Sign In into your account</h2>
      <DisplayError error={error} />
      <fieldset aria-busy={loading}>
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
        <button type="submit">Login</button>
      </fieldset>
    </Form>
  );
}
