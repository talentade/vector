import React from 'react';
import Camera from '../../../themes/images/tradeDashboard/camera.svg';
import DummyImage from '../../../themes/images/tradeDashboard/t_nav3.png';
import './index.scss';

const UserAvatar = ({ imageUrl, handleChange, showSpinner }) => {
  return (
    <div className='header-image-section'>
      <div className='header-image-sections-imgs'>
        <div
          className='small-overlay'
          style={{ display: showSpinner ? 'flex' : 'none' }}
        >
          <div className='small-spinner'></div>
        </div>
        <div className='c-icon1'>
          <img src={imageUrl ? imageUrl : DummyImage} alt='' />
        </div>
        <label htmlFor='file'>
          <img src={Camera} alt='' className='c-icon2' />
        </label>
      </div>
      <input
        type='file'
        name='myImage'
        id='file'
        accept='image/x-png,image/gif,image/jpeg'
        onChange={handleChange}
      />
    </div>
  );
};

export default UserAvatar;
