import React from 'react'
import { numberWithCommas } from '../../utils/commas';
const Card = (props) => {
    return (
        <div className='card'>
            <div className="card-body">
                <h3 className="card-text">{numberWithCommas(Number(props.value))}</h3>
                <p className="card-text">{props.title}</p>
            </div>
        </div>
    )
}

export default Card;