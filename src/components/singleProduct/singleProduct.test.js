import { Cart } from "../../cartContext/Context"
import SingleProduct from "./SingleProduct";
import { render,screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

test("single",()=>{
    const productDispatch=jest.fn();
    const dispatch=jest.fn();
    render(<Cart.Provider value={{state:{cart:[{
        fastDelivery: true,
        id: "06f5602e-30b3-45c9-af27-08344bcb9606",
        image: "https://loremflickr.com/640/480/fashion",
        inStock: 6,
        name: "Shirt",
        price: "675.00",
        rating: 1,
      },]},
      dispatch,
      productState: {},
      productDispatch
    }}>
    <SingleProduct item={{
        fastDelivery: true,
        id: "06f5602e-30b3-45c9-af27-08344bcb9606",
        image: "https://loremflickr.com/640/480/fashion",
        inStock: 6,
        name: "Shirt",
        price: "675.00",
        rating: 1,
      }}/>
    </Cart.Provider>)
    expect(screen.getByText("Shirt")).toBeInTheDocument();
    expect(screen.queryByTestId("addToCart")).not.toBeInTheDocument();
    expect(screen.getByTestId("removeFromCart")).toHaveTextContent(/Remove from cart/i);
    userEvent.click(screen.getByTestId("removeFromCart"));
    expect(dispatch).toHaveBeenCalledTimes(1)

})