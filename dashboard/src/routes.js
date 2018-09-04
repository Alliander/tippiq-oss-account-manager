import React from 'react'
import { BrowserRouter, Route } from 'react-router'
import App from './containers/App'
// import UserPage from './containers/UserPage'
// import RepoPage from './containers/RepoPage'

export default (
  <BrowserRouter>
    <Route path="/" component={App}>
        {/*<Route path="/:login"
            component={UserPage} />
        <Route path="/:login/:name"
            component={RepoPage} />*/}
    </Route>
  </BrowserRouter>
)