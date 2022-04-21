import React, { Component } from 'react'
import Main from './api/main.js'
import './styles/App.css'
import cheapshark from './assets/cheapshark.png'

export default function App() {

    return (

    <div className="main">  
        <div className="apidoc" style={{

         fontSize: "1vw",
         position: "absolute", 
         fontSize: "1.2em", 
         top: "2%", 
         left: "1%"}}>
          Game data from CheapShark's open API.

            <br></br>
            <a href="https://apidocs.cheapshark.com/" style={{color: "rgb(134, 237, 255)"}}>API DOCS</a>
            <br></br>
            <img src = {cheapshark} width = "100px" height = "auto" style={{position: "absolute", right: "72%"}}></img>
        </div>
      <Main />
    </div>

    );
  }


