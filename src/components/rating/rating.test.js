import { render,screen } from "@testing-library/react"
import Rating from "./Rating"
import userEvent from "@testing-library/user-event"

test("rating test",()=>{
    const onClick=jest.fn()
    const props={style:{},onClick,rating:2}
    render(<Rating {...props}/>)
    let rating=screen.getAllByTestId("rating");
     userEvent.click(rating[3]);
     expect(onClick).toHaveBeenCalledWith(4);
})