import React, { Component } from 'react'
import Main from './components/main.js'
import './styles/App.css'
import cheapshark from './assets/cheapshark.png'

export default function App() {

    return (

      <div>

        <div className="cheapsharktext">
        Game data from CheapShark's open API.
        <br></br>
        <a href="https://apidocs.cheapshark.com/">API DOCS</a>
        <br></br>
        <img src = {cheapshark} width = "100px"></img>

        </div>

      <Main />
      </div>

    );
  }


