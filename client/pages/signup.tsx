import PublicRoute from '@components/PublicRoute'
import { NextSeo } from 'next-seo'
import Header from '@components/Header'
import { Formik, Form as UnStyledForm, Field } from 'formik'
import StandardInput from '@components/Input'
import Button from '@components/Button'
import StandardContainer from '@components/Container'
import styled from '@emotion/styled'
import { primary, danger } from '@colors'
import Error from '@components/Error'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

export default () => (
  <PublicRoute>
    <NextSeo
      title="Sign up - drspoiler"
      description="Join us and start spreading spoilers"
    />
    <Header />
    <SignUpForm />
  </PublicRoute>
)

const Container = styled(StandardContainer)`
  display: grid;
  height: calc(100vh - 7rem);
  gap: 1rem;
  grid-template-rows: 1fr auto 1fr;
`

const Form = styled(UnStyledForm)`
  display: grid;
  gap: 0.5rem;
  padding: 0 20rem;
`

const Input = StandardInput.withComponent(Field)

const SignUpForm = () => {
  const route = useRouter()
  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required().min(3),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8)
      })}
      onSubmit={async (values, { resetForm, setErrors }) => {
        const url = `${process.env.API_URL}/signup`
        const request = new Request(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
        const response = await fetch(request)
        if (response.status === 201) {
          resetForm()
          route.push('/dashboard')
        }
        const body = await response.json()
        switch (body.error) {
          case 'username is taken':
            setErrors({ username: 'username is taken' })
          case 'email is taken':
            setErrors({ email: 'email is taken' })
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Container>
          <div></div>
          <Form>
            {touched.username && errors.username && (
              <Error>{errors.username}</Error>
            )}
            {touched.email && errors.email && <Error>{errors.email}</Error>}
            {touched.password && errors.password && (
              <Error>{errors.password}</Error>
            )}
            <Input name="username" type="text" placeholder="Username" />
            <Input name="email" type="text" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />
            <Button disabled={isSubmitting} type="submit">
              Create Account
            </Button>
          </Form>
          <div></div>
        </Container>
      )}
    </Formik>
  )
}
