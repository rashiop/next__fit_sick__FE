import Link from 'next/link';
import styled from 'styled-components';

import Nav from './Nav';

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Sick fits</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
    </HeaderStyles>
  );
}

const HeaderStyles = styled.header`
  .bar {
    align-items: stretch;
    border-bottom: 8px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
  }

  .sub-bar {
    border-bottom: 1px solid var(--black, black);
    display: grid;
    grid-template-columns: 1fr auto;
  }

  nav > a {
    text-decoration: none;
  }
`;

const Logo = styled.h1`
  background-color: red;
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  transform: skew(-7deg);
  z-index: 2;

  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;
