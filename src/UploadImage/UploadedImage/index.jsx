import React from 'react';

import styles from './styles.module.css';

class UploadedImage extends React.Component {
  render() {
    return (
      <div className={styles.image}>
        <button className={styles.image__delete} onClick={() => this.props.handleDelete(this.props.id)}>X</button>
        <p className={styles.image__name}>{this.props.name}</p>
        <img src={this.props.src} alt={this.props.id} className={styles.image__img}/>
      </div>
    );
  }
}

export default UploadedImage;
