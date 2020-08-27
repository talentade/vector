import React from 'react';
import './index.scss';

const Deposit = ({
  depositValue,
  handleInputChange,
  balance,
  selectedCurrency,
  currencies,
  toggleBlue,
  togglePink,
  toggleYellow,
  selectHandler,
  account,
  accounts,
  accountList,
  handleCurrencySelect,
  handleSubmit,
  error,
}) => {
  return (
    <div className='deposit'>
      <h2 style={{marginTop: "10px"}}>Deposit Funds</h2>
      {error ? <p className='error'>{error}</p> : null}

      <form className='transaction-action' onSubmit={handleSubmit}>
        <div className='deposit-flex'>
          <div className='deposit-flex-item-1'>
            <label>Select Trading Account</label>
            <select id="dep-acc-sel" value={account} onChange={selectHandler}>
              {accountList.map(({account_name, account_label}) => (
                <option key={`${Math.random() * 1000000}`} value={account_name}>{account_label.length ? account_label : account_name.charAt(0).toUpperCase()+account_name.slice(1)}</option>
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
                disabled
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
                step='any'
                required
              />
            </div>
            <div className='deposit-amount-item-2'>
              <select value={selectedCurrency} onChange={handleCurrencySelect}>
                {currencies.map((currency) => (
                  <option key={`${Math.random()}-${Math.random()}`}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className='transaction-btns'>
          <button className='yellow' onClick={toggleYellow}>
            250.00
          </button>
          <button className='blue' onClick={toggleBlue}>
            500.00
          </button>
          <button className='pink' onClick={togglePink}>
            1000.00
          </button>
        </div>
        <input
          type='submit'
          value='DEPOSIT FUNDS'
          className='transaction-submit-btn'
        />
      </form>
      {/*() => { document.getElemntById("dep-acc-sel").value = account}*/}
    </div>
  );
};

export default Deposit;
