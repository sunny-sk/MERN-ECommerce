import React from 'react';
import product from '../products';
import { Product } from '../components';
import { Row, Col } from 'react-bootstrap';
const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {product.map((product, i) => {
          return (
            <Col key={i} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
