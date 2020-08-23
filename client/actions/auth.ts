import { Dispatch } from 'redux'
import { NextRouter } from 'next/router'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const setLogin = () => ({
  type: LOGIN
})

export const setLogout = () => ({
  type: LOGOUT
})

export const setLogoutAsync = (route: NextRouter) => {
  return async (dispatch: Dispatch) => {
    const url = `${process.env.API_URL}/logout`
    const request = new Request(url, { method: 'POST', credentials: 'include' })
    const { status } = await fetch(request)
    if (status === 200) {
      route.replace('/')
      dispatch(setLogout())
    }
  }
}
