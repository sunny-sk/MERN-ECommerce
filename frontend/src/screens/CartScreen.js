import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../components';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Card,
  Image,
} from 'react-bootstrap';

import { addToCart, removeFromCart } from '../actions/cartActions.js';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? +location.search.split('=')[1] : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeCartHandler = (id) => {
    // if (confirm('are you sure ?')) {
    dispatch(removeFromCart(id));
    // }
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1 className="h1">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>{' '}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((e, i) => {
              console.log(e.product);
              return (
                <ListGroup.Item key={e.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={e.image} alt={e.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${e.product}`}>{e.name}</Link>
                    </Col>
                    <Col md={2}>${e.name}</Col>
                    <Col md={2}>
                      <Form.Control
                        value={e.qty}
                        onChange={(event) => {
                          dispatch(
                            addToCart(e.product, Number(event.target.value)),
                          );
                        }}
                        as="select">
                        {[...Array(e.countInStock).keys()].map((x) => {
                          return (
                            <option value={x + 1} key={x}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => {
                          removeCartHandler(e.product);
                        }}>
                        <i className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="heading">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                item
              </h2>
              $(
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
              )
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}>
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
