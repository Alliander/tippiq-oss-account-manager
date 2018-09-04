import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { 
    Alert,
    Button,
    FormGroup, 
    Glyphicon,
    InputGroup,
} from 'react-bootstrap'

import FormField from '../components/FormField'

import { searchUserRoutine } from '../routines'
class SearchUser extends Component {
  render() {
    const { searchUser, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(searchUserRoutine)}>
        <FormGroup>
          <InputGroup>
            <FormField name='email' type='email' placeholder='E-mailadres' />
            <InputGroup.Button>
              <Button type='submit'><Glyphicon glyph='search' /></Button>
            </InputGroup.Button>
          </InputGroup>
          {searchUser.error && <Alert bsStyle="warning">{searchUser.error.message}</Alert>}
        </FormGroup>
      </form>
    )
  }
}

SearchUser.propTypes = {}

export default connect(
  ({ searchUser }) => ({ searchUser }),
)(reduxForm({ form: 'searchUser' })(SearchUser))
