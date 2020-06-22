import React from 'react';

const Thumbnail = (props) => {
  const { src, alt } = props;

  return (
    <div>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Thumbnail;
