/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */

/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-container */
import React from "react";
import { render,screen,waitFor,act} from "@testing-library/react";
import Header from "./Header";
import Context, { Cart} from "./../../cartContext/Context";
import { BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";


//  jest.mock("react-router-dom")
// //()=>({
// //   ...jest.requireActual("react-router-dom"),
// //   useLocation:jest.fn()
// // }))

// jest.mock('@faker-js/faker', () => ({
//   faker: {
//     seed: jest.fn(),
//     datatype: {
//       uuid: jest.fn(),
//     },
//     commerce: {
//       product: jest.fn(),
//       price: jest.fn(),
//     },
//     image: {
//       fashion: jest.fn(),
//     },
//     helpers: {
//       arrayElement: jest.fn(),
//     },
//   },
// }));

test("renders Header component with correct context", async () => {
  const { container } = await render(
    <BrowserRouter>
      <Context>
        <Header />
      </Context>
    </BrowserRouter>
  );
 expect(container.querySelector(".header")).toHaveTextContent("Shopping Cart");
 userEvent.click(container.querySelector(".header"));
 await waitFor(() => {
  expect(window.location.pathname).toBe('/');
});
// const mockPush = jest.fn();
// const mockLocation = { pathname: '/mock-path' };
// jest.spyOn(window.history, 'push').mockImplementation(mockPush);
// jest.spyOn(window.history, 'location', 'get').mockReturnValue(mockLocation);

// expect(mockPush).toHaveBeenCalledWith('/')
// expect(mockLocation.pathname).toBe('/');
});

test("search query when typing single char dispatch is called", () => {
  const  productDispatch=jest.fn();
  render(
    <BrowserRouter>
      <Cart.Provider
        value={{
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
              },
            ],
          },
          dispatch: jest.fn(),
          productState: {},
          productDispatch
        }}
      >
        <Header />
      </Cart.Provider>
    </BrowserRouter>
  );
 expect(screen.getByTestId("search")).toBeInTheDocument()
  userEvent.type(screen.getByPlaceholderText("Search"), "a");
  expect(productDispatch).toHaveBeenCalledWith( {"payload": "a", "type": "FILTER_BY_SEARCH"});
});

test("elements in cart displayed and deleted when we click on delet icon",async ()=>{
  const  productDispatch=jest.fn();
  render(
    <BrowserRouter>
      <Cart.Provider
        value={{
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
              },
            ],
          },
          dispatch: jest.fn(),
          productState: {},
          productDispatch
        }}
      >
        <Header />
      </Cart.Provider>
    </BrowserRouter>
  );
expect(screen.getByTestId("badge")).toBeInTheDocument();
expect(screen.getByTestId("badge")).toHaveTextContent("1");
expect(screen.queryByText("Go To Cart")).not.toBeInTheDocument();
act(()=>{
   userEvent.click(screen.getByTestId("badge"))
})
await waitFor(()=>{
  expect(screen.getByText("Go To Cart")).toBeInTheDocument();
})
const cartContents = screen.getAllByTestId('cartContent');
expect(screen.getByTestId('cartContent')).toBeInTheDocument();
expect(cartContents.length).toBe(1);
act(()=>{
userEvent.click(screen.getByText("Go To Cart"))
})
expect(window.location.pathname).toBe("/cart")


})