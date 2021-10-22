import './App.css';
import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import api from './services/gallery-api';
import Loader from './components/Loader/Loader';
// import fetchImages from './services/gallery-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    imageName: null,
    images: [],
    status: Status.IDLE,
    page: 1,
    selectedImage: null,
    error: null,
    showModal: false,
  };

  // async componentDidUpdate(prevProps, prevState) {
  //   const { imageName } = this.state;

  //   if (prevState.imageName !== imageName) {
  //     try {
  //       const images = await fetchImages(imageName);

  //       if (images.length === 0) {
  //         toast.error(`Oops, we did not find such picture as ${imageName}`);
  //       }


  //       this.setState({ status: Status.RESOLVED });
  //       // this.setState({ images });
  //       this.setState(prevState => ({images: [...prevState.images, ...images],
  //         page: prevState.page + 1,}));
        
  //     } catch (error) {
  //       this.setState({ status: Status.REJECTED });
  //       console.log('ErRoR', error);
  //     }
  //   }

  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // }

  componentDidUpdate(prevProps, prevState) {
    const { status, imageName,images, page } = this.state;
    if (status === Status.RESOLVED && images.length === 0) {
        toast.error(`Oops, we did not find such picture as ${imageName}`);
        this.setState({ status: Status.IDLE });
    }

    if (status === Status.PENDING) {
        api
        .fetchImages(imageName, page)
        .then(newImages => this.setState(prevState => ({
            images: [...prevState.images, ...newImages],
            status: Status.RESOLVED,
        })))
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }

    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
    });
}

  handleFormSubmit = imageName => {
    // this.setState({ imageName });
    // this.setState({ status: Status.PENDING });

    if (imageName.trim() !== '') {
      this.setState({status: Status.PENDING})
        this.setState({imageName})
  }

  if (this.state.imageName !== imageName) {
      this.setState({
          images: [],
          page: 1,
      })
   }
  }


// handleFormSubmit = (value) => {
//   if (value.trim() !== '') {
//       this.setState({
//           imageName: value,
//           status: Status.PENDING,
//       })
//   }

//   if (this.state.imageName !== value) {
//       this.setState({
//           images: [],
//           page: 1,
//       })
          
//   }
// }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  clickImages = selectedImage => {
    this.setState({ selectedImage });
    this.toggleModal();
  };

  handleLoadMoreBtnClick = () => {
    this.setState(prevState => ({
        page: prevState.page + 1,
        status: Status.PENDING,
    }))
}

  render() {
    const { images, status, showModal, selectedImage} = this.state;
    const { handleFormSubmit, clickImages, toggleModal, handleLoadMoreBtnClick} = this;
    return (
      <div className="App">
        <Searchbar onSearch={handleFormSubmit} />
        <Toaster position="top-right" />
        <ImageGallery images={images} onModal={clickImages} />
        {status === Status.RESOLVED && (
          <Button type="button" onClick={handleLoadMoreBtnClick}>
            Load more
          </Button>
        )}

        {showModal && (
          <Modal onModal={toggleModal}>
            <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
          </Modal>
        )}

        {status === Status.PENDING && <Loader />}
      </div>
    );
  }
}

export default App;
