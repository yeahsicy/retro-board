import React from 'react';
import { Paper, Typography, Card } from '@material-ui/core';
import backgroundImage from './back.jpg';
import styled from 'styled-components';

const LandingPage = () => {
  return (
    <Container>
      <Card style={{ margin: 0 }}>
        <Typography variant="h2" style={{ color: 'black' }}>
          Tired of post-its?
        </Typography>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  background-image: url(${backgroundImage});
  width: 100%;
  height: 100vh;
  padding: 200px;
`;

export default LandingPage;
