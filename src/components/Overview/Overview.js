import React from 'react'
import LineGraph from '../../containers/LineGraph/LineGraph'
import ContinentsStats from '../../containers/ContinentsStats/ContinentsStats'
const Overview = () => (
    <div className="mt-5 d-flex flex-column flex-lg-row justify-content-between">
        <div className="col-lg-6 mb-5 mb-lg-0"><LineGraph></LineGraph></div>
        <div className="col-lg-6"><ContinentsStats></ContinentsStats></div>
    </div>
)
export default Overview;