import dayjs from 'dayjs'
import Link from 'next/link'
import styled from '@emotion/styled'
import { primary, secondary, darkGray } from '@colors'
import Card from './Card'

const StyledCard = styled(Card)`
  display: grid;
  gap: 0.5rem;
`

interface Props {
  work: string
  name: string
  description: string
  created_at: string
}

export default ({ work, name, description, created_at }: Props) => {
  const createdAt = dayjs(new Date(created_at)).format('MMM DD, YYYY')
  return (
    <StyledCard>
      <Link href="/c/[community]" as={`/c/${name}`}>
        <h2 className="work">{work}</h2>
      </Link>
      <h3 className="community">c/{name}</h3>
      <p className="description">{description}</p>
      <h5 className="date">Created {createdAt}</h5>
      <style jsx>{`
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
    </StyledCard>
  )
}
