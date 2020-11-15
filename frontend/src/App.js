import React from 'react';
import { Footer, Header } from './components';
import { HomeScreen } from './screens';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
