import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onModal }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(image => {
        return (
          <ImageGalleryItem
            id={image.id}
            src={image.webformatURL}
            alt={image.tags}
            image={image}
            onClickModal={onModal}
          />
        );
      })}
    </ul>
  );
};

// function ImageGallery({ images, onSelect }) {
//     return (
//         <ul className={s.ImageGallery}>
//             {images && images.map(image => {
//                 const { id, webformatURL, tags} = image;
//                 return <ImageGalleryItem key={id} src={webformatURL} alt={tags} />
//             })}

//         </ul>
//     );
// };

export default ImageGallery;
