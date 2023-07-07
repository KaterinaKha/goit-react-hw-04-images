import PropTypes from 'prop-types';
import css from './Error.module.css';

export const Error = ({ error }) => {
  return (
    <>
      <h2 className={css.error}>{error}</h2>
    </>
  );
};

Error.propTypes = {
  error: PropTypes.string.isRequired,
};
