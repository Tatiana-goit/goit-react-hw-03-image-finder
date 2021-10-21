import './App.css';
import { Component } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
import Searchbar from './components/Searchbar/Searchbar';
// import ImageGallery from './components/ImageGallery/ImageGallery';
import axios from 'axios';
// import Modal from './components/Modal/Modal';
// import Button from './components/Button/Button';
// import api from './services/gallery-api';

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
    selectedImage:null,
    error: null,
}


async componentDidUpdate(prevProps, prevState) {
    const API_KEY = '21768835-de3419a52772d349dcef7b4fc';
    if (prevState.imageName !== this.state.imageName) {
      
      const {data}= await axios.get( `https://pixabay.com/api/?q=${this.state.imageName}&page=${1}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      console.log(data.hits);
      this.setState({images: data.hits})
     }
  }
  

  // componentDidUpdate(prevProps, prevState) {
  //   const { status, imageName,images, page } = this.state;
  //   if (status === Status.RESOLVED && images.length === 0) {
  //       toast.error(`Oops, we did not find such picture as ${imageName}`);
  //       this.setState({ status: Status.IDLE });
  //   }

  //   if (status === Status.PENDING) {
  //       api
  //       .fetchImages(imageName, page)
  //       .then(newImages => this.setState(prevState => ({
  //           images: [...prevState.images, ...newImages],
  //           status: Status.RESOLVED,
  //       })))
  //       .catch(error => this.setState({ error, status: Status.REJECTED }));
  //   }
  // }

  handleFormSubmit = imageName => {
    this.setState({imageName})
  }

   

  handleSelectImage = data => {
    this.setState({ selectedImage: data, });  
}

  render() {
    return (
      <div className="App">
        <Searchbar onSearch={this.handleFormSubmit} />
        {/* <Toaster /> */}
        {/* <ImageGallery images={this.state.images} onSelect={this.handleSelectImage}/> */}

      </div>
    );
  }
}

export default App;
