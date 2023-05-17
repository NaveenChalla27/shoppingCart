
import React from "react";
import { Navbar, Container, Form, Nav, Dropdown, Badge, Button } from "react-bootstrap";
import {FaShoppingCart} from "react-icons/fa"
import { Link } from "react-router-dom";
import { CartState } from "../../cartContext/Context";
import { AiFillDelete } from "react-icons/ai";
import "./header.css"

const Header = () => {
  const {state:{cart},dispatch,productDispatch}=CartState();

   return (
    <Navbar bg="dark" variant="dark" style={{height:80}} >
      <Container className="header">
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <Form.Control 
            data-testid="search"
            type="search"
            placeholder="Search"
            className="me-auto"
            aria-label="Search"
            onChange={(e) =>
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload:e.target.value
              })
            }
          />
        </Navbar.Text>
        <Nav>
        <Dropdown   align="end">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
           <FaShoppingCart color="white" fontSize="25px"/> 
            <Badge data-testid="badge" style={{marginLeft:2,marginTop:0}}>{cart.length}</Badge>
        </Dropdown.Toggle>
        <Dropdown.Menu style={{minWidth:370}}>
          {cart.length>0?(
             cart.map((prod)=>(
              <span data-testid="cartContent" className="cartitem" key={prod.id}>
              <img  src={prod.image} alt={prod.image} className="cartitemImage"  />
              <div className="cartitemDetail" >
              <span>{prod.name}</span>
              <span>${prod.price.split(".")[0]}</span>
              </div>
              <AiFillDelete fontSize={"20px"} style={{cursor:"pointer"}} onClick={()=>dispatch({type:"REMOVE_FROM_CART",payload:prod})}/>
                </span>
             ))
            ):(
              <span style={{padding:10}}>cart is empty</span>
            )
          }
          <Link to="/cart"><Button  className="m-2"  style={{width:"95%",margin:"0 10px"}}  variant="primary">Go To Cart</Button></Link>
        </Dropdown.Menu>
      </Dropdown>
        </Nav>
      </Container>
    </Navbar>
   );
};

export default Header;
