import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useTranslation } from 'react-i18next'
import { scaleLinear } from "d3-scale";
import { STATE_URL } from "../../../api/api";
import ReactTooltip from "react-tooltip";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";


const USAMap = props => {
  const [ data, setData ] = useState([]);
  const [ content, setContent ] = useState("");
  const { t } = useTranslation();
  useEffect(() => {
    async function fetchStates() {
        const result = await fetch(STATE_URL);
        const data = await result.json();
        const state = data.find(item => item["state"] == "New York");
        setData([...data]);
        props.changed({...state})
    }
    fetchStates();
  }, []);
  const handleHover = (e, geo, cur) => {
    const state = data.find(item => item["state"] == geo["name"]);
    props.changed({...state});
    return cur? setContent(`${cur["state"]}: ${cur[props.target]} ${t(props.content)}`): "";
  }
  const handleMouseLeave = () => {
    const state = data.find(item => item["state"] == "New York");
    props.changed({...state});
    setContent("");
  }
  const cases = data.map(item=> item[props.target]);
  const colorScale = scaleLinear()
  .domain([Math.min(...cases), Math.max(...cases)])
  .range(["#ffedea", "#ff5233"  ]);
  return (
        <div>
        <ComposableMap  data-tip="" projection="geoAlbersUsa">
            <Geographies geography={geoUrl}>
            {({ geographies }) =>
                geographies.map(geo => {
                const cur = data.find(s => s["state"] == geo["properties"]["name"]);
                return (
                    <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick = {() => ()=> {console.log(geo);   return geo["properties"]["name"]}}
                    fill={ cur?colorScale(cur.cases) : "#EEE"}
                    stroke = "#000"
                    onMouseEnter = {(e) => handleHover(e, geo.properties, cur)}
                    onMouseLeave = {() => handleMouseLeave()}
                    style={{
                      default: {
                        outline: "none"
                      },
                      hover: {
                        outline: "none"
                      },
                      pressed: {
                        outline: "none"
                      }
                    }}
                    />
                );
                })
            }
            </Geographies>
        </ComposableMap>
        <ReactTooltip >{content}</ReactTooltip>
      </div>
  );
};

export default USAMap;
