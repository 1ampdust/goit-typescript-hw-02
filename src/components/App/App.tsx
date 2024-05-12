import { useState, useEffect } from "react";
import axios from "axios";
import { AxiosResponse } from "axios";
import "./App.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMassage/ErrorMassage";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { Toaster, toast } from "react-hot-toast";
import { Image } from "./App.types";

interface UnsplashResponse {
  total: number;
  total_pages: number;
  results: Image[];
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [mainLoading, setMainLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    if (searchQuery !== "") {
      setMainLoading(true);
      setError(null);

      axios
        .get(
          `https://api.unsplash.com/search/photos?page=${currentPage}&query=${searchQuery}&client_id=YDBQCrbMETFmkVpqYgAfBUJ0SZGTv2ePc5Uq0Tkx6UU`
        )
        .then((res: AxiosResponse<UnsplashResponse>) => {
          const responseData: UnsplashResponse = res.data;
          setImages((prevImages) => [...prevImages, ...responseData.results]);
          setTotalPages(responseData.total_pages);
          if (responseData.results.length === 0) {
            toast.error("Nothing was found for your request");
          }
        })
        .catch((err: Error) => {
          setError(err);
        })
        .finally(() => {
          setMainLoading(false);
          setLoadingMore(false);
        });
    }
  }, [searchQuery, currentPage]);

  const handleSubmit = (searchQuery: string) => {
    if (searchQuery.trim() !== "") {
      setSearchQuery(searchQuery);

      setImages([]);
      setCurrentPage(1);
    } else {
      toast.error("Enter your search term!");
    }
  };

  const loadMoreImages = () => {
    if (currentPage < totalPages) {
      setLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {mainLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {!mainLoading && currentPage < totalPages && (
        <>
          <LoadMoreBtn onLoadMore={loadMoreImages} />
          {loadingMore && <Loader />}
        </>
      )}
      {error && <ErrorMessage message={error.message} />}
      <Toaster position="top-right" reverseOrder={false} />
      <ImageModal
        isOpen={modalIsOpen}
        onCloseModal={closeModal}
        image={selectedImage}
      />
    </div>
  );
};

export default App;
