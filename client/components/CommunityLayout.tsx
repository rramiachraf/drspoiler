import Header from './Header'
import About from './About'
import { Community } from '@types'

interface Props {
  community: Community
  content?: any
}

export default ({ community, content }: Props) => {
  const { name, work, description, created_at } = community
  const poster = `${process.env.API_URL}/c/${name}/poster`
  return (
    <>
      <Header />
      <div className="root">
        <div className="posts">{content}</div>
        <div className="info">
          {poster && <div className="poster" />}
          <About
            work={work}
            name={name}
            description={description}
            created_at={created_at}
          />
        </div>
      </div>
      <style jsx>
        {`
          .root {
            padding: 1rem 10%;
            display: grid;
            grid-template-columns: 1fr 20rem;
            gap: 1rem;
          }
          .info {
            display: grid;
            gap: 0.5rem;
            grid-template-rows: 29rem auto 1fr;
          }
          .poster {
            width: 20rem;
            height: 29rem;
            border-radius: 3px;
            background-image: url(${poster});
            background-size: cover;
          }
        `}
      </style>
    </>
  )
}
