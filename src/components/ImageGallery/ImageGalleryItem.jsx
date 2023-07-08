import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGalleryItem = ({ image, onOpenModal }) => {
  const onImageClick = () => {
    onOpenModal(image.largeImageURL);
  };

  return (
    <li className={css.ImageGalleryItem} key={image.id} onClick={onImageClick}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={css.ImageGalleryItemImg}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onOpenModal: PropTypes.func,
};
