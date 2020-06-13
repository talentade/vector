import React, { Component } from 'react';
import ProfileComponent from '../../components/profile/index';
import Container from '../container/index';

class Profile extends Component {
  render() {
    return (
      <Container>
        <ProfileComponent />
      </Container>
    );
  }
}

export default Profile;
