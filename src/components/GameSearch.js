import React, { Component } from 'react'
import {useState, useEffect} from 'react'
import '../styles/GameSearch.css'
import 'react-bootstrap'
import logo from '../media/logo2.png'

class GameSearch extends Component {

    constructor(props){

        super(props);

        this.state = {
            title: "",
            pelit: [ ],
            DataisLoaded: false,
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handle inputti ja submitti käsittelee muutokset input kentässä.
    handleInput (event) {
        this.setState({ title: event.target.value});
    }

    handleSubmit (event) {
        console.log('Etsitään peliä: ' + this.state.title);
        event.preventDefault();   
    }

    //Hakee dataa cheapsharkin API:sta.
    componentDidMount = () => {

        fetch(`https://www.cheapshark.com/api/1.0/games?title='${this.state.handleInput}'`)
        .then((res) => res.json())
        .then((json) => {

            this.setState({
                pelit: json, JSONFetched: true,           
            });

            console.log(this.state.handleInput);

        })
    }

    //Jos title muuttuu input- kentässä, niin lista päivittyy sen mukaan.
    componentDidUpdate(prevProps, prevState) {
        if (this.state.title !== prevState.title){

            fetch(`https://www.cheapshark.com/api/1.0/games?title='${this.state.title}'`)
            .then((res) => res.json())
            .then((json) => {
    
                this.setState({
                    pelit: json, JSONFetched: true,           
                });   
                console.log(this.state.handleInput);   
            })           
        }
    }

    render() {
        const {JSONFetched, pelit} = this.state;
        if (!JSONFetched) return <div> Odota hetki...</div>;
    
    return (       
        <div className="FetchJson">

            <br></br>

            <img src = {logo} className = "logo"></img>
            <form onSubmit={this.handleSubmit}>
                <label>                 
                    <input type="search" placeholder="KIRJOITA TÄHÄN PELIN NIMI" value={this.state.title} onChange={this.handleInput} />
                </label>               
            </form>
            <br></br>
              {
                pelit.map((pelit) => (     

                    <ul key = { pelit.id }>
                        <fieldset><img className = "gameImage" src = {pelit.thumb}></img><h5><mark>PELIN NIMI:<br></br></mark>{pelit.external}</h5>
                        <h5><mark>HALVIN:<br></br> </mark>{pelit.cheapest} $ </h5>   
                        <h5><a href={'http://store.steampowered.com/app/' + pelit.steamAppID}><strong>LINKKI VERKKOKAUPPAAN</strong></a></h5>   
                        </fieldset>   
                    </ul>                 
                ))
            }
        </div>
        );    
    }
}

export default GameSearch;