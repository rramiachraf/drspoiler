import { GetServerSideProps } from 'next'
import Head from 'next/head'
import styled from '@emotion/styled'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { User, Post, State } from '@types'
import Header from '@components/Header'
import Container from '@components/Container'
import Card from '@components/Card'
import { setLogoutAsync } from '@actions/auth'
import dayjs from 'dayjs'
import { primary, darkGray } from '@colors'
import Error from '../404'
import PostPreview from '@components/Post'
import Button from '@components/Button'

interface Props {
  user: User
  posts: Post[]
}

interface InfoProps {
  logged: boolean | null
}

const Profile = styled.div`
  display: grid;
  grid-template-columns: 1fr 20rem;
  gap: 1rem;
`

const Info = styled(Card)`
  display: grid;
  height: ${({ logged }: InfoProps) => (logged ? '25rem' : '20rem')};
  align-items: center;
  justify-content: center;
  text-align: center;
  h4 {
    font-size: 1.5rem;
    color: ${darkGray};
  }
  small {
    font-size: 1.2rem;
    color: ${darkGray};
  }
`

const UnknownUser = styled(FaUserCircle)`
  font-size: 15rem;
  color: ${primary};
`

const Posts = styled.div`
  display: grid;
  gap: 0.3rem;
`

export default ({ user, posts }: Props) => {
  const { username, no_posts, join_date } = user
  if (!username) {
    return <Error />
  }
  const route = useRouter()
  const dispatch = useDispatch()
  const logged = useSelector(({ logged }: State) => logged)
  const logout = () => {
    dispatch(setLogoutAsync(route))
  }
  const joined = dayjs(new Date(join_date)).format('MMMM YYYY')
  return (
    <>
      <Head>
        <title>{username}</title>
      </Head>
      <Header />
      <Container>
        <Profile>
          <Posts>
            {posts.map(post => (
              <PostPreview
                key={post.post_id}
                post={post}
                community={post.community}
                profile={true}
              />
            ))}
          </Posts>
          <Info logged={logged}>
            <UnknownUser />
            <h4>u/{username}</h4>
            <small>Joined {joined}</small>
            {logged === true && <Button onClick={logout}>Logout</Button>}
          </Info>
        </Profile>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { username } = params!
  const userURL = `${process.env.API_URL}/u/${username}`
  const postsURL = `${userURL}/posts`
  const userResponse = await fetch(userURL)
  const user = await userResponse.json()
  const postsResponse = await fetch(postsURL)
  const posts = await postsResponse.json()
  return {
    props: {
      user,
      posts
    }
  }
}