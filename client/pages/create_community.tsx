import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Field, Form, Formik } from 'formik'
import Header from '@components/Header'
import Button from '@components/Button'
import InputComponent from '@components/Input'
import { State } from '@types'
import { primary } from '@colors'

const CreateCommunity = styled(Form)`
  text-align: center;
  padding: 1rem 50rem;
  display: grid;
  gap: 1rem;
  h1 {
    color: ${primary};
    font-size: 2.5rem;
    text-transform: uppercase;
  }
`

const Input = InputComponent.withComponent(Field)
const Textarea = styled(Input)`
  height: auto;
  resize: none;
`

export default () => {
  const route = useRouter()
  const logged = useSelector(({ logged }: State) => logged)
  if (logged === false) {
    route.replace('/login')
  }
  return (
    <>
      <Header />
      {logged === true && (
        <Formik
          initialValues={{ name: '', work: '', description: '' }}
          onSubmit={async values => {
            const url = `${process.env.API_URL}/c`
            const request = new Request(url, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(values)
            })
            const { status } = await fetch(request)
            if (status === 201) {
              route.push('/c/[community]', `/c/${values.name}`)
            }
          }}
        >
          <CreateCommunity>
            <h1>Create A Community</h1>
            <Input placeholder="Name" name="name" />
            <Input placeholder="Work" name="work" />
            <Textarea
              placeholder="Description"
              as="textarea"
              name="description"
            />
            <Button type="submit">Let's Go</Button>
          </CreateCommunity>
        </Formik>
      )}
    </>
  )
}
