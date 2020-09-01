import { NextSeo } from 'next-seo'
import styled from '@emotion/styled'
import Header from '@components/Header'
import Container from '@components/Container'
import { primary, secondary } from '@colors'
import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import StandardInput from '@components/Input'
import Button from '@components/Button'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { State } from '@types'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

const Settings = styled(Container)`
  display: grid;
  height: calc(100vh - 7rem);
  grid-template-rows: 4rem auto;
  gap: 1rem;
  padding: 1rem 30rem;
`

const Title = styled.ul`
  border-radius: 3px;
  color: white;
  font-size: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  list-style-type: none;
  font-weight: 500;
  display: grid;
  grid-template-columns: 1fr 1fr;
  li {
    border: 1px solid ${primary};
    cursor: pointer;
    padding: 1rem 2rem;
    background: ${secondary};
    transition: 0.3s background;
    &:hover {
      background: ${primary};
    }
  }
`

const Content = styled.div`
  /* border: 1px solid ${primary}; */
  /* display: grid;
  justify-content: center;
  align-items: center; */
`

enum OpenEnum {
  GENERAL = 'general',
  CHANGE_PASSWORD = 'change_password'
}

interface Props {
  username: string
  email: string
}

export default ({ username, email }: Props) => {
  const [open, setOpen] = useState('general')
  return (
    <>
      <NextSeo title="Settings" noindex={true} />
      <Header />
      <Settings>
        <Title>
          <li onClick={() => setOpen(OpenEnum.GENERAL)}>General</li>
          <li onClick={() => setOpen(OpenEnum.CHANGE_PASSWORD)}>
            Change Password
          </li>
        </Title>
        <Content>
          <Renderer data={{ username, email }} open={open} />
        </Content>
      </Settings>
    </>
  )
}

interface OpenProps {
  open: string
  data: Props
}

const Renderer = ({ open, data }: OpenProps) => {
  if (open === OpenEnum.GENERAL) {
    return <General username={data.username} email={data.email} />
  }

  if (open === OpenEnum.CHANGE_PASSWORD) {
    return <ChangePassword />
  }

  return <></>
}

const General = ({ email, username }: Props) => {
  const route = useRouter()
  return (
    <Formik
      initialValues={{ email, username }}
      onSubmit={async values => {
        const url = `${process.env.API_URL}/u/settings`
        const request = new Request(url, {
          method: 'PATCH',
          credentials: 'include',
          body: JSON.stringify(values),
          headers: {
            'content-type': 'application/json'
          }
        })
        const { status } = await fetch(request)
        if (status === 200) {
          route.push('/u/[username]', `/u/${values.username}`)
        }
      }}
    >
      {() => (
        <StyledForm>
          <Input name="username" />
          <Input name="email" />
          <Button type="submit">Save</Button>
        </StyledForm>
      )}
    </Formik>
  )
}

const StyledForm = styled(Form)`
  display: grid;
  gap: 0.5rem;
`

const Input = StandardInput.withComponent(Field)

const ChangePassword = () => {
  return (
    <Formik
      initialValues={{ password: '', cPassword: '' }}
      validationSchema={Yup.object({
        password: Yup.string().required('This field is required').min(8),
        cPassword: Yup.string().oneOf(
          [Yup.ref('password'), undefined],
          'Passwords must match'
        )
      })}
      onSubmit={async (values, { resetForm }) => {
        const url = `${process.env.API_URL}/u/update_password`
        const request = new Request(url, {
          method: 'PATCH',
          credentials: 'include',
          body: JSON.stringify(values),
          headers: {
            'Content-type': 'application/json'
          }
        })
        await fetch(request)
        resetForm()
      }}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <Input placeholder="Password" name="password" type="password" />
          <Input
            placeholder="Confirm Password"
            name="cPassword"
            type="password"
          />
          <Button disabled={isSubmitting} type="submit">
            Update Password
          </Button>
        </StyledForm>
      )}
    </Formik>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const url = `${process.env.API_URL}/u/settings`
  const response = await fetch(url, {
    headers: { Cookie: req.headers.cookie! }
  })
  const { username, email } = await response.json()
  return {
    props: { username, email }
  }
}
