import React, { Component } from 'react'
import GameSearch from './components/GameSearch.js'
import GameStores from './components/GameStores.js'
import './styles/App.css'

export default function App() {

    return (

      <div>
      <GameStores />
      <GameSearch />
      </div>

    );
  }


