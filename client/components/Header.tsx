import Link from 'next/link'
import styled from '@emotion/styled'
import { lighten, rgba } from 'polished'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { primary, tertiary } from '@colors'
import StandardButton from './Button'
import useLoggedStatus from '../hooks/useLoggedStatus'
import { State } from '@types'
import { setLogoutAsync } from '@actions/auth'

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
          grid-template-columns: 1fr 20rem;
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
          grid-template-columns: ${logged !== true && '1fr 1fr'};
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
  padding: 0.8rem 2rem;
  font-size: 1.4rem;
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
  position: relative;
`

interface LoggedUserProps {
  logged: null | boolean
}

const LoggedUser = ({ logged }: LoggedUserProps) => {
  const { username } = useSelector(({ user }: State) => user)
  const route = useRouter()
  const dispatch = useDispatch()
  const profileURL = `/u/${username}`
  const [box, setBox] = useState(false)
  const logout = () => {
    dispatch(setLogoutAsync(route))
  }
  if (logged === null) {
    return <div></div>
  }
  if (logged === true) {
    return (
      <Username onClick={() => setBox(!box)}>
        {username}
        {box && (
          <OptionsBox>
            <Link href="/u/[username]" as={profileURL}>
              <li>Your Profile</li>
            </Link>
            <Link href="/create_community">
              <li>Create Community</li>
            </Link>
            <li onClick={logout}>Log Out</li>
          </OptionsBox>
        )}
      </Username>
    )
  }
  return (
    <>
      <Button href="/login" display="Login" />
      <Button href="/signup" display="Sign up" />
    </>
  )
}

const OptionsBox = styled.div`
  background: white;
  position: absolute;
  top: 4rem;
  right: 0;
  width: 20rem;
  height: auto;
  list-style: none;
  display: grid;
  gap: 0.5rem;
  cursor: default;
  border: 1px solid ${primary};
  border-radius: 0 0 3px 3px;
  font-weight: 400;
  padding: 0.5rem 0;
  box-shadow: 0 2px 0 ${rgba(primary, 0.4)};
  li {
    color: ${primary};
    text-transform: capitalize;
    cursor: pointer;
    padding: 1rem 2rem;
    transition: 0.2s background;
    &:hover {
      background: ${primary};
      color: white;
    }
  }
`
