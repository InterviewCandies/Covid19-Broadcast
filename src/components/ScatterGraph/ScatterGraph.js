import React, { useState, useEffect } from 'react'
import { Scatter } from 'react-chartjs-2'
import { DAILY_URL } from '../../api/api';
import { useTranslation } from 'react-i18next'
import { numberWithCommas } from '../../utils/commas';
const ScatterGraph = () => {
    const mode = Number(localStorage.getItem('mode'));
    const { t } = useTranslation();
    const [ dailyData, setDailyData ] = useState([]);
    const [ intitialDailyData, setInitialDailyData ] = useState([]);
    useEffect(()=>{
        async function fetchDailyData() {
            const result = await fetch(DAILY_URL);
            const data = await result.json();
            setInitialDailyData([...data]);
            setDailyData([...data]);
        }
        fetchDailyData();
    },[])
    const extractData = key => {
        let list = [];
        dailyData.forEach(day => {
            list.push({x: new Date(day["reportDate"].split("-").join("-")).getTime(), y: day[key]});
        })
        return list;
    }
    const getDate = () => {
        let list = [];
        dailyData.forEach(day => {
            list.push(day["reportDate"]);
        })
        return list;
    }
    const handleChanged = e => {
        let data = [...intitialDailyData];
        let index = Number(e.target.value);
        data.splice(index, intitialDailyData.length - index);
        console.log(data.length);
        setDailyData([...data]);
    }
    let data = {}
    if (dailyData.length) {
        data = {
            labels: getDate(),
            datasets : [{
                label : "confirmed",
                data:extractData("deltaConfirmed"),
                backgroundColor :  mode? "#FFB347" : "#C51F5D",
            }]
        }
    }
    const options = {
        scales: {
            xAxes: [
                {
                    ticks: 
                        {
                            callback: (value) => {
                            return new Date(value).toLocaleDateString('en-US', {month: "short",year: "numeric"});
                        }
                    }
                }
            ]
        },
        tooltips: {
            callbacks: {
               label: function(tooltipItem, data) {
                  let label = data.labels[tooltipItem.index];
                  return label + ": " + numberWithCommas(tooltipItem.yLabel) + " " + t("cases");
               }
            }
        },
        legend: {
            display: false
        },
        responsive : true,
        maintainAspectRatio: false,
     }
    return (
        <div className="mt-5">
            <div className="d-flex  flex-column flex-sm-row justify-content-between mb-3">
                <h5 className="col-sm-4">{t("globalDailyCases")}</h5>
                <div className="col-sm-4">
                    <input type="range" 
                    className="form-control-range" 
                    min={0} 
                    max={intitialDailyData.length} 
                    onChange={e => handleChanged(e)} 
                    defaultValue={intitialDailyData.length}
                    style ={{backgroundColor: "red"}}/>
                </div>
            </div>
            <div  className={mode ? "light-mode card" : "dark-mode card"} style={{width : "100%"}}>
                <Scatter data={data} height={400} options = {options}></Scatter>
            </div>
        </div>
    )
}

export default ScatterGraph;