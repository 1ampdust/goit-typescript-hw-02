import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../App/App.types";

type ImageGalleryProps = {
  images: Image[];
  onImageClick: (image: Image) => void;
};

const ImageGallery : React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={css.imageGallery}>
      {images.map((image) => (
        <li className={css.imageGalleryCard} key={image.id}>
          <ImageCard image={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;