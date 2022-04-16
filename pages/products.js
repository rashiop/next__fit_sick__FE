import Pagination from '../components/Pagination';
import Products from '../components/Products';

export default function ProductPage({ query: { page = 1 } = {} }) {
  return (
    <div>
      <Pagination page={page} />
      <Products page={page} />
    </div>
  );
}
