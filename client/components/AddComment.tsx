import { useState, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import Button from './Button'
import { darkGray, lightGreenGray } from '../styles/colors'
import { FormEvent } from 'react'
import { addCommentAsync } from '../actions/comments'

const AddComment = styled.form`
  display: grid;
  gap: 0.5rem;
  margin: 1rem 0;
`

const Textarea = styled.textarea`
  padding: 1rem;
  resize: none;
  border-radius: 3px;
  color: ${darkGray};
  font-family: inherit;
  border: 2px solid ${lightGreenGray};
  font-size: 1.4rem;
  transition: 0.3s border;
`

export default () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [text, setText] = useState('')
  const changeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }
  const submitComment = async (e: FormEvent) => {
    e.preventDefault()
    const [, , post] = router.query.post as string[]
    if (text) {
      dispatch(addCommentAsync(post, text))
      setText('')
    }
  }
  return (
    <AddComment onSubmit={submitComment}>
      <Textarea value={text} onChange={changeTextHandler} />
      <Button>Add Comment</Button>
    </AddComment>
  )
}
