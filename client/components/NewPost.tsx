import styled from '@emotion/styled'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Button from './Button'
import StandardInput from './Input'
import { lightGreenGray, lightShadow, primary } from '@colors'
import { State } from '@types'

const validationSchema = Yup.object({
  title: Yup.string().required('This field is required'),
  body: Yup.string()
})

const NewPost = styled.div`
  padding: 1rem;
  border: 1px solid ${lightGreenGray};
  background: white;
  border-radius: 3px;
  box-shadow: 0 0 2px ${lightShadow};
`

const Input = StandardInput.withComponent(Field)

const Textarea = styled(Input)`
  height: auto;
  background: white;
  resize: none;
`

const ShowForm = styled.div`
  text-align: center;
  border: 2px solid ${primary};
  padding: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  box-sizing: border-box;
  color: ${primary};
  font-weight: 500;
  border-radius: 3px;
`

const StyledForm = styled(Form)`
  display: grid;
  gap: 0.5rem;
`

export default () => {
  const [visible, toggleVisible] = useState(false)
  const logged = useSelector(({ logged }: State) => logged)
  const handleToggleVisible = () => {
    toggleVisible(!visible)
  }
  if (!logged) {
    return <></>
  }
  return (
    <NewPost>
      {!visible && <ShowForm onClick={handleToggleVisible}>Add Post</ShowForm>}
      {visible && <AddPostForm />}
    </NewPost>
  )
}

const AddPostForm = () => {
  const initialValues = {
    title: '',
    body: ''
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log(values)
      }}
    >
      {({ isSubmitting, errors }) => (
        <>
          <StyledForm>
            <Input name="title" placeholder="Title" type="text" />
            <Textarea
              as="textarea"
              name="body"
              placeholder="Body (Optional)"
              type="text"
            />
            <Button type="submit">Post</Button>
          </StyledForm>
        </>
      )}
    </Formik>
  )
}