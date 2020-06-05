import React, { useState, useEffect } from 'react'
import PieChart from './PieChart/PieChart'
import { useTranslation } from 'react-i18next'
import { PROXY_URL, CONTINENT_URL } from '../../api/api';


const ContinentsStats = () => {
    const mode = Number(localStorage.getItem('mode'));
    const { t } = useTranslation();
    const options = {
        gridColor : mode? "#000" : "#FFF",
        fontColor : mode? "#000" : "#FFF"
    }
    const [ continents, setContinents ] = useState([]);
    useEffect(()=>{
        async function fetchContinents() {
            try {
                const result = await fetch(CONTINENT_URL);
                const continents = await result.json();
                setContinents([...continents])
            }
            catch (error){
                console.log(error);
            }
        }
        fetchContinents();
    },[])
    const getData = key => {
        return continents.map(continent => continent[key]);
    }
    const continentLabels = getData("continent");
    const colors = ["#e76f51", "#f4a261", "#e9c46a", "#2a9d8f", "#CD5C5C", "#264653"];
    return(
        <div>
            <div style={{width : "100%"}}>
                <h5>{t('casesByContinent')}</h5>
                <PieChart labels={continentLabels} colors={colors} data={getData("cases")} options={options}></PieChart>
            </div>
        </div>
    )
}

export default ContinentsStats;

