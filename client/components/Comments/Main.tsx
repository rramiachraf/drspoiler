import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import AddComment from '../AddComment'
import SingleComment from './SingleComment'
import { removeCommentAsync } from '@actions/comments'
import { Comment, State } from '@types'
import { primary, darkGray, lightGreenGray, lightShadow } from '@colors'
import Card from '../Card'

interface Props {
  comments: Comment[]
  op: string
}

const CommentsBox = styled(Card)`
  display: grid;
  gap: 0.3rem;
  h2 {
    color: ${primary};
    text-transform: uppercase;
  }
`

const Empty = styled.p`
  font-size: 1.5rem;
  color: ${darkGray};
  text-align: center;
  font-weight: 500;
`

export default ({ comments, op }: Props) => {
  const dispatch = useDispatch()
  const logged = useSelector(({ logged }: State) => logged)
  const deleteComment = (comment_id: number, post_id: number) => {
    dispatch(removeCommentAsync(comment_id, post_id))
  }
  return (
    <CommentsBox>
      <h2>Comments</h2>
      {logged === true && <AddComment />}
      {comments.length === 0 && logged !== null && (
        <Empty>No comments yet.</Empty>
      )}
      {comments.map(comment => (
        <SingleComment
          key={comment.comment_id}
          comment={comment}
          deleteComment={deleteComment}
          op={comment.username === op}
        />
      ))}
    </CommentsBox>
  )
}
