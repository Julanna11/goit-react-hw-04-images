import { Component } from 'react';
import * as API from '../service/service';
import { mapper } from '../service/mapper';
import { Application } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonLoad from './Button/Button';
import LoaderSpinner from './Loader/Loader';
import { Modal } from './Modal/Modal';

class App extends Component {
  state = {
    page: 1,
    images: [],
    searchQuery: '',
    isLoading: false,
    largeImage: '',
    showModal: false,
    error: null,
    per_page: 12,
  };

  componentDidUpdate(_, { searchQuery, page }) {
    if (searchQuery !== this.state.searchQuery || page !== this.state.page) {
      this.getImages();
    }

    if (this.state.page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  onChangeName = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.setState({
      searchQuery,
      page: 1,
      images: [],
    });
  };

  clickLoadMore = e => {
    e.preventDefault();
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  modalClose = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickLargeImage = imageModal => {
    this.setState({ largeImage: imageModal });
    this.modalClose();
  };

  getImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });

    API.getImages({ searchQuery, page })
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...mapper(response)],
        }));
      })
      .catch(error => this.setState({ error: error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  setisLoading = value => {
    this.setState({ isLoading: value });
  };

  render() {
    const { images, showModal, isLoading, largeImage, searchQuery } =
      this.state;

    return (
      <Application>
        <Searchbar onSubmit={this.onChangeName}></Searchbar>
        {images.length !== 0 ? (
          <ImageGallery images={images} onOpenModal={this.onClickLargeImage} />
        ) : (
          searchQuery !== '' && <p>No found image</p>
        )}
        {isLoading && <LoaderSpinner />}
        {images.length >= 12 && <ButtonLoad onClick={this.clickLoadMore} />}
        {showModal && (
          <Modal
            onClose={this.modalClose}
            imageModal={largeImage.largeImageURL}
          ></Modal>
        )}
      </Application>
    );
  }
}
export default App;
