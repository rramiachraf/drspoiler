export const SET_USER_INFO = 'SET_USER_INFO'

interface Info {
  username: string
}

export const setUserInfo = (info: Info) => ({
  type: SET_USER_INFO,
  info
})
