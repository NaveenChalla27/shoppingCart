import React, { useEffect,useState } from 'react';
import { CartState } from "../../cartContext/Context";
import { Button, Col,Row, ListGroup,Form ,Image} from 'react-bootstrap';
import Rating from "../rating/Rating";
import { AiFillDelete } from 'react-icons/ai';
import "./cart.css"

const Cart = () => {
   const {state:{cart},dispatch}=CartState();
   const [total,setTotal]=useState(0);

  useEffect(()=>{
    let data=cart.reduce((acc,curr)=>acc+Number(curr.price)*curr.qty,0)
    setTotal(data)
   },[cart])

const changeQuantity=(e,prod)=>{
  dispatch({ type: "CHANGE_CART_QTY",payload:{
    id:prod.id,
    qty:e.target.value}
  })

}
  return (
    <div className='homePage'>
    <div className='productsContainer'>
      <ListGroup>
        {
          cart.map(prod=>(
            <ListGroup.Item key={prod.id}>
             <Row>
               <Col md={2}>
                 <Image src={prod.image} alt={prod.image} fluid rounded/>
               </Col>
                <Col md={2} >
                  <span>{prod.name}</span>
                </Col>
                <Col md={2} >${prod.price}</Col>
                <Col md={2} >
                <Rating rating={prod.rating} onClick={(value)=>{dispatch({type:"CHANGE_CART_RATING",payload:{id:prod.id,rating:value}})}}></Rating>
                </Col>
                <Col md={2}>
                <Form.Control as="select" value={prod.qty} onChange={(e)=>changeQuantity(e,prod)}>
                {[...Array(prod.inStock).keys()].map((x)=>(
                  <option key={x+1}>{x+1}</option>
                ))}
                </Form.Control>
                </Col>
                <Col md={2}>
                  <Button type="button" variant="light" onClick={()=>dispatch({type:"REMOVE_FROM_CART",payload:prod})}>
                   <AiFillDelete fontSize={"20px"}/>
                  </Button>
                </Col>
             </Row>
            </ListGroup.Item>
            ))
        }
      </ListGroup>
    </div>
    <div className='filter checkout'>
      <span className='title'>Subtotal ({cart.length}) items</span>
      <span style={{fontWeight:600,fontSize:18}}>Total:${total}</span>
       <Button type="button" disabled={cart.length===0}>Proceed to Checkout</Button>
    </div>
    </div>
  );
};

export default Cart