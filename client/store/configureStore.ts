import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import comments from '../reducers/comments'
import logged from '../reducers/logged'
import user from '../reducers/user'

interface newWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}

declare const window: newWindow

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk, logger)
  // other store enhancers if any
)

export default () =>
  createStore(combineReducers({ comments, logged, user }), enhancer)
