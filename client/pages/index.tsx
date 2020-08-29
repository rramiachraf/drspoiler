import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import styled from '@emotion/styled'
import { secondary, primary, tertiary } from '@colors'
import Button from '@components/Button'
import { rgba } from 'polished'
import Link from 'next/link'
import useLoggedStatus from 'hooks/useLoggedStatus'

const Home = styled.div`
  background: linear-gradient(
      to left bottom,
      ${rgba(primary, 0.9)},
      ${rgba(primary, 0.5)}
    ),
    url('/panels.png');
  height: 100vh;
  background-size: cover;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: ${primary};
`

const Main = styled.main`
  display: grid;
  grid-template-rows: 3rem 2rem auto;
  text-align: center;
  gap: 0.5rem;
  border: 5px solid black;
  padding: 2rem;
  background: ${rgba('white', 0.7)};
  p {
    font-size: 1.5rem;
    text-transform: uppercase;
  }
  h1 {
    font-size: 3rem;
    font-weight: 700;
    text-transform: uppercase;
  }
`

const ButtonsArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`

const JoinUs = styled(Button)`
  background: ${tertiary};
`

const Login = styled(Button)`
  background: none;
  border: 1px solid ${secondary};
  color: ${secondary};
  &:hover {
    color: white;
  }
`

export default () => {
  const logged = useLoggedStatus()
  const route = useRouter()
  const description = 'The worst website on the internet'
  if (logged === true) {
    route.push('/dashboard')
  }
  return (
    <>
      <NextSeo
        title="drspoiler: Ruin your experience"
        description={description}
      />
      <Home>
        <div></div>
        <Main>
          <h1>drspoiler.com</h1>
          <p>{description}</p>
          <ButtonsArea>
            <Link href="/signup">
              <JoinUs>Join Us</JoinUs>
            </Link>
            <Link href="/login">
              <Login>Login</Login>
            </Link>
          </ButtonsArea>
        </Main>
        <div></div>
      </Home>
    </>
  )
}
