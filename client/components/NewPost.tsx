import styled from '@emotion/styled'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Button from './Button'
import StandardInput from './Input'
import { primary } from '@colors'
import { State } from '@types'
import { addPostAsync } from '@actions/posts'
import { useRouter } from 'next/router'
import Card from './Card'

const validationSchema = Yup.object({
  title: Yup.string().required('This field is required'),
  body: Yup.string()
})

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
  transition: 0.3s background ease;
  &:hover {
    border: 2px solid transparent;
    color: white;
    background: ${primary};
  }
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
    <Card>
      {!visible && <ShowForm onClick={handleToggleVisible}>Add Post</ShowForm>}
      {visible && <AddPostForm />}
    </Card>
  )
}

const AddPostForm = () => {
  const dispatch = useDispatch()
  const community = useRouter().query.community as string
  const initialValues = {
    title: '',
    body: ''
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        dispatch(addPostAsync(community!, values, actions))
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
            <Button disabled={isSubmitting} type="submit">Post</Button>
          </StyledForm>
        </>
      )}
    </Formik>
  )
}
