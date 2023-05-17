import React from "react";
import "./filter.css";
import { Button, Form } from "react-bootstrap";
import Rating from "../rating/Rating";
import { CartState } from "../../cartContext/Context";

const Filter = () => {
  const {productState:{byStock,byFastDelivery,sort,byRating},productDispatch}=CartState();
  return (
    <div className="filter">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          data-testid="ascending"
          label="Ascending"
          name="group1"
          type="radio"
          id={"inline-1"}
          onChange={()=>productDispatch({
            type:"SORT_BY_PRICE",
            payload:"lowToHigh"
          })}
          checked={sort==="lowToHigh"?true:false}
        />
      </span>
      <span>
        <Form.Check
          inline
          data-testid="descending"
          label="Descending"
          name="group1"
          type="radio"
          id={"inline-2"}
          onChange={()=>productDispatch({
            type:"SORT_BY_PRICE",
            payload:"HighToLow"
          })}
          checked={sort==="HighToLow"?true:false}
        />
      </span>
      <span>
        {" "}
        <Form.Check
          inline
          data-testid="stock"
          label="Include out of stock"
          name="group1"
          type="checkbox"
          id={"inline-3"}
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          data-testid="fastDeliveryOnly"
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={"inline-1"}
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_DELIVERY",
            })
          }
          checked={byFastDelivery}
        />
      </span>
      <span>
      <label style={{paddingRight:10}}></label>
      <Rating rating={byRating}  onClick={(i)=>productDispatch({type:"FILTER_BY_RATING",payload:i+1})} style={{cursor:"pointer"}}></Rating>
      </span>
      <Button variant="light"    data-testid="clearfilter" onClick={() =>
        productDispatch({
          type: "CLEAR_FILTERS",
        })
      }>Clear Filters</Button>
    </div>
  );
};

export default Filter;
