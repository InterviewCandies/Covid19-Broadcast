import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Layout = props => (
    <div>
        <Header></Header>
        {props.children}
        <Footer updated={props.updated}></Footer>
    </div>
)

export default Layout;
