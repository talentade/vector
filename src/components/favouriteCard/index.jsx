import React from 'react';
import Star from '../../themes/images/tradeDashboard/star.svg';
import Comment from '../../themes/images/tradeDashboard/comment.svg';
import './index.scss';


const FavouriteCard = ({ direction, pair, price }) => (
  <div className="favourite-card">
    <div className="star-section">
      <img src={Star} alt="" />
      <p>{pair}</p>
    </div>
    <div className="smaller-items">
      <p>{price}</p>
      <img src={direction} alt="" />
      <img src={Comment} alt="" />
    </div>
  </div>
);

export default FavouriteCard;
