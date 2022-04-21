import React, { Component } from 'react'
import Main from './components/main.js'
import './styles/App.css'
import cheapshark from './assets/cheapshark.png'

export default function App() {

    return (

    <div className="main">  
        <div className="apidoc" style={{fontSize: "1vw"}}>
          Game data from CheapShark's open API.
            <br></br>
            <a href="https://apidocs.cheapshark.com/">API DOCS</a>
            <br></br>
            <img src = {cheapshark} width = "100px" height = "auto"></img>
        </div>
      <Main />
    </div>

    );
  }


