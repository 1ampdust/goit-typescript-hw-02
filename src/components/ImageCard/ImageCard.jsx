import css from "./ImageCard.module.css";

const ImageCard = ({ image, onImageClick }) => {
  const imageCardInfo = {
    imageSrc: image.urls.regular,
    imageAltDescription: image.alt_description,
    imageDescription: image.description,
    imageAutor: image.user.name,
    imageLikes: image.likes,
  };

  return (
    <div>
      <img
        onClick={() => onImageClick(imageCardInfo)}
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