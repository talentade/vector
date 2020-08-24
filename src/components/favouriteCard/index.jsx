import React from 'react';
import Star from '../../themes/images/tradeDashboard/star.svg';
import CommentIcon from '../../themes/images/tradeDashboard/comment.svg';
import Up from './up.svg';
import Down from './down.svg';
import app from '../../services/app';
import './index.scss';
import server from '../../services/server';

const FavouriteCard = ({ fade, remove, pair, showSpinner, showBsellModal2}) => (
  <div className="favourite-card" id={"fav-pair-"+pair.pair.replace(/[^\w]/g, "_")} style={{opacity: fade ? '0.5' : 1}}>
    <div className="star-section">
      <img src={Star} alt="" onClick={(e) => fade ? console.log("Empty") : remove(pair.pair)} />
      <p>{pair.pair.split(" ")[0].trim()}</p>
    </div>
    <div className="smaller-items">
      <p className="p-price">{app.floatFormat(pair.bid)}</p>
      {pair.bid_up > 0 ? <img className={"direction up"} src={Up} /> : <img className={"direction down"} src={Down} />}
      <img src={CommentIcon} alt='' onClick={(e) => { window.buyAndSellData = {pair: pair.pair, buy: pair.ask, sell: pair.bid, act: "sell", type: pair.type}; showBsellModal2(e)}} />
    </div>
  </div>
);

export default FavouriteCard;
