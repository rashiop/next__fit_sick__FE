import styled, { createGlobalStyle } from 'styled-components'

import Header from './Header'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    font-weight: normal;
    font-style: normal;
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
  }

  :root {
    --red: red;
    --black: #393939;
    --grey: #3a3a3a;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    box-sizing: border-box;
    font-family: 'radnika_next';
    font-size: 1.5rem;
    line-height: 2;
    margin: 0;
    padding: 0;
  }

  button {
    font-family: 'radnika_next';
  }
`

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`

export default function Page({ children }) {
  return (
    <>
      <GlobalStyles />
      <Header title="Header" />
      <InnerStyles>{children}</InnerStyles>
    </>
  )
}
