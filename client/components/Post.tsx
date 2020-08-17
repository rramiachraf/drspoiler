import { darken } from 'polished'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  primary,
  secondary,
  lightGreenGray,
  lightShadow,
  mediumGray
} from '@colors'
import relativeTime from '@helpers/relativeTime'

interface Props {
  post_id: number
  title: string
  body: string
  author: string
  url_slug: string
  no_comments: number
  created_at: string
}

export default ({
  post_id,
  title,
  body,
  author,
  url_slug,
  created_at,
  no_comments
}: Props) => {
  const { community } = useRouter().query
  const url = `/c/${community}/p/${post_id}/${url_slug}`
  return (
    <div className="root">
      <div className="post">
        <span className="posted">
          Posted by <span className="author">{author}</span>{' '}
          {relativeTime(created_at)}
        </span>
        <Link href={'/c/[...post]'} as={url}>
          <h1 className="title">{title}</h1>
        </Link>
        <p className="body">
          {body && body.slice(0, 300)}
          {body && body.length > 300 && '...'}
        </p>
      </div>
      <p>{no_comments}</p>
      <style jsx>{`
        .root {
          padding: 1rem;
          border: 1px solid ${lightGreenGray};
          margin-bottom: 0.3rem;
          border-radius: 3px;
          background: white;
          box-shadow: 0 0 2px ${lightShadow};
        }
        .post {
          display: grid;
          grid-template-rows: auto auto auto;
          gap: 0.3rem;
        }
        .title {
          color: ${primary};
          cursor: pointer;
          font-size: 1.8rem;
          margin-bottom: 0.3rem;
        }
        .author {
          font-size: 1.3rem;
          text-transform: uppercase;
          font-weight: 500;
          cursor: pointer;
        }
        .posted {
          font-size: 1.2rem;
          color: ${secondary};
        }
        .body {
          font-size: 1.2rem;
          color: ${darken(0.2, mediumGray)};
        }
      `}</style>
    </div>
  )
}
