import s from './ImageGalleryItem.module.css'

function ImageGalleryItem({ id, src, alt }) {
    return (
        <li key={id} className={s.ImageGalleryItem}>
          <img src={src} alt={alt} className={s.ImageGalleryItem_image} />
        </li>
    )

}

export default ImageGalleryItem;
