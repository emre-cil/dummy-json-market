import React, { useState } from 'react';
import classes from './Gallery.module.scss';

const Gallery = ({ images }: { images: string[] }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <>
      <div className={classes.gallery_main}>
        <img src={images[activeImageIndex]} alt="product" />
      </div>
      <div className={classes.gallery_thumbnails}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="product"
            onClick={() => setActiveImageIndex(index)}
            className={activeImageIndex === index ? classes.active : ''}
          />
        ))}
      </div>
    </>
  );
};

export default Gallery;
