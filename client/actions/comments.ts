import { Dispatch } from 'redux'
import { Comment } from '../types'

export const SET_COMMENTS = 'SET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export const setComments = (comments: Comment[]) => ({
  type: SET_COMMENTS,
  comments
})

export const addComment = (comment: Comment) => ({
  type: ADD_COMMENT,
  comment
})

export const addCommentAsync = (post: string, text: string) => {
  return async (dispatch: Dispatch) => {
    const url = `${process.env.API_URL}/p/${post}/comment`
    const options: RequestInit = {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, options)
    const newComment = await response.json()
    if (response.status === 201) {
      dispatch(addComment(newComment))
    }
  }
}

export const removeComment = (comment_id: number) => ({
  type: REMOVE_COMMENT,
  comment_id
})

export const removeCommentAsync = (comment: number, post: number) => {
  return async (dispatch: Dispatch) => {
    const url = `${process.env.API_URL}/p/${post}/comment/${comment}`
    const options: RequestInit = {
      credentials: 'include',
      method: 'DELETE'
    }
    const { status } = await fetch(url, options)
    if (status === 200) {
      dispatch(removeComment(comment))
    }
  }
}
