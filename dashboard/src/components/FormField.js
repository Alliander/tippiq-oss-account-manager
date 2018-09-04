/**
 * Field component.
 * @module components/Field
 */

import React from 'react';
import { Field } from 'redux-form'
import PropTypes from 'prop-types';

const renderField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error, warning },
  ...rest
}) => (
  <div className={`form-group ${(touched && ( error || warning )) && 'has-error'}`}>
    { label && <label htmlFor={input.id}>{label}</label> }
    <input {...input}
      {...rest}
      type={type}
      placeholder={placeholder}
      className="form-control"
    />
    { touched && error && <div className="text-danger">{error}</div> }
    { touched && warning && <div className="text-danger">{warning}</div> }
  </div>
)

/**
 * Register form component class.
 * @function Field
 * @param {Object} props Component properties.
 * @param {Object} props.field Field data.
 * @param {string} props.label Label of the field.
 * @param {string} props.type Type of the field.
 * @param {string} props.placeholder Placeholder of the field.
 * @param {string} props.disabled Disabled state of the field.
 * @returns {string} Markup of the field component.
 */
const FormField = ({ name, placeholder, type, ...rest }) =>
  (
    <Field
      name={name}
      type={type}
      placeholder={placeholder || name}
      component={renderField}
      className="form-control"
      {...rest}
    />
  )

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
FormField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default FormField;
