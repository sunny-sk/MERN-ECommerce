import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { Loader, Message } from '../components';
import { listProductDetails, updateProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';

const ProductEditScreen = ({ match }) => {
  let productId = match.params.id;
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate } = productUpdate;

  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  }, [product]);

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [productId, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(product._id, {
        name,
        price,
        brand,
        category,
        countInStock,
        description,
        image,
      }),
    );
  };

  const uploadFileHandler = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      setUploading(true);
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/upload',
        formData,
        config,
      );
      setUploading(false);
      setImage(data);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product {productId}</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
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
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  value={price}
                  aria-placeholder="Enter Price"
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                />
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  value={image}
                  aria-placeholder="Enter Image url"
                  onChange={(e) => setImage(e.target.value)}
                  type="text"
                />
                <Form.File
                  id="image-file"
                  label="Choose File"
                  custom
                  onChange={uploadFileHandler}></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  value={brand}
                  aria-placeholder="Enter Brand"
                  onChange={(e) => setBrand(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group controlId="countInStock">
                <Form.Label>CountInStock</Form.Label>
                <Form.Control
                  value={countInStock}
                  aria-placeholder="Enter countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                  type="number"
                />
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  value={category}
                  aria-placeholder="Enter Category"
                  onChange={(e) => setCategory(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={description}
                  aria-placeholder="Enter Description"
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Update Product
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
