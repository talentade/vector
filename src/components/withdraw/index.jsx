import React from 'react';
import app from '../../services/app';
import WarnIcon from '../../themes/images/warn.svg';
import './index.scss';

const Withdraw = ({
  accounts,
  account,
  selectHandler,
  depositValue,
  handleInputChange,
  balance,
  selectedCurrency,
  currencies,
  cards,
}) => {
  let bdet = app.profile()["banking_details"];
  return (
    <div className='deposit'>
      <h2>Withdraw Funds</h2>

      <div className='transaction-message'>
        <img src={WarnIcon} alt='' />
        <p>Withdrawal requests will be reviewed by your operator in 24hrs</p>
      </div>
      <form className='transaction-action'>
        <div className='deposit-flex'>
          <div className='deposit-flex-item-1'>
            <label>Select Trading Account</label>
            <select value={account} onChange={selectHandler}>
              {accounts.map((account) => (
                <option key={`${Math.random()}-${Math.random()}`}>
                  {account}
                </option>
              ))}
            </select>
          </div>
          <div className='deposit-flex-item-2'>
            <label>Balance</label>
            <div className='bal-sym'>
              <input
                type='text'
                name='balance'
                value={balance}
                placeholder='0.00'
              />
              <p>USD</p>
            </div>
          </div>
        </div>
        <div className='deposit-amount'>
          <label>Enter Amount</label>
          <div className='deposit-amount-flex'>
            <div className='deposit-amount-item-1'>
              <input
                type='number'
                name='deposit'
                value={depositValue}
                onChange={handleInputChange}
                placeholder='0.00'
              />
            </div>
            <div className='deposit-amount-item-2'>
              <select value={selectedCurrency}>
                {currencies.map((currency) => (
                  <option key={`${Math.random()}-${Math.random()}`}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className='withdraw-card-select'>
          <label>Select Account Number:</label>
          <select>
            {bdet.map((acc) => (
              <option key={`${Math.random()}-${Math.random()}`}>{acc.account_number}</option>
            ))}
          </select>
        </div>
        {account.split("-")[0].toLowerCase() == "live" ? (
          <input
            type='submit'
            value='MAKE REQUEST'
            className='transaction-submit-btn'
          />
        ) : (null)}
      </form>
    </div>
  );
};

export default Withdraw;
