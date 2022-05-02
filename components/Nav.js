import Link from 'next/link';
import SignOut from './SignOut';

import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  console.log(user);
  return (
    <NavStyles>
      <Link href="/products">PRODUCTS</Link>
      {user && (
        <>
          <Link href="/sells">SELL</Link>
          <Link href="/orders">ORDER</Link>
          <Link href="/accounts">ACCOUNT</Link>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">SIGN IN</Link>
        </>
      )}
    </NavStyles>
  );
}
