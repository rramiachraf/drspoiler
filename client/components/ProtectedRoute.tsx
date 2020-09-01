import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Loading from '@components/Loading'
import { State } from '@types'
import useLoggedStatus from 'hooks/useLoggedStatus'

interface Props {
  page: any
}

export default ({ page: Page }: Props) => {
  const logged = useLoggedStatus()
  const route = useRouter()
  console.log(logged)

  if (logged === null) {
    return <Loading />
  }

  if (logged === false) {
    route.push('/login')
    return <Loading />
  }

  return <Page />
}
