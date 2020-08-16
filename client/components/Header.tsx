import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { FaSignOutAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { primary, tertiary } from '@colors'
import StandardButton from './Button'
import useLoggedStatus from '../hooks/useLoggedStatus'
import { setLogoutAsync } from '@actions/auth'

const Logout = styled(FaSignOutAlt)`
  font-size: 2rem;
  color: white;
  cursor: pointer;
`

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

interface LoggedUserProps {
  logged: null | boolean
}

const LoggedUser = ({ logged }: LoggedUserProps) => {
  const route = useRouter()
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(setLogoutAsync(route))
  }
  if (logged === null) {
    return <div></div>
  }
  if (logged === true) {
    return <Logout onClick={logout} />
  }
  return (
    <>
      <Button href="/login" display="Login" />
      <Button href="/signup" display="Sign up" />
    </>
  )
}
