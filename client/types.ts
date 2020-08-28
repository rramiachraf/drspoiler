export interface Post {
  post_id: number
  title: string
  body: string
  no_comment: number
  url_slug: string
  created_at: string
  updated_at: string
  community: string
  author: string
  error?: string
}

export interface Community {
  name: string
  work: string
  description: string
  poster: string | null
  created_by: string
  created_at: string
}

export interface Comment {
  comment_id: number
  text: string
  username: string
  post_id: number
  created_at: string
  updated_at: string
}

export interface User {
  username: string
  user_id: number
  join_date: string
  no_posts: number
}

export interface State {
  comments: Comment[]
  logged: boolean | null
  user: User
  posts: Post[]
}
