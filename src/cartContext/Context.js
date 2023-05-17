
import { createContext,useContext, useReducer } from "react";
import {faker} from "@faker-js/faker"
import React from 'react';
import CartReducer from "./Reducer";
import ProductReducer from "./productReducer";

export const Cart=createContext();
faker.seed(99)

const Context = ({children}) => {
const products=[...Array(20)].map(()=>({
    id:faker.datatype.uuid(),
    name:faker.commerce.product(),
    price:faker.commerce.price(),
    image:faker.image.fashion(),
    fastDelivery:faker.datatype.boolean(),
    inStock:faker.helpers.arrayElement([0,3,5,6,7]),
    rating:faker.helpers.arrayElement([1,2,3,4,5])

}))

const [state,dispatch]=useReducer(CartReducer,{products,cart:[]})
const [productState,productDispatch]=useReducer(ProductReducer,{
  byStock:false,
  byFastDelivery:false,
  byRating:0,
  searchQuery:""
})
  return (
     <Cart.Provider value={{state,dispatch,productState,productDispatch}}>
        {children},
     </Cart.Provider>
  )
}

export default Context

export const CartState=()=>{
    return useContext(Cart);
}



