import styled from '@emotion/styled'
import { NextSeo } from 'next-seo'
import { primary } from '@colors'
import Header from '@components/Header'
import Container from '@components/Container'
import Snippet from '@components/CommunitySnippet'
import { GetServerSideProps } from 'next'
import { Community } from '@types'
import ProtectedRoute from '@components/ProtectedRoute'

const Title = styled.h1`
  color: ${primary};
  text-align: center;
  font-size: 2.5rem;
  margin: 1rem 0;
`

const Main = styled.div`
  display: grid;
  gap: 0.5rem;
  padding: 0 10rem;
`

interface Props {
  communities: Community[]
}

export default ({ communities }: Props) => (
  <ProtectedRoute>
    <NextSeo title="Dashboard" noindex={true} />
    <Header />
    <Container>
      <Main>
        <Title>Explore Communities</Title>
        {communities.map(community => (
          <Snippet key={community.community_id} community={community} />
        ))}
      </Main>
    </Container>
  </ProtectedRoute>
)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const url = `${process.env.API_URL}/communities`
  const response = await fetch(url, {
    headers: { Cookie: req.headers.cookie! }
  })
  const communities: Community[] = await response.json()
  if (response.status === 200) {
    return { props: { communities } }
  }
  return { props: { communities: [] } }
}
