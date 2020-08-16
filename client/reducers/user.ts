import { SET_USER_INFO } from '@actions/user'

interface SetUserAction {
  type: typeof SET_USER_INFO
  info: object
}

type Action = SetUserAction

export default (state = {}, action: Action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return action.info
    default:
      return state
  }
}
