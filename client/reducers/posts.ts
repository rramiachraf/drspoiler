import { SET_POSTS, ADD_POST } from '@actions/posts'
import { Post } from '@types'

interface SetPostAction {
  type: typeof SET_POSTS
  posts: Post[]
}

interface AddPostAction {
  type: typeof ADD_POST
  post: Post
}

type Action = SetPostAction | AddPostAction

export default (state = [], action: Action) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts
    case ADD_POST:
      return [action.post, ...state]
    default:
      return state
  }
}
