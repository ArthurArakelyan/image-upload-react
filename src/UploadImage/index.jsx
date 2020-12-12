import React from 'react';
import Header from '../Header';
import UploadImageButton from './UploadImageButton';
import UploadedImage from './UploadedImage';
import {nanoid} from 'nanoid';

import styles from './styles.module.css';

class UploadImage extends React.Component {
  state = {
    images: []
  }

  handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const name = e.target.files[0].name;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;

        this.setState(prevState => {
          return {
            ...prevState,
            images: [...prevState.images, {
              id: nanoid(),
              src: result,
              name
            }]
          }
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleDelete = (id) => {
    const newimages = this.state.images.filter(image => id !== image.id);

    this.setState(prevState => {
      return {
        ...prevState,
        images: newimages
      }
    });
  }

  render() {
    return (
      <div className={styles.upload__image}>
        <Header>
          <UploadImageButton
            handleUpload={this.handleUpload}
          />
        </Header>
        <div className={styles.uploaded__images}>
          {this.state.images.map(image => {
            return (
              <UploadedImage
                key={image.id}
                id={image.id}
                src={image.src}
                alt={image.id}
                name={image.name}
                handleDelete={this.handleDelete}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default UploadImage;
