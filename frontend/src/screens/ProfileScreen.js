import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import { Loader, Message } from '../components';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { LinkContainer } from 'react-router-bootstrap';

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
      return;
    } else {
      //dispatch update profile
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        }),
      );
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      console.log(user);
      if (!user) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user]);

  return (
    <>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {error && <Message variant="danger">{error}</Message>}
          {message && <Message variant="danger">{message}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                aria-placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                aria-placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                aria-placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </Form.Group>
            <Form.Group controlId="password1">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                value={confirmPassword}
                aria-placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i className="fa fa-times" style={{ color: 'red' }} />
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i className="fa fa-times" style={{ color: 'red' }} />
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`order/${order._id}`}>
                          <Button className="btn-sm" variant="light">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
