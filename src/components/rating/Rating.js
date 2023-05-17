import React from 'react'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
const Rating = ({style, onClick,rating}) => {
  return (
    <div>
    {
        [...Array(5)].map((_,index)=>(
            <span key={index} style={style} data-testid="rating" onClick={()=>onClick(index+1)}>
            {
                rating>index?(<AiFillStar fontSize="15px"/>):<AiOutlineStar/>
                  
            }
            </span>
        )

        )
    }</div>
  )
}

export default Rating