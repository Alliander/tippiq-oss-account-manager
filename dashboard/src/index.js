import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import { createLogger } from 'redux-logger'

import createSagaMiddleware, { END } from 'redux-saga'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import reducers from './reducers'
import sagas from './sagas'
import App from './containers/App'
import { profileRoutine } from './routines'

const history = createHistory()

const sagaMiddleware = createSagaMiddleware()

const noop = store => next => action => next(action)

export default function configureStore(initialState) {

  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
    }),
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
        createLogger(),
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : noop(),
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}

const store = configureStore(window.__INITIAL_STATE__);

sagaMiddleware.run(sagas)

store.dispatch(profileRoutine.trigger())

ReactDOM.render(
  <Provider store={store}>
    <div>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App} /> 
      </div> 
    </ConnectedRouter> 
    </div>
  </Provider>,
  document.getElementById('root')
)
