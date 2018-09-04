import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Navbar, Nav} from 'react-bootstrap'

import LoginForm from './LoginForm'
import Logout from './Logout'
import SearchUser from './SearchUser'
import ManageUser from './ManageUser'
import DeleteUserResult from './DeleteUserResult'

class App extends Component {
  render() {
    const {profile, userLoaded, serviceProviders} = this.props
    const loggedIn = profile.success;
    console.log({_component: 'App', serviceProviders})
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Tippiq Account Manager
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            {!loggedIn && <LoginForm className='navbar-form'/>}
            {loggedIn && <Logout className='navbar-form'/>}
          </Nav>
            {loggedIn && profile.user.roles.length > 0 &&
              <Navbar.Text pullRight>
                <strong>Rollen</strong> {profile.user.roles.join(',')}
              </Navbar.Text>}
            {loggedIn &&
              <Navbar.Text pullRight>
                <strong>User</strong> {profile.user.email}
              </Navbar.Text>}
        </Navbar>
        {loggedIn && (
          <main className='well'>
            <SearchUser/>
            {userLoaded && (<ManageUser/>)}
            <DeleteUserResult />
          </main>
        )}
        {/* TODO
            - show policies
            - show places
            - show subscriptions
            - delete user
            - send email
            */}
      </div>
    )
  }
}

export default connect(({
  profile,
  searchUser: {
    serviceProviders,
    user,
    loading: userLoading,
    success: userSuccess
  }
}) => ({
  profile,
  userLoaded: !userLoading && userSuccess,
  user,
  serviceProviders
}),)(App)
