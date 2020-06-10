import React, { Component } from 'react';
import './App.css';
import GlobalStats from   './containers/GlobalStats/GlobalStats';
import DataTable from './containers/DataTable/DataTable';
import BarGraph from './containers/BarGraph/BarGraph';
import Maps from './containers/Maps/Maps';
import ScatterGraph from './containers/ScatterGraph/ScatterGraph';
import Layout from './components/Layout/Layout';
import Overview from './components/Overview/Overview';
class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      updated: 0
    }
  }
  changeUpdate = date => this.setState({updated : date});

  render() {
    return (
      <Layout updated={this.state.updated}>
          <main className="container">
            <GlobalStats updated={this.changeUpdate}></GlobalStats>
            <Overview></Overview>
            <DataTable></DataTable>
            <BarGraph></BarGraph>
            <Maps></Maps>
            <ScatterGraph></ScatterGraph>
          </main>
      </Layout>    
    );
  }
 
}

export default App;
