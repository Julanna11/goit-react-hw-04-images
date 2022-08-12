import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ largeImageURL, webformatURL, onOpenModal }) => {
  return (
    <GalleryItem>
      <GalleryImage
        src={webformatURL}
        alt=""
        onClick={() => onOpenModal({ largeImageURL })}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
