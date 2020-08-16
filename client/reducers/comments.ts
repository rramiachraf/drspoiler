import { SET_COMMENTS, ADD_COMMENT, REMOVE_COMMENT } from '../actions/comments'
import { Comment } from '../types'

interface SetAction {
  type: typeof SET_COMMENTS
  comments: Comment[]
}

interface AddAction {
  type: typeof ADD_COMMENT
  comment: Comment
}

interface RemoveAction {
  type: typeof REMOVE_COMMENT
  comment_id: number
}

type Action = SetAction | AddAction | RemoveAction

const comments = (state = [], action: Action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments
    case ADD_COMMENT:
      return [action.comment, ...state]
    case REMOVE_COMMENT:
      return state.filter(({ comment_id }) => comment_id !== action.comment_id)
    default:
      return state
  }
}

export default comments
