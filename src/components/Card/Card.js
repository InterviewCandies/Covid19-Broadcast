import React from 'react'
const Card = (props) => {
    return (
        <div className='card'>
            <h1>{props.value}</h1>
            <p>{props.title}</p>
        </div>
    )
}

export default Card;