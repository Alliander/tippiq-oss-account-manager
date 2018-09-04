/**
 * DeleteUserResult component.
 * @module containers/DeleteUserResult
 */

import React, {Component} from 'react'
import {Alert} from 'react-bootstrap'
import {connect} from 'react-redux'

/**
 * DeleteUser form component class.
 * @function DeleteUser
 * @param {Object} props Component properties.
 * @param {Object} props.fields Fields for the form.
 * @param {Function} props.handleSubmit Submit form handler.
 * @param {String} props.errorMessage Error message.
 *
 * @returns {string} Markup of the component.
 */
class DeleteUserResult extends Component {
  render() {
    console.log({_component: 'DeleteUserResult', props: this.props})
    const {id, results, success, loading} = this.props
    return (
      <div>
        {loading && <Alert bsStyle="info">Verwijderen</Alert>}
        {(success && !loading) && (
          <Alert bsStyle="success">
            Verwijderd
            <dl className='dl-horizontal'>
              <dt>Id</dt>
              <dd>{id}</dd>
              <dt>Account</dt>
              <dd><input type='checkbox' checked={results.id > 0} disabled /></dd>
              <dt>Huis</dt>
              <dd><input type='checkbox' checked={results.places > 0} disabled /></dd>
              <dt>Buurt</dt>
              <dd><input type='checkbox' checked={results.hood > 0} disabled /></dd>
            </dl>
          </Alert>
        )}
      </div>
    )
  }
}

export default connect(({
  deleteUser
}) => ({...deleteUser}))(DeleteUserResult)
