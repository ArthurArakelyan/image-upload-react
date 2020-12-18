import React from 'react';

import styles from './styles.module.css';

class UploadImageZoom extends React.Component {
  render() {
    return (
      <div className={styles.big__image_container}>
        <img className={styles.big__image} src={this.props.src} alt={this.props.id} />
      </div>
    );
  }
}

export default UploadImageZoom;
