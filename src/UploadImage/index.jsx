import React from 'react';
import Header from '../Header';
import UploadImageButton from './UploadImageButton';
import UploadedImage from './UploadedImage';
import UploadedImageZoom from './UploadedImageZoom';
import Modal from '../components/common/Modal';
import { nanoid } from 'nanoid';
import { Switch, Route } from 'react-router-dom';

import styles from './styles.module.css';

class UploadImage extends React.Component {
  state = {
    modalIsOpen: false,
    imgShow: false,
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
        modalIsOpen: true,
        imgShow: false
      }
    });
  }

  handleModalClose = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        modalIsOpen: false,
        imgShow: false
      }
    });
  }

  handleModalSubmit = () => {
    this.setState(prevState => {
      if (prevState.creatingImage.src && prevState.creatingImage.name) {
        return {
          ...prevState,
          images: [...prevState.images, this.state.creatingImage],
          modalIsOpen: false,
          imgShow: false
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

  handleModalImageShow = () => {
    setTimeout(() => {
      this.setState(prevState => {
        return {
          ...prevState,
          imgShow: true
        }
      });
    }, 60);
  }

  handleModalUploadImage = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].size <= 10000000) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.handleModalImageShow();
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
    } else {
      alert('No more 10MB');
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
        <Switch>
          <div className={styles.upload__image}>
            <Route exact path='/'>
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
            </Route>
            {this.state.images.map(image => {
              const { id } = image;

              return (
                <Route
                  key={id}
                  path={`/${id}`}
                  render={() => <UploadedImageZoom
                    src={image.src}
                    id={id}
                  />}
                />
              );
            })}
          </div>
        </Switch>
        {<Modal
          modalIsOpen={this.state.modalIsOpen}
          handleModalClose={this.handleModalClose}
          handleModalSubmit={this.handleModalSubmit}
          handleModalChange={this.handleModalChange}
          handleModalUploadImage={this.handleModalUploadImage}
          imgShow={this.state.imgShow}
          modalImage={this.state.creatingImage.src}
          modalImageId={this.state.creatingImage.id}
        />}
      </>
    );
  }
}

export default UploadImage;
