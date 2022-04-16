import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';

import { perPage } from '../config';

import DisplayError from './ErrorMessage';
import PaginationStyle from './styles/PaginationStyles';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page = 1 }) {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);
  const total = data?._allProductsMeta?.count ?? 0;
  const totalPage = Math.ceil(total / perPage);
  const nextPage = page + 1 < totalPage ? page + 1 : totalPage;
  const prevPage = page === 1 ? 1 : page - 1;

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <DisplayError error={error} />;
  }

  return (
    <PaginationStyle>
      <Head>
        <title>
          Sick Fits - Page {page} of {totalPage}
        </title>
      </Head>
      <Link href={`/products/${prevPage}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {totalPage}
      </p>
      <p>{total} Items Total</p>

      <Link href={`/products/${nextPage}`}>
        <a aria-disabled={page >= totalPage}>Next →</a>
      </Link>
    </PaginationStyle>
  );
}
