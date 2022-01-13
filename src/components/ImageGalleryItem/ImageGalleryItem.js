import styled from 'styled-components';
import PropTypes from 'prop-types';

const GalleryItem = styled.li`
   {
    border-radius: 2px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  }
`;

const GalleryItemImage = styled.img`
   {
    width: 100%;
    height: 260px;
    object-fit: cover;
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  & :hover {
    transform: scale(1.2);
    cursor: zoom-in;
  }
`;

export default function ImageGalleryItem(props) {
  const onImageClick = () => {
    props.onImgClick({ max: props.max, tag: props.tag });
  };

  return (
    <GalleryItem>
      <GalleryItemImage
        onClick={onImageClick}
        src={props.imgSrc}
        originalImg={props.max}
        alt={props.tag}
      />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string.isRequired,
      max: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    }),
  ),

  onImgClick: PropTypes.func,
};
