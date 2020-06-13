import React from 'react';
import SelectBox from '../selectBox/index';
import './index.scss';

const borderStyle = {
  border: '1px solid red',
};

const InputBox = ({
  label,
  type,
  name,
  error,
  selectItems,
  onChange,
  defaultText,
  handleInputChange,
}) => (
  <div className='input-box'>
    <label>{label}</label>
    {selectItems ? (
      <SelectBox selectOptions={selectItems} onChange={onChange} defaultOption={defaultText}/>
    ) : (
      <input
        type={type}
        name={name}
        onChange={handleInputChange}
        required
        style={error ? borderStyle : null}
      />
    )}
    <p className='red'>{error ? `*${error}` : null}</p>
  </div>
);

export default InputBox;
