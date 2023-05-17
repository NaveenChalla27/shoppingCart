/* eslint-disable testing-library/no-debugging-utils */
import Cart from "./Cart";
import { Cart as CartContext } from "../../cartContext/Context";
import { render, screen } from "@testing-library/react";
describe("cart", () => {
 test("cart render",()=>{
  const dispatch = jest.fn();
  expect(render(
    <CartContext.Provider
      value={{
        dispatch,
        state: {
          cart: [
            {
              fastDelivery: true,
              id: "06f5602e-30b3-45c9-af27-08344bcb9606",
              image: "https://loremflickr.com/640/480/fashion",
              inStock: 6,
              name: "Shirt",
              price: "675.00",
              rating: 1,
              qty: 1,
            },
          ],
        },
      }}
    >
      <Cart />
    </CartContext.Provider>
  )).toMatchSnapshot();
})


});
