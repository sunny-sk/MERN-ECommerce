import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../components';
import axios from 'axios';
// import products from '../products';
const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await axios.get('/api/products');
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product, i) => {
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
