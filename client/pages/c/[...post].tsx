import { GetServerSideProps } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Head from 'next/head'
import CommunityLayout from '@components/CommunityLayout'
import Comments from '@components/Comments/Main'
import ErrorPage from '../404'
import { setComments } from '@actions/comments'
import PostPreview from '@components/Post'
import { Post, Community, Comment, State } from '@types'

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
            <PostPreview post={post} full={true} community={community.name} />
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
