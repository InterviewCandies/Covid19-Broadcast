import React, { useState, useEffect } from 'react'
import { COUNTRY_URL } from '../../api/api';
import { useTranslation } from 'react-i18next'
import '../../styles/DataTable.css'
import { numberWithCommas } from '../../utils/commas';
const DataTable = () => {
    const mode = Number(localStorage.getItem('mode'));
    const style = {
        backgroundColor : mode? "#FFF" : "#243447",
        color : mode? "#000" : "#FFF",
    }
    const { t } = useTranslation();
    const [ countriesData, setCountriesData ] = useState([]);
    const [ copyCountriesData, setCopyCountriesData ] = useState([]); 
    const [ numberOfViewRows, setNumberOfViewRows ] = useState(5);
    const [ currentPage, setCurrentPage ] = useState(1);
    useEffect(()=>{
        async function fetchCountriesData() {
            try {
                const result = await fetch(COUNTRY_URL);
                const countriesData = await result.json();
                setCountriesData([...countriesData]);
                setCopyCountriesData([...countriesData]);
            }
            catch (error){
                console.log(error);
            }
        }
        fetchCountriesData();
    },[])

    const displayData = () => {
        if (!copyCountriesData.length) 
            return <tr><td>{t("noResults")}</td></tr>
        const currentCountries = copyCountriesData.slice((currentPage-1) * numberOfViewRows, currentPage*numberOfViewRows);
        const startIndex = (currentPage-1) * numberOfViewRows + 1;
        return currentCountries.map((country, index)=>{
            return (
                <tbody key={country["country"]}>
                    <tr>
                    <th scope="row">{startIndex + index}</th>
                    <td><img src={country["countryInfo"]["flag"]} alt="" width="30px" height="20px" className="mr-2 d-none d-sm-inline"></img>{country["country"]}</td>
                    <td>{numberWithCommas(country["cases"])}</td>
                    <td>{numberWithCommas(country["deaths"])}</td>
                    <td>{numberWithCommas(country["recovered"])}</td>
                    <td>{numberWithCommas(country["todayCases"])}</td>
                    <td>{numberWithCommas(country["todayDeaths"])}</td>
                    </tr>
                </tbody>
            )
        })
    }
    const displayPagination = () => {
        let pageNumbers = [];
        for (let i = 1; i <= Math.ceil(copyCountriesData.length / numberOfViewRows); i++)
            pageNumbers.push(i);
        let indexOfFirstPage = currentPage;
        let indexOfLastPage = pageNumbers.length;
        if (indexOfLastPage - indexOfFirstPage < 3) indexOfFirstPage = Math.max(1, indexOfLastPage-3);
        pageNumbers = pageNumbers.slice(indexOfFirstPage-1, indexOfLastPage);
        if (pageNumbers.length > 6) pageNumbers.splice(4,pageNumbers.length-6,"...");
        if (indexOfFirstPage > 10) pageNumbers.splice(0, 0, 1,"...");
        return pageNumbers.map((num, index)=>{ 
            return (
                <li className={"page-item" + (num === "..." ? " disabled" : "")}  key={index}>
                    <div className={"page-link " + (mode ? "light-pagination" : "dark-pagination") + (currentPage === num ? " active" : "")}  
                       id={num} 
                       onClick={e => {setCurrentPage(Number(e.target.id));}}>
                        {num}
                    </div>
                </li>
            )
        })
    }

    const handleSelect = (e) => {
        setNumberOfViewRows(Number(e.target.value)); 
        setCurrentPage(1);
    }

    const onSearch = (e) => {
        const copyCountriesData = countriesData.filter(country => {
            return country["country"].toLowerCase().startsWith(e.target.value.toLowerCase());
        })
        setCopyCountriesData([...copyCountriesData]);
        setCurrentPage(1);
    }

    const onSortUp = (e, key) => {
        let copyCountriesData = [...countriesData];
        copyCountriesData.sort((a,b)=> a[key] > b[key] ? 1 : -1 );
        setCopyCountriesData([...copyCountriesData]);
    }
    const onSortDown = (e, key) => {
        let copyCountriesData = [...countriesData];
        copyCountriesData.sort((a,b)=> a[key] < b[key] ? 1 : -1 );
        setCopyCountriesData([...copyCountriesData]);
    }

    const prevClick = () => {
        setCurrentPage(prevPage => prevPage-1);
    }
    const nextClick = () => {
        setCurrentPage(prevPage => prevPage+1);
    }
    const prev = (currentPage !== 1);
    const totalPages = Math.ceil(copyCountriesData.length / numberOfViewRows)
    const next = (currentPage !== totalPages);
    return (
        <div className="mt-5">
            <div className="d-flex  flex-column flex-sm-row justify-content-between mb-3">
                <div className="d-inline-flex">
                    <span className="mt-1">{t("show")}</span>
                    <select className="form-control-sm mx-2 view-rows" onChange={e => handleSelect(e)} style={style}>
                        <option value="5" selected>5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <span className="mt-1">{t("records")}</span>
                </div>
                <div className="input-group search-bar mt-2 mt-sm-0">
                    <input type="text" className="form-control" placeholder={t("searchCountry")} onChange={e => onSearch(e)} style={style}/>
                    <div className="input-group-append">
                        <span className="input-group-text"><i className="fa fa-search" onChange></i></span>
                    </div>
                </div>
            </div>
            <table className= {"table table-borderless " + (mode ? "border" : "")} style={style}>
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t("country")} 
                        <span className="ml-1 fa fa-arrow-up " onClick={e => onSortUp(e, "country")}></span>
                        <span className="fa fa-arrow-down" onClick={e => onSortDown(e, "country")}></span>
                    </th>
                    <th scope="col">{t("confirmed")}
                        <span className="ml-1 fa fa-arrow-up" onClick={e => onSortUp(e, "cases")}></span>
                        <span className="fa fa-arrow-down" onClick={e => onSortDown(e, "cases")}></span>
                    </th>
                    <th scope="col">{t("deaths")}
                        <span className="ml-1 fa fa-arrow-up" onClick={e => onSortUp(e, "deaths")}></span>
                        <span className="fa fa-arrow-down" onClick={e => onSortDown(e, "deaths")}></span> 
                    </th>
                    <th scope="col">{t("recovered")}
                        <span className="ml-1 fa fa-arrow-up" onClick={e => onSortUp(e, "recovered")}></span>
                        <span className="fa fa-arrow-down" onClick={e => onSortDown(e, "recovered")}></span>
                    </th>
                    <th scope="col">{t("todayCases")} 
                        <span className="ml-1 fa fa-arrow-up" onClick={e => onSortUp(e, "todayCases")}></span>
                        <span className="fa fa-arrow-down" onClick={e => onSortDown(e, "todayCases")}></span>
                    </th>
                    <th scope="col">{t("todayDeaths")}
                        <span className="ml-1 fa fa-arrow-up" onClick={e => onSortUp(e, "todayDeaths")}></span>
                        <span className="fa fa-arrow-down" onClick={e => onSortDown(e, "todayDeaths")}></span>
                    </th>
                    </tr>
                </thead>
                {displayData()}
            </table>

            {copyCountriesData.length ? 
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center justify-content-md-end">
                        <li className={"page-item" + (prev ? "" : " disabled")}>
                            <div className={"page-link " + (mode ? "light-pagination" : "dark-pagination")}  
                                onClick={()=>prevClick()}>
                                    {t("prev")}
                            </div>
                        </li>
                    {displayPagination()}
                    <li className={"page-item" + (next ? "" : " disabled")}>
                            <div className={"page-link " + (mode ? "light-pagination" : "dark-pagination")} 
                                onClick={()=>nextClick()}>
                                    {t("next")}
                            </div>
                        </li>
                    </ul>
                </nav> : null
            }
        </div>
    );
}

export default DataTable;