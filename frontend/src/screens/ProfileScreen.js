import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import { Loader, Message } from '../components';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

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
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
