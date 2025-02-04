import PropTypes from 'prop-types';

import Button from './Button';
import Modal from './Modal';

const ErrorModal = props =>
{
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p style={{ color: 'black' }}>{props.error}</p>
    </Modal>
  );
};

ErrorModal.propTypes = {
  error: PropTypes.string,
  onClear: PropTypes.func,
};

export default ErrorModal;
