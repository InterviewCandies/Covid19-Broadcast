import React, { Component } from 'react';
import './App.css';
import GlobalStats from './components/GlobalStats/GlobalStats';
import Header from './components/Header/Header';
import DataTable from './components/DataTable/DataTable';
import BarGraph from './components/BarGraph/BarGraph';
import ContinentsStats from './components/ContinentsStats/ContinentsStats';
import Maps from './components/Maps/Maps';
import LineGraph from './components/LineGraph/LineGraph';
import ScatterGraph from './components/ScatterGraph/ScatterGraph';
import Footer from './components/Footer/Footer';
class App extends Component {
  constructor(props) {
    super(props) 
    const mode = localStorage.getItem("mode") !== undefined ? Number(localStorage.getItem("mode")) : 1;
    this.state = {
      viewMap : 'confirmed',
      mode :  mode,
      updated: 0
    }
    localStorage.setItem('mode', JSON.stringify(this.state.mode));
    document.querySelector('body').className = this.state.mode ?'light-mode' : 'dark-mode';  
  }

  changeMode = () => {
    this.setState(prevState => {
      document.querySelector('body').className = (prevState.mode ? 'dark-mode' : 'light-mode');  
      localStorage.setItem('mode', JSON.stringify(1-prevState.mode));     
        return {
          mode : 1 - prevState.mode
        }
    }) 
  }
  changeMapView = view => {
    this.setState({
      viewMap : view
    })
  }
  changeUpdate = date => this.setState({updated : date});

  render() {
    return (
       <React.Fragment>
          <Header changed={this.changeMode}></Header>
          <main className="container">
            <GlobalStats updated={this.changeUpdate}></GlobalStats>
            <div className="mt-5 d-flex flex-column flex-lg-row justify-content-between">
              <div className="col-lg-6 mb-5 mb-lg-0"><LineGraph></LineGraph></div>
              <div className="col-lg-6"><ContinentsStats></ContinentsStats></div>
            </div>
            <DataTable></DataTable>
            <BarGraph></BarGraph>
            <Maps></Maps>
            <ScatterGraph></ScatterGraph>
          </main>
          <Footer updated={this.state.updated}></Footer>
       </React.Fragment>
         
    );
  }
 
}

export default App;
