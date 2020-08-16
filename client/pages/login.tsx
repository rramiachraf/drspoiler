import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Header from '@components/Header'
import StandardInput from '@components/Input'
import { primary } from '@colors'
import { setLogin } from '@actions/auth'

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
    <Header />
    <LoginForm />
  </>
)

const LoginForm = () => {
  const dispatch = useDispatch()
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
        dispatch(setLogin())
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
