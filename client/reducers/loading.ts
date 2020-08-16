import { COMMENT_LOADING } from '@actions/loading'

interface CommentLoadingAction {
  type: typeof COMMENT_LOADING
  state: boolean
}

type Action = CommentLoadingAction

export default (state = false, action: Action) => {
  switch (action.type) {
    case COMMENT_LOADING:
      return action.state
    default:
      return state
  }
}
