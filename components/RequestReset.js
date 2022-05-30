import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import useForm from '../lib/useForm';

import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
  });

  const [requestReset, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        // submit
        const response = await requestReset().catch(console.error);

        if (response?.data?.requestReset?.id) {
          clearForm();
        }
      }}
    >
      <h2>Request a Password Reset</h2>
      <DisplayError error={error} />
      <fieldset aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
        )}
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
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
