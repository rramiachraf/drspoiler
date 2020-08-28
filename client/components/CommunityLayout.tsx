import { FaImages, FaTrash, FaEdit } from 'react-icons/fa'
import styled from '@emotion/styled'
import { useRef, MutableRefObject } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { lighten } from 'polished'
import Header from './Header'
import About from './About'
import { Community, State } from '@types'
import Container from './Container'
import { primary, danger, secondary } from '@colors'
import { css } from '@emotion/core'

interface Props {
  community: Community
  content?: any
}

const ChangePoster = styled(FaImages)`
  color: white;
  font-size: 2rem;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.5rem;
  cursor: pointer;
  background: ${primary};
  border-top-left-radius: 3px;
  border-bottom-right-radius: 3px;
`

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
`

interface OptionProps {
  dangerous?: boolean
}

const dangerousRadius = css`
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
`

const editRadius = css`
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
`

const Option = styled.div`
  background: ${({ dangerous }: OptionProps) => (dangerous ? danger : primary)};
  ${({ dangerous }: OptionProps) => (dangerous ? dangerousRadius : editRadius)}
  padding: 1rem;
  font-size: 1.6rem;
  cursor: pointer;
  display: grid;
  justify-content: center;
  color: white;
  transition: 0.3s background;
  &:hover,
  &:active {
    background: ${({ dangerous }: OptionProps) =>
      dangerous ? lighten(0.05, danger) : secondary};
  }
`

export default ({ community, content }: Props) => {
  const { name, work, description, created_at } = community
  const { username } = useSelector(({ user }: State) => user)
  const moderator = username === community.created_by
  const poster = `${process.env.API_URL}/c/${name}/poster`
  const fileRef = useRef() as MutableRefObject<HTMLInputElement>
  const uploadFile = async () => {
    const url = `${process.env.API_URL}/c/${community.name}/update_poster`
    const poster = fileRef.current.files![0]
    const body = new FormData()
    body.append('poster', poster)
    const request = new Request(url, {
      method: 'PATCH',
      credentials: 'include',
      body
    })
    const response = await fetch(request)
    location.reload()
  }
  return (
    <>
      <Header />
      <Container>
        <div className="root">
          <div className="posts">{content}</div>
          <div className="info">
            <div className="poster">
              {moderator && (
                <>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".png,.jpg,.jpeg,.gif"
                    onChange={uploadFile}
                    hidden
                  />
                  <ChangePoster onClick={() => fileRef.current.click()} />
                </>
              )}
            </div>
            {moderator && (
              <OptionsContainer>
                <Link href="/c/[...post]" as={`/c/${name}/edit`}>
                  <Option>
                    <FaEdit />
                  </Option>
                </Link>
                <Option dangerous>
                  <FaTrash />
                </Option>
              </OptionsContainer>
            )}
            <About
              work={work}
              name={name}
              description={description}
              created_at={created_at}
            />
          </div>
        </div>
        <style jsx>
          {`
            .root {
              display: grid;
              grid-template-columns: 1fr 20rem;
              gap: 1rem;
            }
            .info {
              display: grid;
              gap: 0.5rem;
              grid-template-rows: 29rem auto 1fr;
            }
            .poster {
              width: 20rem;
              height: 29rem;
              border-radius: 3px;
              background-color: white;
              background-image: url(${poster});
              background-size: cover;
              position: relative;
            }
          `}
        </style>
      </Container>
    </>
  )
}
