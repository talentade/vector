import React, { Component } from 'react';
import Container from '../container/index';
import './index.scss';

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNews: null,
    }
  }

  render() {
    return (
      <Container>
      </Container>
    );
  }
};

export default News;
