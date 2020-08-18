import React from 'react';
import Star from '../../themes/images/tradeDashboard/star.svg';
import Comment from '../../themes/images/tradeDashboard/comment.svg';
import Up from './up.svg';
import Down from './down.svg';
import './index.scss';
import server from '../../services/server';

const FavouriteCard = ({ direction, remove, color, pair, info, price, showSpinner, showBsellModal2}) => (
  <div className="favourite-card" id={"fav-pair-"+pair.replace(/[^\w]/g, "_")}>
    <div className="star-section">
      <img src={Star} alt="" onClick={(e) => remove(pair)} />
      <p>{pair.split(" ")[0].trim()}</p>
    </div>
    <div className="smaller-items">
      <p className="p-price">{price}</p>
      <img className={"direction up"+(direction != "up" ? " hide" : "")} src={Up} />
      <img className={"direction down"+(direction == "up" ? " hide" : "")} src={Down} />
      <img src={Comment} alt="" onClick={(e) => { window.buyAndSellData = {pair: info.pair, buy: info.ask, sell: info.bid, act: "buy"}; showBsellModal2(e)}} />
    </div>
  </div>
);

export default FavouriteCard;
