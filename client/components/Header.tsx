import Link from 'next/link'
import styled from '@emotion/styled'
import { lighten } from 'polished'
import { useSelector } from 'react-redux'
import { primary, tertiary } from '@colors'
import StandardButton from './Button'
import useLoggedStatus from '../hooks/useLoggedStatus'
import { State } from '@types'

export default () => {
  const logged = useLoggedStatus()
  return (
    <header className="header">
      <Link href="/">
        <img className="logo" src="/logo.png" alt="logo" />
      </Link>
      <div className="wrapper">
        <LoggedUser logged={logged} />
      </div>
      <style jsx>{`
        .header {
          padding: 0 10%;
          height: 5rem;
          background: ${primary};
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          position: sticky;
          top: 0;
          left: 0;
        }
        .logo {
          width: 3.5rem;
          cursor: pointer;
        }
        .wrapper {
          justify-self: end;
          display: grid;
          grid-template-columns: ${logged === false && '1fr 1fr'};
          gap: 0.5rem;
        }
      `}</style>
    </header>
  )
}

interface Button {
  href: string
  display: string
}

const StyledButton = styled(StandardButton)`
  background: ${tertiary};
`

const Button = ({ href, display }: Button) => (
  <Link href={href}>
    <StyledButton className="btn">{display}</StyledButton>
  </Link>
)

const Username = styled.span`
  color: white;
  font-size: 1.4rem;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  padding: 0.8rem 1.5rem;
  background: ${lighten(0.05, primary)};
  border-radius: 100px;
`

interface LoggedUserProps {
  logged: null | boolean
}

const LoggedUser = ({ logged }: LoggedUserProps) => {
  const { username } = useSelector(({ user }: State) => user)
  const profileURL = `/u/${username}`
  if (logged === null) {
    return <div></div>
  }
  if (logged === true) {
    return (
      <Link href="/u/[username]" as={profileURL}>
        <Username>{username}</Username>
      </Link>
    )
  }
  return (
    <>
      <Button href="/login" display="Login" />
      <Button href="/signup" display="Sign up" />
    </>
  )
}
