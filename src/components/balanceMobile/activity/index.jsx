import React from 'react';
import Transfer from '../../../themes/images/transfer.svg';
import Withdraw from '../../../themes/images/withdraw.svg';

const Activity = ({ transactionType, senderAcct, receiverAcct, amount }) => {
  return (
    <div className='mob-activity'>
      <div className='mob-activity-left'>
        <img
          src={transactionType === 'transfer' ? Transfer : Withdraw}
          alt=''
        />
        <div className='mob-activity-transaction-type'>
          <p className='mob-trans-type'>{transactionType}</p>
          {receiverAcct ? (
            <p className='mob-small'>
              from <span>{senderAcct}</span> to <span>{receiverAcct}</span>
            </p>
          ) : (
            <p className='mob-small'>
              from <span>{senderAcct}</span>{' '}
            </p>
          )}
        </div>
      </div>
      <p className='mob-activity-right'>{amount}</p>
    </div>
  );
};

export default Activity;
