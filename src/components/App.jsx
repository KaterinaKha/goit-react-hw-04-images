import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'services/api';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Error } from './Error/Error';

const toastConfig = {
  position: 'top-left',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};
export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, imgURL: '' });

  const handleFormSubmit = searchValue => {
    setSearchQuery(searchValue);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onOpenModal = imgURL => {
    setModal({ isOpen: true, imgURL: imgURL });
  };

  const onCloseModal = () => {
    setModal({ isOpen: false, imgURL: false });
  };

  useEffect(() => {
    const fetchImageData = async () => {
      if (!searchQuery) {
        return;
      }

      try {
        setLoading(true);
        const images = await fetchImages(searchQuery, page);

        const totalHits = images.totalHits;
        const totalPages = Math.ceil(totalHits / 12);
        const isMorePages = page < totalPages;

        if (page === 1) {
          setImages(images.hits);
          setLoadMoreBtn(isMorePages);
          setPage(1);
        } else {
          setImages(prevState => [...prevState, ...images.hits]);
          setLoadMoreBtn(isMorePages);
        }

        if (images.hits.length === 0) {
          toast.warn('...ooops! No images', toastConfig);
        }

        if (page === 1 && images.hits.length > 0) {
          toast.success('Your images were successfully fetched!', toastConfig);
        }

        if (page === totalPages) {
          setLoadMoreBtn(false);
        }
      } catch (error) {
        setError(error.message);
        toast.error(error.message, toastConfig);
      } finally {
        setLoading(false);
      }
    };

    fetchImageData();
  }, [searchQuery, page]);
  //========================================================

  return (
    <div>
      <ToastContainer />

      {loading && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#3f51b5"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <Error error={error} />}
      <ImageGallery images={images} onOpenModal={onOpenModal} />
      {loadMoreBtn && <Button onClick={onLoadMore} />}
      {modal.isOpen && (
        <Modal
          onCloseModal={onCloseModal}
          onOpenModal={onOpenModal}
          imgURL={modal.imgURL}
        />
      )}
    </div>
  );
}
