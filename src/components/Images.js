import React from 'react';

const images = require.context('../assets', true);
const imageList = images.keys().map(image => images(image));

function ImageGallery() {
  return (
    <div>
      {imageList.map((image, index) => (
        <img key={index} src={image.default} alt={`${index}.jpg`} />
      ))}
    </div>
  );
}

export default ImageGallery;