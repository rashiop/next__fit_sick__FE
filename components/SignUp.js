import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import useForm from '../lib/useForm';

import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        // submit
        const response = await signup().catch(console.error);

        if (response?.data?.createUser?.id) {
          clearForm();
        }
      }}
    >
      <h2>Sign Up for an account</h2>
      <DisplayError error={error} />
      <fieldset aria-busy={loading}>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser?.email} - Please go ahead and sign
            in
          </p>
        )}
        <label htmlFor="name">
          Name
          <input
            type="name"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            onChange={handleChange}
            value={inputs.name}
          />
        </label>
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
        <button type="submit">Register</button>
      </fieldset>
    </Form>
  );
}
