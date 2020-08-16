import { GetServerSideProps } from 'next'
import Head from 'next/head'
import ErrorPage from '../404'
import PostContainer from '@components/Post'
import CommunityLayout from '@components/CommunityLayout'
import NewPost from '@components/NewPost'
import { Community, Post } from '@types'

interface Props {
  community: Community
  communityStatus: number
  postsStatus: number
  posts: Post[]
}

const CommunityPage = ({ community, communityStatus, posts }: Props) => {
  const { name } = community
  if (communityStatus === 404) {
    return <ErrorPage />
  }
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <CommunityLayout
        community={community}
        content={
          <div className="root">
            <NewPost />
            {posts.length > 0 &&
              posts.map(
                ({
                  post_id,
                  title,
                  author,
                  created_at,
                  body,
                  url_slug,
                  no_comment
                }) => (
                  <PostContainer
                    key={post_id}
                    post_id={post_id}
                    title={title}
                    author={author}
                    created_at={created_at}
                    body={body}
                    no_comments={no_comment}
                    url_slug={url_slug}
                  />
                )
              )}
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

  const communityResponse = await fetch(`${url}/c/${params?.community}`)
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
