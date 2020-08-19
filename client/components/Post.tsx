import { darken } from 'polished'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { primary, secondary, mediumGray, darkGray } from '@colors'
import relativeTime from '@helpers/relativeTime'
import Card from './Card'
import { Post } from '@types'

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
`

const Title = styled.h2`
  color: ${primary};
  cursor: pointer;
  font-size: ${({ full }: EmotionProps) => (full ? '2rem' : '1.8rem')};
`

const Author = styled.span`
  font-size: 1.3rem;
  cursor: pointer;
  background: ${secondary};
  color: white;
  padding: 0 0.5rem;
  /* border-top-right-radius: 100px;
  border-bottom-right-radius: 100px; */
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
  background: ${primary};
  color: white;
  padding: 0 0.5rem;
  font-size: 1.3rem;
  cursor: pointer;
  /* border-top-left-radius: 100px;
  border-bottom-left-radius: 100px; */
`

export default ({ post, full, community, profile }: Props) => {
  const { post_id, title, body, author, url_slug, created_at } = post
  const url = `/c/${community}/p/${post_id}/${url_slug}`
  const profileURL = `/u/${author}`
  return (
    <Card>
      <PostContainer>
        <Posted>
          {profile && (
            <Link href="/c/[community]" as={`/c/${community}`}>
              <Community title={`c/${community}`}>{community}</Community>
            </Link>
          )}
          <Link href="/u/[username]" as={profileURL}>
            <Author title={`u/${author.toLowerCase()}`}>{author}</Author>
          </Link>{' '}
          <span title={new Date(created_at).toDateString()}>
            {relativeTime(created_at)}
          </span>
        </Posted>
        <Link href={'/c/[...post]'} as={url}>
          <Title full={full}>{title}</Title>
        </Link>
        <Body full={full}>{body}</Body>
      </PostContainer>
    </Card>
  )
}
