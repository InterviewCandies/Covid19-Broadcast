import React, { useState } from 'react'
import i18n from '../../utils/i18n'
import locales from '../../locales/locales'
import '../../styles/Header.css'
const Header = (props) => {
    const mode = Number(localStorage.getItem('mode'));
    const style = {
        backgroundColor : mode? "#FFB347" : "#C51F5D",
        color : mode? "#000" : "#FFF"
    }
    const [language, setLanguage] = useState(localStorage.getItem("language") || 'en');
    i18n.changeLanguage(language);
    const languages = ()=> {
        return Object.keys(locales).map((key)=>{
            return <option key={key} value={key}>{locales[key].name}</option>
        })
    }
    const handleLanguageChanged = (e) => {
        setLanguage(e.target.value);
        localStorage.setItem("language", e.target.value);
        i18n.changeLanguage(e.target.value);
    }
    return(
        <header className="container d-flex flex-column flex-sm-row pt-2 align-items-center justify-content-sm-between">
            <div>
                <p id="logo" className="mr-auto">COVID-19 BROADCAST</p>
            </div>  
            <div className="mb-3">
                <select onChange={(e)=>handleLanguageChanged(e)} value={language} className={"form-control-sm m-0 " + (mode ? "light-select" : "dark-select")}>
                    {languages()}       
                </select>
                <button className="btn ml-2 btn-sm rounded-circle" style={style}  onClick={props.changed}><i className={mode?"fa fa-sun-o":"fa fa-moon-o"}></i></button>

            </div>
        </header>
    )
}

export default Header;