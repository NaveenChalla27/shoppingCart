import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "../rating/Rating";
import { CartState } from "../../cartContext/Context";
import "./single.css";

const SingleProduct = ({ item }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  return (
    <div className="product">
      <Card style={{ width: "14rem", margin: "5px" }}>
        <Card.Img src={item.image} variant="top" alt={item.name} />
        <Card.Body>
          <Card.Title className="title">
            <span>{item.name}</span>
            <span>{item.price.split(".")[0]}$</span>
          </Card.Title>
          <Card.Subtitle className="subtitle">
            {item.fastDelivery ? (
              <div>(Fast Delivery)</div>
            ) : (
              <div>(4 days delivery)</div>
            )}
            <Rating
              rating={item.rating}
              onClick={(value) => {
                dispatch({
                  type: "CHANGE_CART_RATING",
                  payload: { id: item.id, rating: value },
                });
              }}
            ></Rating>
          </Card.Subtitle>
          {cart.some((prod) => prod.id === item.id) ? (
            <Button
            data-testid="removeFromCart"
              size="sm"
              className="me-2 mt-2"
              variant="danger"
              onClick={() => {
                dispatch({ type: "REMOVE_FROM_CART", payload: item });
              }}
            >
              Remove from cart
            </Button>
          ) : item.inStock ? (
            <Button
               data-testid="addToCart"
              size="sm"
              className=" mt-2"
              onClick={() => {
                dispatch({ type: "ADD_TO_CART", payload: item });
              }}
              variant="primary"
            >
              Add to Cart
            </Button>
          ) : (
            <Button
              size="sm"
              className="mt-2"
              variant="primary"
              disabled={!item.inStock}
            >
              {!item.inStock ? "Out of stock" : item.inStock}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
