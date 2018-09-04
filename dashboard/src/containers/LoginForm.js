/**
 * Login form component.
 * @module components/LoginForm
 */

import React, { Component } from 'react'
import { reduxForm  } from 'redux-form'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Nbsp from 'react-nbsp'

import FormField from '../components/FormField'
import FormSubmit from '../components/FormSubmit'

import { loginRoutine }  from '../routines'

/**
 * Login form component class.
 * @function LoginForm
 * @param {Object} props Component properties.
 * @param {Object} props.fields Fields for the form.
 * @param {Function} props.handleSubmit Submit form handler.
 * @param {String} props.errorMessage Error message.
 *
 * @returns {string} Markup of the component.
 */
class LoginForm extends Component {
  render() {
    const { handleSubmit, submitting, className } = this.props
    return (
      <form className={classnames(className)} onSubmit={handleSubmit(loginRoutine)}>
        <FormField name='email' type='email' placeholder='E-mailadres' />
        <Nbsp />
        <FormField name='password' type='password' placeholder='Wachtwoord' />
        <Nbsp />
        <FormSubmit submitting={submitting}>Inloggen</FormSubmit>
      </form>
    )
  }
}

LoginForm.propTypes = {
  className: PropTypes.any,
}

export default reduxForm({
  form: 'login',
})(LoginForm)
