import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <Link href="/products">PRODUCT</Link>
      <Link href="/sells">SELL</Link>
      <Link href="/orders">ORDER</Link>
      <Link href="/accounts">ACCOUNT</Link>
    </nav>
  )
}
