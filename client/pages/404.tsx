import { NextSeo } from 'next-seo'
import Link from 'next/link'
import styled from '@emotion/styled'
import { primary, secondary, tertiary } from '@colors'
import Button from '@components/Button'

const Error = styled.div`
  background: ${primary};
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 15rem;
    color: ${secondary};
  }
`

export default () => (
  <Error>
    <NextSeo title="Not Found - drspoiler" />
    <div>
      <h1>404</h1>
      <Link href="/">
        <Button>Home</Button>
      </Link>
    </div>
  </Error>
)
