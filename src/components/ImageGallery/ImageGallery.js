import styled from 'styled-components';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const Gallery = styled.ul`
   {
    display: grid;
    max-width: calc(100vw - 48px);
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-gap: 16px;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;
    list-style: none;
    margin-left: auto;
    margin-right: auto;
  }
`;

export default function ImageGallery(props) {
  return (
    props.images.length > 0 && (
      <Gallery>
        {props.images.map(image => (
          <ImageGalleryItem
            key={image.id}
            imgSrc={image.min}
            max={image.max}
            tag={image.tags}
            onImgClick={props.onClick}
          />
        ))}
      </Gallery>
    )
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      max: PropTypes.string.isRequired,
      min: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ),

  onClick: PropTypes.func.isRequired,
};
