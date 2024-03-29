import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import ErrorPage from '../404'
import PostContainer from '@components/Post'
import CommunityLayout from '@components/CommunityLayout'
import NewPost from '@components/NewPost'
import { Community, Post, State } from '@types'
import { setPosts } from '@actions/posts'

interface Props {
  community: Community
  communityStatus: number
  postsStatus: number
  posts: Post[]
}

const CommunityPage = ({
  community,
  communityStatus,
  posts: prePosts
}: Props) => {
  const dispatch = useDispatch()
  const posts = useSelector((state: State) => state.posts)

  const { name, work, description } = community

  if (communityStatus === 404) {
    return <ErrorPage />
  }

  useEffect(() => {
    dispatch(setPosts(prePosts))
  }, [])

  return (
    <>
      <NextSeo
        title={`${work} - drspoiler`}
        description={`c/${name}: ${description.slice(0, 120)}${
          description.length > 120 && '...'
        }`}
      />
      <CommunityLayout
        community={community}
        content={
          <div className="root">
            <NewPost />
            {posts.length > 0 &&
              posts.map(post => (
                <PostContainer
                  key={post.post_id}
                  post={post}
                  community={community.name}
                />
              ))}
            <style jsx>{`
              .root {
                display: grid;
                grid-template-rows: auto 1fr;
                gap: 1rem;
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

  const communityResponse = await fetch(
    `${url}/c/${params?.community}?limit=10`
  )
  const community: Community = await communityResponse.json()

  const postsResponse = await fetch(`${url}/c/${params?.community}/posts`)
  const posts: Post[] = await postsResponse.json()

  return {
    props: {
      community,
      posts,
      communityStatus: communityResponse.status,
      postsStatus: postsResponse.status
    }
  }
}

export default CommunityPage
