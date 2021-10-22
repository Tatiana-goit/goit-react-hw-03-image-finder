import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ id,  src, alt, image, onClickModal }) {
  return (
    <li key={id} className={s.ImageGalleryItem}>
      <img 
        className={s.ImageGalleryItem_image}
        src={src}
        alt={alt}
        onClick={() => {onClickModal(image);}}
      />
    </li>
  );
}

export default ImageGalleryItem;
