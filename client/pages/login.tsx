import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Header from '@components/Header'
import StandardInput from '@components/Input'
import { setLogin } from '@actions/auth'
import { setUserInfo } from '@actions/user'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import PublicRoute from '@components/PublicRoute'
import Button from '@components/Button'
import StandardContainer from '@components/Container'
import Error from '@components/Error'

const Input = StandardInput.withComponent(Field)

const Container = styled(StandardContainer)`
  display: grid;
  height: calc(100vh - 7rem);
  gap: 1rem;
  grid-template-rows: 1fr auto 1fr;
`

const StyledForm = styled(Form)`
  display: grid;
  gap: 0.5rem;
  padding: 0 20rem;
`

const validationSchema = Yup.object({
  username: Yup.string().required().min(3),
  password: Yup.string().min(8).required()
})

export default () => (
  <PublicRoute>
    <NextSeo
      title="Login - drspoiler"
      description="Login to your account and start posting spoilers"
    />
    <Header />
    <LoginForm />
  </PublicRoute>
)

const LoginForm = () => {
  const dispatch = useDispatch()
  const route = useRouter()
  const initialValues = {
    username: '',
    password: ''
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true)
        const url = process.env.API_URL
        const response = await fetch(`${url}/login`, {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.status === 401) {
          return actions.setErrors({
            username: 'Incorrect username or password'
          })
        }
        const info = await response.json()
        dispatch(setUserInfo(info))
        dispatch(setLogin())
        route.push('/dashboard')
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Container>
          <div></div>
          <StyledForm>
            {touched.username && errors.username && (
              <Error>{errors.username}</Error>
            )}
            {touched.password && errors.password && (
              <Error>{errors.password}</Error>
            )}
            <Input name="username" type="text" placeholder="Username" />
            <Input name="password" type="password" placeholder="Password" />
            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </StyledForm>
          <div></div>
        </Container>
      )}
    </Formik>
  )
}
