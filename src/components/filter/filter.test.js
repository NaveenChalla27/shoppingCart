/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/no-unnecessary-act */
import { Cart } from "../../cartContext/Context"
import { render,screen } from "@testing-library/react"
import Filter from './Filter';
import userEvent from "@testing-library/user-event";

test("filter",async()=>{
    const productDispatch=jest.fn();
    render(
        <Cart.Provider value={{
          productState: { 
            byStock:false,
            byFastDelivery:false,
            byRating:0,
            searchQuery:""},
          productDispatch
        }}>
        <Filter/>
    </Cart.Provider>)
    expect(screen.getByTestId("ascending")).toBeInTheDocument();
   userEvent.click(screen.getByTestId("ascending"))
    expect(productDispatch).toHaveBeenCalledWith({"payload": "lowToHigh", "type": "SORT_BY_PRICE"})
    userEvent.click(screen.getByTestId("descending"))
    await expect(productDispatch).toHaveBeenCalledWith({"payload": "HighToLow", "type": "SORT_BY_PRICE"})
    userEvent.click(screen.getByTestId("stock"));
    await  expect(productDispatch).toHaveBeenCalledWith({"type": "FILTER_BY_STOCK"})
})