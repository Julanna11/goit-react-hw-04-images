import * as API from '../service/service';
import { mapper } from '../service/mapper';
import { Application } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonLoad from './Button/Button';
import LoaderSpinner from './Loader/Loader';
import Modal from './Modal/Modal';
import { useState } from 'react';
import { useEffect } from 'react';

export default function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [searchQuery, setsearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [per_page] = useState(12);

  useEffect(() => {
    const getImages = () => {
      if (!searchQuery) {
        return;
      }
      setError(false);
      setIsLoading(true);

      API.getImages({ searchQuery, page })
        .then(response => {
          setImages([...mapper(response)]);
        })
        .catch(error => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);

          if (page > 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
        });
    };
    getImages();
  }, [page, searchQuery, error]);

  const onChangeName = searchQuery => {
    setsearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const clickLoadMore = e => {
    e.preventDefault();
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const modalClose = () => {
    setShowModal(!showModal);
  };

  const onClickLargeImage = imageModal => {
    setLargeImage(imageModal);
    modalClose();
  };

  return (
    <Application>
      <Searchbar onSubmit={onChangeName}></Searchbar>
      {images.length !== 0 ? (
        <ImageGallery images={images} onOpenModal={onClickLargeImage} />
      ) : (
        searchQuery !== '' && <p>No found image</p>
      )}
      {isLoading && <LoaderSpinner />}
      {images.length >= 12 && <ButtonLoad onClick={clickLoadMore} />}
      {showModal && (
        <Modal
          onClose={modalClose}
          imageModal={largeImage.largeImageURL}
        ></Modal>
      )}
    </Application>
  );
}
