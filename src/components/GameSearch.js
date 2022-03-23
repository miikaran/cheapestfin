import React, { Component } from 'react'
import {useState, useEffect} from 'react'

class GameSearch extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            pelit: [],
            DataisLoaded: false,
        };
    }

    componentDidMount(){
        
        fetch("https://www.cheapshark.com/api/1.0/games?title='Counter-Strike'")
        .then((res) => res.json())
        .then((json) => {

            this.setState({
                pelit: json, JSONFetched: true
            });
        })
    }

    render() {
        const {JSONFetched, pelit} = this.state;
        if (!JSONFetched) return <div> Odota hetki...</div>;
    
    return (
        <div className="FetchJson">

            <h1>Pelit:</h1> {

                pelit.map((pelit) => (

                    <ul key = { pelit.id }>
                        <h4>Nimi: {pelit.external} </h4>
                        <h5>Halvin: {pelit.cheapest} </h5>
                    </ul>
                ))
            }
        </div>
        );    
    }
}

export default GameSearch;