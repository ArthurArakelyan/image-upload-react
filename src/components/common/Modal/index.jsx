import React from 'react';
import ReactModal from 'react-modal';

import styles from './styles.module.css';
import './responsive.css';

ReactModal.setAppElement('#root');

class Modal extends React.Component {
  state = {
    validInput: true
  }

  isValidInput = (e) => {
    this.setState(prevState => {
      return {
        ...prevState,
        validInput: e.target.value ? true : false
      }
    });
  }

  render() {
    return (
      <ReactModal
        closeTimeoutMS={500}
        isOpen={this.props.modalIsOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={this.props.handleModalClose}
        style={
          {
            content: { color: 'black', width: '500px', height: 'fit-content', margin: '170px auto', padding: '0' }
          }
        }
      >
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>Create Image</h2>
          <span
            className={styles.modal__close}
            onClick={this.props.handleModalClose}
          >
            &times;
          </span>
        </div>
        <div className={styles.modal__body}>
          <form className={styles.modal__form}>
            <input
              className={styles.modal__form_name}
              onChange={this.props.handleModalChange}
              onInput={this.isValidInput}
              style={{ borderColor: this.state.validInput ? '#007BFF' : 'red' }}
              autoFocus={true}
              type="text"
              name="name"
              placeholder="Name..."
            />
            {!this.props.modalImage &&
              <label
                className={styles.modal__form_image_label}
                onChange={this.props.handleModalUploadImage}>
                <input className={styles.modal__form_image_input} type="file" />
                Upload Image
              </label>
            }
          </form>
          {this.props.modalImage &&
            <div className={styles.modal__img_container}>
              <img
                src={this.props.modalImage}
                alt={this.props.modalImageId}
                className={`${styles.modal__img} ${this.props.imgShow ? styles.modal__img_opened : null}`}
              />
              <label
                className={`${styles.modal__img_change} ${this.props.imgShow ? styles.modal__img_change_opened : null}`}
                onChange={this.props.handleModalUploadImage}>
                <input className={styles.modal__form_image_input} type="file" />
                Change
              </label>
            </div>
          }
        </div>
        <div className={styles.modal__footer}>
          <button
            className={`${styles.modal__button} ${styles.modal__save}`}
            onClick={this.props.handleModalSubmit}
          >
            Save
          </button>
          <button
            className={`${styles.modal__button} ${styles.modal__closeBtn}`}
            onClick={this.props.handleModalClose}
          >
            Close
          </button>
        </div>
      </ReactModal>
    );
  }
}

export default Modal;
