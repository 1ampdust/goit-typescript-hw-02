import css from "./ImageCard.module.css";
import { Image } from "../App/App.types";

export type ImageCardProps = {
  image: Image;
  onImageClick: (image: Image) => void;
};

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => {
  return (
    <div>
      <img
        onClick={() => onImageClick(image)}
        className={css.cardImage}
        src={image.urls.small}
        alt={image.alt_description}
      />
      <div className={css.cardImageInfo}>
        <p className={css.cardImageText}>
          Author: <span>{image.user.name}</span>
        </p>
        <p className={css.cardImageText}>
          Likes: <span>{image.likes}</span>
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
