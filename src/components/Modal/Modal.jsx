import React from 'react';
import css from './Modal.module.css';

export class Modal extends React.Component {
  handleKeyClick = e => {
    if (e.key === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyClick);
  }

  render() {
    const { imgURL, onCloseModal } = this.props;
    return (
      <div className={css.Overlay} onClick={this.handleOverlayClick}>
        <div className={css.Modal} onCloseModal={onCloseModal}>
          <img src={imgURL} alt="" />
        </div>
      </div>
    );
  }
}
