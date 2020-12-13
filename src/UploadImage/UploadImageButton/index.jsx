import React from 'react';

import styles from './styles.module.css';

class UploadImageButton extends React.Component {
  render() {
    return (
      <button className={styles.upload__image_button} onClick={this.props.handleModalOpen}>+</button>
    );
  }
}

export default UploadImageButton;
