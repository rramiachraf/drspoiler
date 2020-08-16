import { GetServerSideProps } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import CommunityLayout from '@components/CommunityLayout'
import Comments from '@components/Comments/Main'
import { Post, Community, Comment, State } from '@types'
import ErrorPage from '../404'
import {
  primary,
  secondary,
  darkGray,
  lightGreenGray,
  lightShadow
} from '@colors'
import relativeTime from '@helpers/relativeTime'
import { setComments } from '@actions/comments'

interface Props {
  post: Post
  community: Community
  comments: Comment[]
}

export default ({ post, community, comments: preComments }: Props) => {
  const dispatch = useDispatch()
  const comments = useSelector(({ comments }: State) => comments)
  useEffect(() => {
    dispatch(setComments(preComments))
  }, [])
  if (post.error) {
    return <ErrorPage />
  }
  return (
    <>
      <Head>
        <title>
          {post.title} : {community.name}
        </title>
      </Head>
      <CommunityLayout
        community={community}
        content={
          <div className="root">
            <PostPreview post={post} />
            <Comments comments={comments} op={post.author} />
            <style jsx>{`
              .root {
                display: grid;
                gap: 0.5rem;
              }
            `}</style>
          </div>
        }
      />
    </>
  )
}

interface PostPreviewProps {
  post: Post
}

const PostPreview = ({ post }: PostPreviewProps) => {
  const { title, body, author, community, created_at } = post
  return (
    <div className="root">
      <div className="posted">
        <Link href="/c/[community]" as={`/c/${community}`}>
          <span className="bold">c/{community}</span>
        </Link>{' '}
        &#8226; Posted by <span className="bold">u/{author}</span>{' '}
        <span title={new Date(created_at).toDateString()}>
          {relativeTime(created_at)}
        </span>
      </div>
      <h2 className="title">{title}</h2>
      <p className="body">{body}</p>
      <style jsx>{`
        .root {
          background: white;
          display: grid;
          gap: 0.3rem;
          padding: 1rem;
          border-radius: 3px;
          border: 1px solid ${lightGreenGray};
          box-shadow: 0 0 2px ${lightShadow};
        }
        .title {
          font-size: 2rem;
          color: ${primary};
        }
        .body {
          font-size: 1.4rem;
          line-height: 2rem;
          color: ${darkGray};
        }
        .posted {
          font-size: 1.2rem;
          color: ${secondary};
        }
        .posted > span.bold {
          font-weight: 500;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const url = process.env.API_URL
  const [c, , p] = params?.post as string[]
  const postResponse = await fetch(`${url}/c/${c}/p/${p}`)
  const post: Post = await postResponse.json()
  const communityResponse = await fetch(`${url}/c/${c}`)
  const community: Community = await communityResponse.json()

  const commentsResponse = await fetch(`${url}/p/${p}/comments`)
  const comments: Comment[] = await commentsResponse.json()

  return {
    props: {
      post,
      community,
      comments
    }
  }
}
