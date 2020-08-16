import dayjs from 'dayjs'
import { primary, secondary, darkGray } from '../styles/colors'
import Link from 'next/link'

interface Props {
  work: string
  name: string
  description: string
  created_at: string
}

export default ({ work, name, description, created_at }: Props) => {
  const createdAt = dayjs(new Date(created_at)).format('MMM DD, YYYY')
  return (
    <div className="root">
      <Link href="/c/[community]" as={`/c/${name}`}>
        <h2 className="work">{work}</h2>
      </Link>
      <h3 className="community">c/{name}</h3>
      <p className="description">{description}</p>
      <h5 className="date">Created {createdAt}</h5>
      <style jsx>{`
        .root {
          display: grid;
          gap: 0.5rem;
          border: 1px solid ${secondary};
          padding: 1rem;
          border-radius: 3px;
          background: white;
        }
        .work {
          font-size: 2rem;
          color: ${primary};
          cursor: pointer;
        }
        .community {
          font-size: 1.3rem;
          color: ${secondary};
        }
        .description {
          font-size: 1.4rem;
          margin: 0.5rem 0;
          color: ${darkGray};
        }
        .date {
          font-size: 1.2rem;
          font-weight: 500;
          color: ${darkGray};
        }
      `}</style>
    </div>
  )
}
