import s from './ImageGalleryItem.module.css'

function ImageGalleryItem({ id, src, alt, onClick }) {
    return (
        <li className={s.ImageGalleryItem}>
          <img key={id} src={src} alt={alt} className={s.ImageGalleryItem_image} />
        </li>
    )

}

export default ImageGalleryItem;
