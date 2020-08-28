import styled from '@emotion/styled'
import StandardCard from './Card'
import { primary, secondary, darkGray } from '@colors'
import { Community } from '@types'
import { useRouter } from 'next/router'

const Card = styled(StandardCard)`
  display: grid;
  gap: 1rem;
  grid-template-columns: 10rem 1fr;
  cursor: pointer;
`

const Work = styled.h3`
  color: ${primary};
  font-size: 1.5rem;
`

const Name = styled.h5`
  color: ${secondary};
  font-size: 1.2rem;
`

const Description = styled.p`
  font-size: 1.3rem;
  color: ${darkGray};
`

interface PosterProps {
  poster: string
}

const Poster = styled.div`
  background: url(${({ poster }: PosterProps) => poster});
  border-radius: 3px;
  height: 6rem;
  background-size: cover;
  align-self: center;
`

interface Props {
  community: Community
}

export default ({ community }: Props) => {
  const route = useRouter()
  const visitCommunity = () => {
    route.push('/c/[community]', `/c/${community.name}`)
  }
  return (
    <Card onClick={visitCommunity}>
      <Poster poster={`${process.env.API_URL}/c/${community.name}/poster`} />
      <div>
        <Work>{community.work}</Work>
        <Name>c/{community.name}</Name>
        <Description>{community.description}</Description>
      </div>
    </Card>
  )
}
