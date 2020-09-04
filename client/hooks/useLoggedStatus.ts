import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLogin, setLogout } from '@actions/auth'
import { State } from '@types'
import { setUserInfo } from '@actions/user'

const useLoggedStatus = () => {
  const logged = useSelector(({ logged }: State) => logged)
  const dispatch = useDispatch()

  const checkStatus = async (url: string) => {
    const request = new Request(url, { credentials: 'include' })
    const response = await fetch(request)
    const { status } = response
    if (status === 200) {
      const body = await response.json()
      dispatch(setLogin())
      dispatch(setUserInfo(body))
    } else {
      dispatch(setLogout())
    }
  }

  useEffect(() => {
    const url = `${process.env.API_URL}/logged`
    checkStatus(url)
  }, [])

  return logged
}

export default useLoggedStatus
