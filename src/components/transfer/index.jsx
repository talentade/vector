import React from 'react';

const Transfer = ({
  accounts,
  account,
  selectHandler,
  depositValue,
  handleInputChange,
  balance,
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
      <h2>Transfer Funds</h2>
      {error ? <p className='error'>{error}</p> : null}
      <form className='transaction-action' onSubmit={handleSubmit}>
        <div className='deposit-flex'>
          <div className='deposit-flex-item-1'>
            <label>From</label>
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
                disabled
              />
              <p>USD</p>
            </div>
          </div>
        </div>
        <div className='deposit-flex'>
          <div className='deposit-flex-item-1'>
            <label>To</label>
            {/* <select value={account} onChange={selectHandler}>
              {accounts.map((account) => (
                <option key={`${Math.random()}-${Math.random()}`}>
                  {account}
                </option>
              ))}
            </select> */}
            <input
              type='email'
              name='to'
              placeholder='Receiver Email'
              onChange={handleInputChange}
              value={toValue}
              required
            />
          </div>
          {/* <div className='deposit-flex-item-2'>
            <label>Balance</label>
            <div className='bal-sym'>
              <input type='number' name='balance' value={balance} placeholder="0.00"/>
              <p>USD</p>
            </div>
          </div> */}
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
