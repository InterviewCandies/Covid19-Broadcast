import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import { HISTORY_URL } from '../../api/api';
import { numberWithCommas } from '../../utils/numberWithCommas';
const BarGraph = () => {
    const mode = localStorage.getItem('mode');
    const DEFAULT_COUNTRY = "USA";
    const style = {
        backgroundColor : mode === "light-mode" ? "#FFF" : "#243447",
        color : mode === "light-mode" ? "#000" : "#FFF",
        width: "50vh"
    }
    const [ history, setHistory ] = useState([]);
    const [ currentCountry, setCurrentCountry ] = useState(DEFAULT_COUNTRY);
    const [ currentProvince, setCurrentProvince] = useState(null);
    const { t } = useTranslation();
    useEffect(()=>{
        async function fetchHistory() {
            try {
                const result = await fetch(HISTORY_URL);
                const data = await result.json();
                setHistory([...data]);
            }
            catch (error){
                console.log(error);
            }
        } 
        fetchHistory();
    },[])
    const convertData = obj => {
        let list = [];
        Object.keys(obj).forEach( key => {
            list.push({ x: key, y:  obj[key]});
        })
        return list;
    }
    const displayCountryOption = () => {
        let countries = history.map(country => {
            return country["country"] + (country["province"] ? ", " + country["province"] : "");
        });
        return countries.map(country => { 
          return ( 
            country === DEFAULT_COUNTRY ? <option value={country} key={country} selected>{country}</option> : 
            <option value={country} key={country}>{country}</option>
          )
        })
    }
    const handleSelect = e => {
        let [country, province] = e.target.value.split(", ");
        if (!province) province = null;
        setCurrentCountry(country);
        setCurrentProvince(province);
    }
    const countryData = history.find(country => country["country"] === currentCountry && country["province"] === currentProvince);
    let data = {}
    if (countryData) {
        data = {
        labels: Object.keys(countryData["timeline"]["cases"]),
        datasets: [ 
            {
                label: t("confirmed"), 
                data: convertData(countryData["timeline"]["cases"]),
                backgroundColor: "#00BFFF",
            },
            {
                label: t("deaths"), 
                data: convertData(countryData["timeline"]["deaths"]),
                backgroundColor: "#FF6347"
            },
            {
                label: t("recovered"), 
                data: convertData(countryData["timeline"]["recovered"]),
                backgroundColor: "#00FF00"
            }
        ]
    };
    }
    const options = {
        legend: {
            labels : {
                fontColor : style.color
            }
        },
        tooltips: {
            callbacks: {
               label: function(tooltipItem, data) {
                   let label = data.datasets[tooltipItem.datasetIndex]["label"];
                  return label + ": " + numberWithCommas(tooltipItem.yLabel);
               }
            }
        },
        scales : {
            xAxes: [{
                ticks: {
                    fontColor: style.color,
                }
            }],
            yAxes: [{
                ticks: {
                    fontColor: style.color,
                }
            }]
        },
        responsive: true,
        maintainAspectRatio: false
    }
    return(
        <div className="mt-5">
            <div className="d-flex flex-column flex-sm-row justify-content-between">
                <h5>{t("timeline")}</h5>
                <select className="form-control-sm mb-3" onChange={e => handleSelect(e)} style={style}>
                     {displayCountryOption()}
                </select>
            </div>
            <div  className={mode ? "light-mode card" : "dark-mode card"} style={{width : "100%"}}>
                <Bar data={data} height={400} options={options}></Bar>
            </div>
        </div>
    )
}

export default BarGraph;