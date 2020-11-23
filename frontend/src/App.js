import React from 'react';
import { Footer, Header } from './components';
import { HomeScreen, ProductScreen, CartScreen } from './screens';
import { Container } from 'react-bootstrap';

//router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../src/App.css';
const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart/:id?" component={CartScreen} />
          <Route exact path="/" component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
