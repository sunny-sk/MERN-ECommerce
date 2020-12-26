import React from 'react';
import { Footer, Header } from './components';
import {
  HomeScreen,
  ProductScreen,
  CartScreen,
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
  PaymentScreen,
  ShippingScreen,
  PlaceOrderScreen,
  OrderScreen,
  userListScreen,
  UserEditScreen,
} from './screens';
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
          <Route exact path="/shipping" component={ShippingScreen} />
          <Route exact path="/placeorder" component={PlaceOrderScreen} />
          <Route exact path="/payment" component={PaymentScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/cart/:id?" component={CartScreen} />
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/order/:id" component={OrderScreen} />
          <Route exact path="/admin/userlist" component={userListScreen} />
          <Route exact path="/admin/user/:id/edit" component={UserEditScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
