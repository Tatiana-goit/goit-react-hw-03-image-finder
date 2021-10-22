import './App.css';
import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Loader from "react-loader-spinner";
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
// import Modal from './components/Modal/Modal';
// import Button from './components/Button/Button';
// import api from './services/gallery-api';
// import Loader from './components/Loader/Loader'
import fetchImages from './services/gallery-api';

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
  const {imageName} =this.state;

   if (prevState.imageName !== imageName) {
     try {
      const images = await fetchImages(imageName)

      if (images.length === 0) {
        toast.error(`Oops, we did not find such picture as ${imageName}`);
      }
      this.setState({status: Status.RESOLVED});
      this.setState({images});
     }
     catch (error) {
       this.setState({status: Status.REJECTED});
       console.log("ErRoR", error);
     }}

     window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
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
    this.setState({imageName});
    this.setState({status: Status.PENDING})
  }

   

  handleSelectImage = data => {
    this.setState({ selectedImage: data, }); 
}

  render() {
    const {images,status} = this.state;
    const {handleFormSubmit} = this
    return (
      <div className="App">
        <Searchbar onSearch={handleFormSubmit} />
        <Toaster position="top-right" />
        <ImageGallery images={images}/>

        {status === Status.PENDING && <Loader 
              className="Loader"
              type="Circles"
              color="#00BFFF"
              height={150}
              width={150}
              timeout={3000}
        />}

      </div>
    );
  }
}

export default App;
