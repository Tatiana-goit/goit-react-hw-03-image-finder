import './App.css';
import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
// import Modal from './components/Modal/Modal';
// import Button from './components/Button/Button';
import api from './services/gallery-api';

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
    page: 1,
    selectedImage:null,
    status: Status.IDLE,
    error: null,
}

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

  }

  searchbarInputValueHandler = value => {
    if (value.trim() !== '') {
      this.setState({
        imageName: value,
        status: Status.PENDING,
      });
    }

    if (this.state.imageName !== value) {
      this.setState({
        images: [],
        page: 1,
      });
    }
  };

  handleSelectImage = data => {
    this.setState({ selectedImage: data, });  
}

  render() {
    return (
      <div className="App">
        <Searchbar onClick={this.searchbarInputValueHandler} />
        <Toaster />
        <ImageGallery images={this.state.images} onSelect={this.handleSelectImage}/>

      </div>
    );
  }
}

export default App;
