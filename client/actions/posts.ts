import { Dispatch } from 'redux'
import { FormikHelpers } from 'formik'
import { Post } from '@types'

export const SET_POSTS = 'SET_POSTS'
export const ADD_POST = 'ADD_POST'

export const setPosts = (posts: Post[]) => ({
  type: SET_POSTS,
  posts
})

export const addPost = (post: Post) => ({
  type: ADD_POST,
  post
})

interface AddPostBody {
  title: string
  body: string
}

export const addPostAsync = (
  community: string,
  body: AddPostBody,
  { resetForm }: FormikHelpers<{ title: string; body: string }>
) => {
  return async (dispatch: Dispatch) => {
    const url = `${process.env.API_URL}/c/${community}/p`
    const request = new Request(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const response = await fetch(request)
    if (response.status === 201) {
      resetForm()
      const post: Post = await response.json()
      dispatch(addPost(post))
    }
  }
}
