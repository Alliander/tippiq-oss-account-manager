/**
 * Logout form component.
 * @module components/Logout
 */

import React, { Component } from 'react'
import { reduxForm  } from 'redux-form'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import FormSubmit from '../components/FormSubmit'

import { logoutRoutine }  from '../routines'

/**
 * Logout form component class.
 * @function Logout
 * @param {Object} props Component properties.
 * @param {Object} props.fields Fields for the form.
 * @param {Function} props.handleSubmit Submit form handler.
 * @param {String} props.errorMessage Error message.
 *
 * @returns {string} Markup of the component.
 */
class Logout extends Component {
  render() {
    const { className, handleSubmit, submitting } = this.props
    return (
      <form className={classnames(className)} onSubmit={handleSubmit(logoutRoutine)}>
        {/*<FormField style={{display: 'none'}} name='noop' type='text' />*/}
        <FormSubmit submitting={submitting}>Uitloggen</FormSubmit>
      </form>
    )
  }
}

Logout.propTypes = {
  className: PropTypes.any,
}

export default reduxForm({
  form: 'logout',
})(Logout)
