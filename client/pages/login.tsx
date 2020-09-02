import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Header from '@components/Header'
import StandardInput from '@components/Input'
import { primary } from '@colors'
import { setLogin } from '@actions/auth'
import { setUserInfo } from '@actions/user'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

const Input = StandardInput.withComponent(Field)

const StyledForm = styled(Form)`
  height: calc(100vh - 5rem);
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`

const validationSchema = Yup.object({
  username: Yup.string().required('This field is required'),
  password: Yup.string().min(6).required('This field is required')
})

export default () => (
  <>
    <NextSeo
      title="Login - drspoiler"
      description="Login to your account and start posting spoilers"
    />
    <Header />
    <LoginForm />
  </>
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
      {({ isSubmitting, errors }) => (
        <div>
          <StyledForm>
            <Input name="username" type="text" placeholder="Username" />
            <Input name="password" type="password" placeholder="Password" />
            <button className="button" type="submit" disabled={isSubmitting}>
              Login
            </button>
          </StyledForm>
          <style jsx>{`
            .button {
              width: 30rem;
              height: 5rem;
              background: ${primary};
              border: none;
              color: white;
              font-family: inherit;
              text-transform: uppercase;
              cursor: pointer;
              font-weight: 500;
              border-radius: 100px;
            }
          `}</style>
        </div>
      )}
    </Formik>
  )
}
