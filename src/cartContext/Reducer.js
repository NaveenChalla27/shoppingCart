const cartReducer=(state,action)=>{
    switch( action.type){
        case "ADD_TO_CART":
            return {...state,cart:[...state.cart,{...action.payload,qty:1}]}
        case "REMOVE_FROM_CART":
             return {...state,cart:state.cart.filter(item=>item.id!==action.payload.id)}
        case  "CHANGE_CART_QTY":
            //   console.log(action.payload)
            //   return {
            //     ...state,
            //     cart: state.cart.filter((c) =>
            //       c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
            //     ),
            //   };
              return {...state,cart:state.cart.filter(item=>{ return item.id===action.payload.id ? (item.qty=action.payload.qty):item.qty})}
              case  "CHANGE_CART_RATING":
                //return {...state,cart:state.cart.filter((item)=>item.id===action.payload.id?(item.rating===action.payload.rating):item.rating)}
                   return {
                ...state,
                cart: state.cart.filter((c) =>
                  c.id === action.payload.id ? (c.rating = action.payload.rating) : c.rating
                ),
              };
        default:
            return state;
    }
 }
export default cartReducer
