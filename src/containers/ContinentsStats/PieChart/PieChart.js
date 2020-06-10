import React from 'react'
import { Polar } from 'react-chartjs-2'
import { numberWithCommas } from '../../../utils/numberWithCommas';

const PieChart = (props) => {
    const options = { 
        legend: {
            labels : {
                fontColor : props.options["fontColor"]
            }
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
        maintainAspectRatio: false,
        tooltips: {
            callbacks: {
               label: function(tooltipItem, data) {
                  let label = data.labels[tooltipItem.index];
                  return label + ": " + numberWithCommas(tooltipItem.yLabel) + " cases";
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
        <div style={{width:"100%"}}>
            <Polar data={data}  options={options} height="300"> </Polar>
        </div>
      
    )
}

export default PieChart;