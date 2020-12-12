import React from 'react';

import styles from './styles.module.css';

class UploadImageButton extends React.Component {
  render() {
    return (
      <label className={styles.upload__image_button}>
        <input type="file" className={styles.upload__image_input} onChange={this.props.handleUpload} />
        +
      </label>
    );
  }
}

export default UploadImageButton;
