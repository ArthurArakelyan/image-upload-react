import React from 'react';
import Header from '../Header';
import UploadImageButton from './UploadImageButton';
import UploadedImage from './UploadedImage';
import Modal from '../components/common/Modal';
import { nanoid } from 'nanoid';

import styles from './styles.module.css';

class UploadImage extends React.Component {
  state = {
    modalIsOpen: false,
    creatingImage: {},
    images: []
  }

  handleModalOpen = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        creatingImage: {
          id: nanoid(),
          src: '',
          name: ''
        },
        modalIsOpen: true
      }
    });
  }

  handleModalClose = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        modalIsOpen: false,
        creatingImage: {}
      }
    });
  }

  handleModalSubmit = () => {
    this.setState(prevState => {
      if(prevState.creatingImage.src && prevState.creatingImage.name) {
        return {
          ...prevState,
          images: [...prevState.images, this.state.creatingImage],
          creatingImage: {},
          modalIsOpen: false
        }
      }
    });
  }

  handleModalChange = (e) => {
    this.setState(prevState => {
      return {
        ...prevState,
        creatingImage: {
          ...prevState.creatingImage,
          name: e.target.value
        }
      }
    });
  }

  handleModalUploadImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState(prevState => {
          return {
            ...prevState,
            creatingImage: {
              ...prevState.creatingImage,
              src: e.target.result
            }
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
      <>
        <div className={styles.upload__image}>
          <Header>
            <UploadImageButton
              handleModalOpen={this.handleModalOpen}
            />
          </Header>
          <div className={styles.uploaded__images}>
            {this.state.images.map(image => {
              return (
                <UploadedImage
                  key={image.id}
                  id={image.id}
                  src={image.src}
                  name={image.name}
                  handleDelete={this.handleDelete}
                />
              );
            })}
          </div>
        </div>
        {this.state.modalIsOpen && <Modal
          modalIsOpen={this.state.modalIsOpen}
          handleModalClose={this.handleModalClose}
          handleModalSubmit={this.handleModalSubmit}
          handleModalChange={this.handleModalChange}
          handleModalUploadImage={this.handleModalUploadImage}
          modalImage={this.state.creatingImage.src}
          modalImageId={this.state.creatingImage.id}
        />}
      </>
    );
  }
}

export default UploadImage;
