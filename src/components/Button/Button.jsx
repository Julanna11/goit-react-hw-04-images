import PropTypes from 'prop-types';
import { ButtonLoad } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <ButtonLoad type="button" onClick={onClick}>
      Load more
    </ButtonLoad>
  );
};
export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
