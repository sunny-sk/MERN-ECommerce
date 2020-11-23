import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Form,
  Image,
} from 'react-bootstrap';
import { Loader, Rating, Message } from '../components';
//router
import { Link } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetail;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.image} fluid alt={product.name} />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            as="select">
                            {[...Array(product.countInStock).keys()].map(
                              (x) => {
                                return (
                                  <option value={x + 1} key={x}>
                                    {x + 1}
                                  </option>
                                );
                              },
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      type="button"
                      disabled={product.countInStock === 0}
                      className="btn btn-block">
                      Add To Card
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
