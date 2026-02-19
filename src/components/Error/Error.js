import React from 'react';
import PropTypes from 'prop-types';
import './Error.css';

const Error = ({ message }) => (
  <div className="error-state" role="alert">
    <p className="error-message">{message}</p>
  </div>
);

Error.propTypes = {
  message: PropTypes.string,
};

Error.defaultProps = {
  message: 'Something went wrong. Please try again.',
};

export default Error;
