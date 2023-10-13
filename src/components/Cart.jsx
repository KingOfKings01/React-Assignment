/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { remove, clear } from "../store/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const products = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.auth.id);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeToCart = (id) => {
    dispatch(remove(id));
  };

  const clearCart = async () => {
    console.log("res");
    try {
      const Data = { userId, products };
      const res = await axios.post(
        "https://api-assignment-jpjg.onrender.com/order",
        Data
      );
      if (isAuthenticated) {
        dispatch(clear());
        navigate("/thankyou");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cards = products.map((product, idx) => (
    <div key={idx} className="col-md-3 my-2 d-flex justify-content-center">
      <Card
        style={{ width: "18rem" }}
        className="d-flex justify-content-center"
      >
        <Card.Img variant="top" src={product.imageUrl} />
        <Card.Body
          style={{ height: "120px" }}
          className="d-flex justify-content-center"
        >
          <Card.Title className="fs-5">{product.title}</Card.Title>
          <Card.Text>${product.price}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center ">
          <Button variant="danger" onClick={() => removeToCart(product._id)}>
            Remove
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return (
    <>
      {cards.length ? (
        <Card className="mt-4">
          <Card.Body style={{ height: "120px" }}>
            <Card.Title className="fs-5">CheckOut</Card.Title>
            <Card.Text>
              Total $
              {products.reduce((total, product) => total + product.price, 0)}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-center">
            {!(products.length > 0) ? (
              <Button variant="success" disabled>
                Checkout
              </Button>
            ) : (
              <Button variant="success" onClick={() => clearCart()}>
                Checkout
              </Button>
            )}
          </Card.Footer>
        </Card>
      ) : (
        ""
      )}
      {cards.length ? (
        <div className="row">
          {cards}
        </div>
      ) : (
        <div
          style={{ height: "500px" }}
          className="d-flex flex-column justify-content-center text-center"
        >
          <h1>Cart is empty</h1>
        </div>
      )}
    </>
  );
}
