import React, { Component } from 'react'
import Main from './components/main.js'
import GameStores from './components/GameStores.js'
import './styles/App.css'
import cheapshark from './assets/cheapshark.png'
import logo from './assets/logo2.png'

export default function App() {

    return (

      <div className="main">
    
        <div className="apidoc">
          Game data from CheapShark's open API.
          <br></br>
          <a href="https://apidocs.cheapshark.com/">API DOCS</a>
          <br></br>
          <img src = {cheapshark} width = "100px"></img>
        </div>
      <Main />
      <GameStores />

    </div>

    );
  }


