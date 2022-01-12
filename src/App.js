import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { PER_PAGE } from './components/constList/constList';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import { getImagesGallery } from './components/requests';
import SpinnerLoader from './components/Loader/Loader';

export default function App() {
  const [showModal, setShowModal] = useState({
    isShow: false,
    src: null,
    alt: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [querry, setQuerry] = useState('');
  const [totalImg, setTotalImg] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesData, setImagesData] = useState([]);

  useEffect(() => {
    if (!querry) {
      return;
    }

    const getQuerryData = async function (querry, currPage) {
      setIsLoading(true);

      try {
        const imagesData = await getImagesGallery(querry, currPage);
        if (imagesData) {
          const { total, hits } = imagesData;

          if (!total) {
            toast.error('Images not find !', { position: 'top-right' });
            return;
          }

          const imagesObj = hits.map(hit => ({
            id: hit.id,
            min: hit.webformatURL,
            max: hit.largeImageURL,
            tags: hit.tags,
          }));

          if (currPage === 1) {
            setTotalImg(total);
            setCurrentPage(currPage);

            setImagesData(imagesObj);

            toast.success(`${total} images was find !`, {
              position: 'top-right',
            });
          }

          if (currPage > 1) {
            setCurrentPage(currPage);
            setImagesData(state => [...state, ...imagesObj]);
          }
        }
      } catch (error) {
        alert('Incorrect answer form server');
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    getQuerryData(querry, currentPage);
  }, [querry, currentPage]);

  const handleSubmit = querryObj => {
    const { querry } = querryObj;

    setQuerry(querry);
    setCurrentPage(1);
  };

  const onClickLoadMoreBtn = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const toggleModal = modalObj => {
    const { isShow } = showModal;

    setShowModal({
      isShow: !isShow,
      src: modalObj.max,
      alt: modalObj.tag,
    });
  };

  const modalClose = () => {
    setShowModal({
      isShow: false,
      src: null,
      alt: null,
    });
  };

  const { isShow } = showModal;
  const pageLeave = Math.ceil(totalImg / PER_PAGE) - currentPage;

  return (
    <>
      {isShow && <Modal onShow={showModal} onClose={modalClose} />}
      <Toaster />
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={imagesData} onClick={toggleModal}>
        <ImageGalleryItem />
      </ImageGallery>
      {isLoading && <SpinnerLoader />}
      {pageLeave >= 1 && <Button onClick={onClickLoadMoreBtn} />}
    </>
  );
}
