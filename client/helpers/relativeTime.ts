import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const makeTimeRelative = (time: string) => {
  return dayjs().to(new Date(time))
}

export default makeTimeRelative
