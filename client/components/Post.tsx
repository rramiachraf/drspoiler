import { darken } from 'polished'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { primary, secondary, mediumGray, darkGray, danger } from '@colors'
import relativeTime from '@helpers/relativeTime'
import Card from './Card'
import { Post, State } from '@types'
import Button from './Button'

interface Props {
  post: Post
  full?: boolean | undefined
  profile?: boolean | undefined
  community: string
}

interface EmotionProps {
  full: boolean | undefined
}

const PostContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 0.3rem;
`

const Posted = styled.span`
  font-size: 1.2rem;
  color: ${secondary};
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const DeleteArea = styled.div`
  display: grid;
  justify-content: flex-end;
  align-items: center;
`

const DeleteButton = styled(Button)`
  font-size: 1rem;
  padding: 0 1rem;
  background: ${danger};
  margin: 0 0.3rem;
  &:hover,
  &:active {
    background: ${darken(0.1, danger)};
  }
`

const Title = styled.h1`
  color: ${primary};
  cursor: ${({ full }: EmotionProps) => (full ? 'text' : 'pointer')};
  font-size: ${({ full }: EmotionProps) => (full ? '2rem' : '1.8rem')};
`

const Author = styled.span`
  font-size: 1.3rem;
  cursor: pointer;
  background: ${primary};
  color: white;
  padding: 0 0.8rem;
`

const Body = styled.p`
  font-size: ${({ full }: EmotionProps) => (full ? '1.4rem' : '1.2rem')};
  ${({ full }: EmotionProps) =>
    full &&
    css`
      white-space: pre-line;
    `}
  color: ${({ full }: EmotionProps) =>
    full ? darkGray : darken(0.2, mediumGray)};
  line-height: ${({ full }: EmotionProps) => full && '2rem'};
`

const Community = styled.span`
  background: ${secondary};
  color: white;
  padding: 0 0.8rem;
  font-size: 1.3rem;
  cursor: pointer;
`

export default ({ post, full, community, profile }: Props) => {
  const route = useRouter()
  const { username } = useSelector(({ user }: State) => user)
  const { post_id, title, body, author, url_slug, created_at } = post
  const url = `/c/${community}/p/${post_id}/${url_slug}`
  const profileURL = `/u/${author}`
  const deletePost = async () => {
    const deleted = `${process.env.API_URL}/c/${community}/p/${post_id}`
    const request = new Request(deleted, {
      method: 'DELETE',
      credentials: 'include'
    })
    const { status } = await fetch(request)
    if (status === 200) {
      route.push('/c/[community]', `/c/${community}`)
    }
  }
  return (
    <Card>
      <PostContainer>
        <Posted>
          <div>
            {profile && (
              <Link href="/c/[community]" as={`/c/${community}`}>
                <Community title={`c/${community}`}>{community}</Community>
              </Link>
            )}
            {!profile && <Link href="/u/[username]" as={profileURL}>
              <Author title={`u/${author.toLowerCase()}`}>{author}</Author>
            </Link>}{' '}
            <span title={new Date(created_at).toDateString()}>
              {relativeTime(created_at)}
            </span>
          </div>
          {full === true && author === username && (
            <DeleteArea>
              <DeleteButton onClick={deletePost}>Delete</DeleteButton>
            </DeleteArea>
          )}
        </Posted>
        {!full ? (
          <Link href={'/c/[...post]'} as={url}>
            <Title full={full}>{title}</Title>
          </Link>
        ) : (
          <Title full={full}>{title}</Title>
        )}
        <Body full={full}>{body}</Body>
      </PostContainer>
    </Card>
  )
}
