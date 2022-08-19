import * as API from '../service/service';
import { mapper } from '../service/mapper';
import { Application } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import LoaderSpinner from './Loader/Loader';
import Modal from './Modal/Modal';
import { useState } from 'react';
import { useEffect } from 'react';

export default function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getImages = () => {
      if (!searchQuery) {
        return;
      }
      setError(false);
      setIsLoading(true);

      API.getImages({ searchQuery, page })
        .then(response => {
          setImages(prevImages => [...prevImages, ...mapper(response)]);
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
  }, [page, searchQuery]);

  const onChangeName = query => {
    if (searchQuery === query) {
      return;
    }
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const clickLoadMore = e => {
    e.preventDefault();
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
        searchQuery !== 1 && <p>No found image</p>
      )}
      {isLoading && <LoaderSpinner />}
      {images.length >= 12 && <Button onClick={clickLoadMore} />}
      {showModal && (
        <Modal
          onClose={modalClose}
          imageModal={largeImage.largeImageURL}
        ></Modal>
      )}
    </Application>
  );
}
