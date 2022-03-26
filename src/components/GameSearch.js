import React, { Component } from 'react'
import {useState, useEffect} from 'react'
import '../styles/GameSearch.css'

class GameSearch extends Component {

    constructor(props){

        super(props);

        this.state = {
            title: "",
            pelit: [],
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
            
            <form onSubmit={this.handleSubmit}>
                <label>
                    Etsi peli
                    <input type="text" value={this.state.title} onChange={this.handleInput} />
                </label>
            </form>
            <br></br>

            <h1>Pelit:</h1> {

                pelit.map((pelit) => (
                  
                    <ul key = { pelit.id }>
                        <h4>Nimi: {pelit.external} </h4>
                        <h5>Halvin: {pelit.cheapest} </h5>
                        <h5>Linkki: {pelit.thumb} </h5>                  
                    </ul>                 
                ))
            }
        </div>
        );    
    }
}

export default GameSearch;