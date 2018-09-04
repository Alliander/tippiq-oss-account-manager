/**
 * FormSubmit component.
 * @module components/FormSubmit
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Register form component class.
 * @function FormSubmit
 * @param {Object} props Component properties.
 * @param {Object} props.id Button id.
 * @param {string} props.label Label of the button.
 * @param {string} props.submitting State of the form.
 * @param {string} props.className className to add to the button.
 */
const FormSubmit = ({ id = 'submit', children = 'Submit', submitting, className, ...rest }) =>
  (
    <button
      disabled={submitting}
      type='submit'
      id={id}
      className={`${className} btn btn-primary`}
      {...rest}
    >
      {children}
    </button>
  )

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
FormSubmit.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
  submitting: PropTypes.bool,
  className: PropTypes.string,
}

export default FormSubmit
