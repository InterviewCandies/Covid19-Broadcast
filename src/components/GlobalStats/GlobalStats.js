import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'
import { useTranslation } from 'react-i18next'
import { GLOBAL_URL } from '../../api/api'
const GlobalStats = props => {
    const [globalStats, setGlobalStats] = useState({}) 
    const { t } = useTranslation();
    useEffect(()=>{
        async function fetchGlobalSummary() {
            try {
                const result = await fetch(GLOBAL_URL)
                const globalStats = await result.json();
                setGlobalStats({...globalStats});
                props.updated(globalStats["updated"])
            }
            catch (error){
                console.log(error);
            }
        }
        fetchGlobalSummary();
    }, [])
    return (
        <div className=" d-flex flex-column flex-lg-row align-items-center justify-content-lg-between">
            <div>
                <Card title={t('confirmed')} value={globalStats.cases}></Card>
            </div>
            <div>
                <Card title={t('deaths')} value={globalStats.deaths}></Card>
            </div>
            <div>
                <Card title={t('recovered')} value={globalStats.recovered}></Card>
            </div>
        </div>
    )
}

export default GlobalStats;