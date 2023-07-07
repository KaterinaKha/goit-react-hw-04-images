import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        // console.log(image)
        <ImageGalleryItem
          key={image.id}
          image={image}
          onOpenModal={onOpenModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
