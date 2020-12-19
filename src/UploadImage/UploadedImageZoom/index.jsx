import React from 'react';

import { Link } from 'react-router-dom';

import styles from './styles.module.css';

class UploadImageZoom extends React.Component {
  render() {
    return (
      <Link to='/'>
        <div className={styles.big__image_container}>
          <img className={styles.big__image} src={this.props.src} alt={this.props.id} />
        </div>
      </Link>
    );
  }
}

export default UploadImageZoom;
