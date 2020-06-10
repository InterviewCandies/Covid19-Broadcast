import React, { useState } from 'react'
import USAMap from './USAMap'
import { useTranslation } from 'react-i18next'
import { numberWithCommas } from '../../utils/numberWithCommas';
const Maps = () => {
    const mode = localStorage.getItem('mode');
    const style = {
        color : mode === "light-mode" ? "#FFB347" : "#C51F5D",
        fontColor :  mode === "light-mode" ? "text-dark" : "text-light"

    }
    const { t } = useTranslation();
    const [ data, setData ] = useState({"updated" : 0, "state" : "", "confirmed" : 0, "deaths" : 0, "active" : 0, "todayCases" : 0, "todayDeaths" : 0});
    const ts = new Date(data.updated);
    return (
        <div className="mt-5">
             <h5 className="mb-4">{t('USStatesCases')}</h5>
            <div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                    <div className="col-md-7" style={{width:"100%"}}>
                      <USAMap target="cases" content="confirmedCases" changed = {setData}></USAMap>
                    </div>
                    <div className="col-md-5" style={{width : "100%"}}>
                        <h5 className="font-weight-bold" style={style}>{data.state}</h5>
                        <div className="form-group form-group-md row">
                            <label for="confirmed" className="col-5 col-form-label">{t("confirmed") + ": "}</label>
                            <div className="col-7">
                            <input type="text" className={"form-control-plaintext " + style.fontColor } id="confirmed" value={numberWithCommas(data.cases)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="deaths" className="col-5 col-form-label">{t("deaths") + ": "}</label>
                            <div className="col-7">
                            <input type="text"className={"form-control-plaintext " + style.fontColor } id="deaths" value={numberWithCommas(data.deaths)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="active" className="col-5 col-form-label">{t("active") + ": "}</label>
                            <div className="col-7">
                            <input type="text" className={"form-control-plaintext " + style.fontColor } id="active" value={numberWithCommas(data.active)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="todayCases" className="col-5 col-form-label">{t("todayCases") + ": "}</label>
                            <div className="col-7">
                            <input type="text" className={"form-control-plaintext " + style.fontColor } id="todayCases" value={numberWithCommas(data.todayCases)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="todayDeaths" className="col-5 col-form-label">{t("todayDeaths") + ": "}</label>
                            <div className="col-7">
                            <input type="text" className={"form-control-plaintext " + style.fontColor }id="todayDeaths" value={numberWithCommas(data.todayDeaths)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="updated" className="col-5 col-form-label">{t("updated") + ": "}</label>
                            <div className="col-7">
                            <input type="text" className={"form-control-plaintext " + style.fontColor } id="updated" value={ts.toLocaleString()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Maps;