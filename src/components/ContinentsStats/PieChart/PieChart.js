import React from 'react'
import { Polar } from 'react-chartjs-2'

const PieChart = (props) => {
    const options = { 
        legend: {
            color : props.options["fontColor"]
        },
        scale: {
            gridLines: {
            color: props.options["gridColor"]
            },
            angleLines: {
            color:  props.options["gridColor"]
            }
        },
        responsive : true
    }
    const data = { 
        datasets: [{
            data : props.data,
            backgroundColor: props.colors,

        }],
        labels: props.labels
    }
    return(
        <div>
            <Polar data={data}  options={options}> </Polar>
        </div>
    )
}

export default PieChart;