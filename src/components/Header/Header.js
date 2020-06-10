import React, { useState } from 'react'
import i18n from '../../utils/i18n'
import locales from '../../locales/locales'
import './Header.css'
const Header = () => {
    const [ mode, setMode ] = useState(localStorage.getItem("mode") || "light-mode");
    localStorage.setItem('mode', mode);
    document.querySelector('body').className = mode;  
    const style = {
        backgroundColor : mode === "light-mode"? "#FFB347" : "#C51F5D",
        color : mode === "light-mode" ? "#000" : "#FFF"
    }
    const handleModeChanged = (e) => {
        setMode(prevState => {
            let mode = "light-mode";
            if (prevState === "light-mode") mode = "dark-mode";
            document.querySelector('body').className = mode;  
            localStorage.setItem('mode', mode);     
            return mode;
        }) 
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
                <select onChange={(e)=>handleLanguageChanged(e)} value={language} className={"form-control-sm m-0 " + mode}>
                    {languages()}       
                </select>
                <button className="btn ml-2 btn-sm rounded-circle" style={style}  onClick={(e) => handleModeChanged(e)}>
                    <i className={mode === "light-mode" ? "fa fa-sun-o":"fa fa-moon-o"}></i>
                </button>

            </div>
        </header>
    )
}

export default Header;