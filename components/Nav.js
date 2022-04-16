import Link from 'next/link';

import NavStyles from './styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/products">PRODUCTS</Link>
      <Link href="/sells">SELL</Link>
      <Link href="/orders">ORDER</Link>
      <Link href="/accounts">ACCOUNT</Link>
    </NavStyles>
  );
}
