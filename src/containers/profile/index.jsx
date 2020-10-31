import React, { Component } from 'react';
import ProfileComponent from '../../components/profile/index';
import AdminProfileComponent from '../../components/profile/admin';
import app from '../../services/app';
import Container from '../container/index';

class Profile extends Component {
  render() {
    return (
      <Container>
        {app.isAdmin() ? <AdminProfileComponent /> : <ProfileComponent />}
      </Container>
    );
  }
}

export default Profile;
