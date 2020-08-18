import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { darken } from 'polished'
import { useSelector } from 'react-redux'
import { Comment, State } from '@types'
import relativeTime from '@helpers/relativeTime'
import { secondary, darkGray, tertiary, lightGreenGray, danger } from '@colors'
import Button from '@components/Button'
import Card from '@components/Card'

const DeleteButton = styled(Button)`
  font-size: 1rem;
  padding: 0 1rem;
  background: ${danger};
  margin: 0 0.3rem;
  &:hover,
  &:active {
    background: ${darken(0.1, danger)};
  }
`

const Commented = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  font-size: 1.2rem;
  color: ${secondary};
  font-weight: 500;
  margin-bottom: 0.5rem;
`

const Options = styled.div`
  justify-self: flex-end;
`

interface AuthorProps {
  op: boolean
}

const Author = styled.span`
  cursor: pointer;
  ${({ op }: AuthorProps) =>
    op === true &&
    css`
      &::after {
        content: 'OP';
        background: ${tertiary};
        color: white;
        padding: 0.1rem 0.5rem;
        border-radius: 100px;
        font-size: 1rem;
        margin-left: 0.2rem;
        text-transform: uppercase;
      }
    `}
`

const Text = styled.p`
  font-size: 1.4rem;
  color: ${darkGray};
  white-space: pre-line;
`

interface SingleCommentProps {
  comment: Comment
  op: boolean
  deleteComment: (a: number, b: number) => void
}

export default ({ comment, op, deleteComment }: SingleCommentProps) => {
  const {
    username,
    post_id,
    text,
    comment_id,
    created_at,
    updated_at
  } = comment

  const stateUsername = useSelector(({ user }: State) => user.username)
  return (
    <Card>
      <Commented>
        <div>
          <Author op={op}>u/{username}</Author>
          <span>&#8226;</span>
          <span>
            {relativeTime(created_at)} {created_at !== updated_at && '(edited)'}
          </span>
        </div>
        <Options>
          {stateUsername === username && (
            <DeleteButton onClick={() => deleteComment(comment_id, post_id)}>
              Delete
            </DeleteButton>
          )}
        </Options>
      </Commented>
      <Text>{text}</Text>
      <style jsx>{`
        span {
          margin: 0 0.3rem;
        }
      `}</style>
    </Card>
  )
}
