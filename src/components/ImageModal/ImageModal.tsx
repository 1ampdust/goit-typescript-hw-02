import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { Image } from "../App/App.types";

Modal.setAppElement("#root");

type ImageModalProps = {
  isOpen: boolean;
  image: Image | null;
  onCloseModal: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, image, onCloseModal }) => {
  const imageSrc = image && image.imageSrc;

  return (
    <Modal
      overlayClassName={css.backdrop}
      className={css.modalWindow}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
    >
      {imageSrc && (
        <img
          className={css.imageModal}
          src={imageSrc}
          alt={image && image.alt_description}
        />
      )}
    </Modal>
  );
};

export default ImageModal;