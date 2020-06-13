import React from 'react';
import './index.scss';

const NavigationLink = ({
  imageUrl,
  linkName,
  hideText,
  secondClass,
  extraClass,
  handleClick
}) => (
  <div className={`nav-link ${secondClass ? 'l-active' : null} ${extraClass}`} onClick={handleClick}>
    <img src={imageUrl} alt='' />
    <p>{linkName}</p>
  </div>
);

export default NavigationLink;
