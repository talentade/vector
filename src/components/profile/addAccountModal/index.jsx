import React, { Component } from 'react';
import { connect } from 'react-redux';
import CloseBtn from '../../../themes/images/close.svg';
import MasterCard from '../../../themes/images/mastercard.svg';
import server from '../../../services/server';
import Spinner from '../../../components/spinner/index';
import './index.scss';
import { saveUserProfile, toggleAddCardModal } from '../../../redux/actions';

class AccountModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      number: '',
      exp: '',
      cvv: '',
      showSpinner: false,
    };

    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  handleChange = (e) => {
    console.log(e.target.value);
    const {
      target: { name, value },
    } = e;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { name, number, exp } = this.state;
    const { email } = this.profile;

    this.setState({ showSpinner: true });

    try {
      const user_id = localStorage.getItem('id');

      await server.addNewCard({
        user_id,
        card_PAN: number,
        card_info: {
          valid_thru: exp.toString().split('-').reverse().join('-'),
          card_name: name,
        },
      });

      const email = this.profile.email;

      const {
        data: {
          data: { profile },
        },
      } = await server.getProfile(user_id, email);


      localStorage.setItem(
        'profile',
        JSON.stringify(profile),
      );

      this.props.saveUserProfile(profile);
      this.props.toggleAddCardModal();
      this.setState({ showSpinner: false });
    } catch (error) {
      this.setState({ showSpinner: false });
      return error.message;
    }
  };
  render() {
    const { showAddCardModal, handleClick } = this.props;
    const { showSpinner } = this.state;
    return (
      <div>
        <Spinner showSpinner={showSpinner} />
        {showAddCardModal ? (
          <div className='account-overlay'>
            <form className='account-modal' onSubmit={this.handleSubmit}>
              <img
                src={CloseBtn}
                alt=''
                onClick={handleClick}
                className='account-close-btn'
              />
              <h4>Add a card</h4>

              <div className='account-form-section'>
                <label>Card Holder Name</label>
                <input
                  type='text'
                  name='name'
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className='account-flex-2'>
                <div className='account-form-section card-small'>
                  <label>Card Number</label>
                  <input
                    type='number'
                    name='number'
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <img src={MasterCard} alt='' />
              </div>

              <div className='account-form-flex'>
                <div className='account-form-section'>
                  <label>Expiry Date</label>
                  <input
                    type='month'
                    name='exp'
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className='account-form-section'>
                  <label>CVV</label>
                  <input
                    type='number'
                    name='cvv'
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>

              <div className='account-form-submit'>
                <input type='submit' value='Add Card' />
              </div>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ showAddCardModal }) => ({
  showAddCardModal,
});

const mapDispatchToProps = (dispatch) => ({
  saveUserProfile: (profile) => dispatch(saveUserProfile(profile)),
  toggleAddCardModal: () => dispatch(toggleAddCardModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountModal);
