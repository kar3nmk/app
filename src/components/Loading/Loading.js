import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css';

const Loading = ({ message }) => (
  <div className="loading" role="status" aria-live="polite">
    <div className="loading-spinner" aria-hidden="true" />
    <p className="loading-message">{message}</p>
  </div>
);

Loading.propTypes = {
  message: PropTypes.string,
};

Loading.defaultProps = {
  message: 'Loading...',
};

export default Loading;
