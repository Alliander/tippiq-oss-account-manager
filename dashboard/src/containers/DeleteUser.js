/**
 * DeleteUser form component.
 * @module containers/DeleteUser
 */

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import FormSubmit from '../components/FormSubmit'
import {deleteUserRoutine as routine} from '../routines'

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
class DeleteUser extends Component {
  render() {
    console.log({_component: 'DeleteUser', props: this.props})
    const {className, handleSubmit, submitting} = this.props
    return (
      <form className={classnames(className)} onSubmit={handleSubmit(routine)}>
        <input type='hidden' name='id'/>
        <FormSubmit submitting={submitting}>Delete</FormSubmit>
      </form>
    )
  }
}

DeleteUser.propTypes = {
  className: PropTypes.any,
}

const DeleteUserForm = reduxForm({form: 'deleteUser'})(DeleteUser)

export default connect(({
  deleteUser,
  searchUser: {
    user: {
      id
    }
  }
}, {className}) => ({className, initialValues: {id} }))(DeleteUserForm)
