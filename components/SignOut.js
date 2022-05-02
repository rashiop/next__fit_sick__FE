import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';

import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    endSession
  }
`;

export default function SignOut() {
  const [signout, { loading }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button
      type="button"
      onClick={() => {
        signout();
        Router.push({ pathName: '/signin' });
      }}
      aria-disabled={loading}
    >
      SIGN OUT
    </button>
  );
}
