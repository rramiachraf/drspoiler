import { LOGIN, LOGOUT } from '@actions/auth'

interface LoginAction {
  type: typeof LOGIN
}

interface LogoutAction {
  type: typeof LOGOUT
}

type Action = LoginAction | LogoutAction

export default (state = null, action: Action) => {
  switch (action.type) {
    case LOGIN:
      return true
    case LOGOUT:
      return false
    default:
      return state
  }
}
