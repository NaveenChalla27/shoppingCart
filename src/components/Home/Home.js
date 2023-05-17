import React from "react";
import { CartState } from "../../cartContext/Context";
import "./home.css";
import SingleProduct from "../singleProduct/SingleProduct";
import Filter from "../filter/Filter"

const Home = () => {
  const {
    state: { products }
  ,productState:{sort,byStock,byFastDelivery,byRating,searchQuery}} = CartState();

  const transformProducts=()=>{
    console.log(products);
    let sortedproducts=products;
     if(sort){
      sortedproducts=sortedproducts.sort((a,b)=>(sort==='lowToHigh'?a.price-b.price:b.price-a.price))
     }
     if(byStock){
      sortedproducts=sortedproducts.filter(item=>item.inStock)
     }
     if(byFastDelivery){
      sortedproducts=sortedproducts.filter(item=>item.fastDelivery)
     }
     if(byRating){
      sortedproducts=sortedproducts.filter(prod=>prod.rating>=byRating)
     }
     if(searchQuery){
      sortedproducts=sortedproducts.filter(prod=>prod.name.toLowerCase().includes(searchQuery))
     }
     return sortedproducts
  }
  return (
    <div className="homePage">
      <Filter/>
      <div className="productsContainer">
        {transformProducts().map((item) => (
          <SingleProduct item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
