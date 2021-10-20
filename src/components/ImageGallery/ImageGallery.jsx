import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

function ImageGallery({ images, onSelect }) {
    return (
        <ul className={s.ImageGallery}>
            {images && images.map(image => {
                const { id, webformatURL, tags} = image;
                return <ImageGalleryItem key={id} src={webformatURL} alt={tags} onClick={() => onSelect(image)} />
            })}
            
        </ul>
    );
};

export default ImageGallery;