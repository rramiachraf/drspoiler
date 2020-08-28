import Head from 'next/head'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { Community, State } from '@types'
import { primary } from '@colors'
import Button from './Button'
import Header from './Header'
import Container from './Container'
import StandardInput from './Input'
import { Form, Formik, Field } from 'formik'
import ErrorPage from '../pages/404'
import { useRouter } from 'next/router'

interface EditCommunityProps {
  community: Community
}

const Main = styled(Form)`
  text-align: center;
  padding: 1rem 20%;
  display: grid;
  gap: 1rem;
  h1 {
    color: ${primary};
    font-size: 2.5rem;
    text-transform: uppercase;
  }
`

const Input = StandardInput.withComponent(Field)

const Textarea = styled(Input)`
  height: auto;
  resize: none;
`

export default ({ community }: EditCommunityProps) => {
  const route = useRouter()
  const { username } = useSelector(({ user }: State) => user)
  if (username === undefined) {
    return <Header />
  }
  if (username !== community.created_by) {
    return <ErrorPage />
  }
  return (
    <>
      <Head>
        <title>{community.name}: Edit</title>
      </Head>
      <Header />
      <Container>
        <Formik
          initialValues={{
            work: community.work,
            description: community.description
          }}
          onSubmit={async ({ work, description }) => {
            const url = `${process.env.API_URL}/c/${community.name}`
            const request = new Request(url, {
              method: 'PATCH',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ work, description })
            })
            const { status } = await fetch(request)
            if (status === 200) {
              route.push('/c/[community]', `/c/${community.name}`)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Main>
              <h1>Edit c/{community.name}</h1>
              <Input type="text" name="work" />
              <Textarea as="textarea" name="description" />
              <Button disabled={isSubmitting} type="submit">
                Save
              </Button>
            </Main>
          )}
        </Formik>
      </Container>
    </>
  )
}
