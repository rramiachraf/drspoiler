import { useRouter } from 'next/router'
import Loading from '@components/Loading'
import useLoggedStatus from 'hooks/useLoggedStatus'
import { ReactNode, ReactElement } from 'react'

interface Props {
  children: any
}

export default ({ children }: Props): ReactElement => {
  const logged = useLoggedStatus()
  const route = useRouter()

  if (logged === null) {
    return <Loading />
  }

  if (logged === false) {
    route.push('/login')
    return <Loading />
  }

  return children
}
