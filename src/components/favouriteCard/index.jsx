import React from 'react';
import Star from '../../themes/images/tradeDashboard/star.svg';
import Comment from '../../themes/images/tradeDashboard/comment.svg';
import './index.scss';
import server from '../../services/server';

const removeFav = async (pair, showSpinner) => {
  showSpinner();
  try {
    const { status, message } = await server.removeFav(localStorage.getItem("id"), localStorage.getItem("accountType").split("-")[0].toLowerCase(), pair);
    showSpinner();
    let pair_id = "fav-pair-"+(pair.replace(/[^\w]/g, "_"));
    if(document.getElementById(pair_id)) {
      document.getElementById(pair_id).remove();
    }
  } catch (error) {
    return error;
    showSpinner();
  }
}

const FavouriteCard = ({ direction, color, pair, price, showSpinner}) => (
  <div className="favourite-card" id={"fav-pair-"+pair.replace(/[^\w]/g, "_")}>
    <div className="star-section">
      <img src={Star} alt="" onClick={() => removeFav(pair, showSpinner)} />
      <p>{pair.split("(")[0].trim()}</p>
    </div>
    <div className="smaller-items">
      <p>{price}</p>
      {direction == "up" ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.20123 13.1172L9.7183 13.1172V4.63187H1.23302L1.23302 6.14894L8.20123 6.14894L8.20123 13.1172Z" fill={color ? (color.length ? '#FF4848' : '#03CF9E') : '#03CF9E'}/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.23392 8.11603L1.23392 9.63309L9.7192 9.63309L9.7192 1.14781L8.20214 1.14781L8.20214 8.11603L1.23392 8.11603Z" fill={color ? (color.length ? '#FF4848' : '#03CF9E') : '#03CF9E'}/>
        </svg>
      )}
      <img src={Comment} alt="" />
    </div>
  </div>
);

export default FavouriteCard;
