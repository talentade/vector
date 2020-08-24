import React from 'react';

const Transfer = ({
  accounts,
  accounts2,
  account,
  selectHandler,
  selectHandler2,
  depositValue,
  handleInputChange,
  balance,
  balance2,
  selectedCurrency,
  currencies,
  toggleBlue,
  togglePink,
  toggleYellow,
  toValue,
  handleCurrencySelect,
  handleSubmit,
  error,
}) => {
  return (
    <div className='deposit'>
      <h2 style={{marginTop: "10px"}}>Transfer Funds</h2>
      {error ? <p className='error'>{error}</p> : null}
      <form className='transaction-action' onSubmit={handleSubmit}>
        <div className='deposit-flex'>
          <div className='deposit-flex-item-1'>
            <label>From</label>
            <select value={account} onChange={selectHandler}>
              {accounts.map((acc) => (
                <option key={`${Math.random()}-${Math.random()}`}>
                  {acc}
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
                disabled
              />
              <p>USD</p>
            </div>
          </div>
        </div>
        <div className='deposit-flex'>
          <div className='deposit-flex-item-1'>
            <label>To</label>
            <select value={toValue} onChange={selectHandler2}>
              {accounts2.map((acc) => (
                <option key={`${Math.random()}-${Math.random()}`}>
                  {acc}
                </option>
              ))}
            </select>
          </div>
          <div className='deposit-flex-item-2'>
            <label>Balance</label>
            <div className='bal-sym'>
              <input
                type='text'
                name='balance2'
                value={balance2}
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
          value='MAKE TRANSFER'
          className='transaction-submit-btn'
        />
      </form>
    </div>
  );
};

export default Transfer;
