import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

class UploadedImage extends React.Component {
  render() {
    return (
      <div className={styles.image}>
        <button className={styles.image__delete} onClick={() => this.props.handleDelete(this.props.id)}>X</button>
        <p className={styles.image__name}>{this.props.name}</p>
        <Link to={`/${this.props.id}`}>
          <img
            src={this.props.src}
            alt={this.props.id}
            className={styles.image__img}
          />
        </Link>
      </div>
    );
  }
}

export default UploadedImage;
