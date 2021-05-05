import PropTypes from 'prop-types';
import './css/Error.scss';

export default function Error({ kaomoji, msg }) {
  return (
    <div className="error-container">
      <p className="error-kaomoji">{kaomoji}</p>
      <p className="error-msg">{msg}</p>
    </div>
  );
}

Error.propTypes = {
  kaomoji: PropTypes.string,
  msg: PropTypes.string,
};

Error.defaultProps = {
  kaomoji: '( ᵒ̴̶̷̥́ _ᵒ̴̶̷̣̥̀ )',
  msg: 'error',
};
