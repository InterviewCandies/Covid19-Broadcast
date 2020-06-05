import React from 'react'
import { Polar } from 'react-chartjs-2'
import { numberWithCommas } from '../../../utils/commas';

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
        responsive : true,
        tooltips: {
            callbacks: {
               label: function(tooltipItem, data) {
                  let label = data.labels[tooltipItem.index];
                  return label + ": " + numberWithCommas(tooltipItem.yLabel);
               }
            }
        },
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