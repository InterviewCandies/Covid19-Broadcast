import React from 'react'
import { numberWithCommas } from '../../utils/commas';
const Card = (props) => {
    return (
        <div className='card'>
            <h1>{numberWithCommas(Number(props.value))}</h1>
            <p>{props.title}</p>
        </div>
    )
}

export default Card;