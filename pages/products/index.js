import { useRouter } from 'next/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductPage() {
  const { query } = useRouter();
  return (
    <div>
      <Pagination page={+query.page ?? 1} />
      <Products page={+query.page ?? 1} />
    </div>
  );
}
