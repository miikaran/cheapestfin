import React, { Component } from 'react'
import '../styles/GameStores.css'

class GameStores extends Component {

    constructor(props){

        super(props);

        this.state = {
            pelikaupat: [],
            DataisLoaded: false,
        };
    }

    //Hakee dataa cheapsharkin API:sta.
    componentDidMount = () => {

        fetch(`https://www.cheapshark.com/api/1.0/stores`)
        .then((res) => res.json())
        .then((json) => {

            this.setState({
                pelikaupat: json, JSONFetched: true,           
            });

        })
    }

    render() {
        const {JSONFetched, pelikaupat} = this.state;
        if (!JSONFetched) return <div> Odota hetki...</div>;
    
    return (       
        <div className="StoresFetched">
            <br></br>
              {
                pelikaupat.map((pelikaupat) => (     

                    <ul key = { pelikaupat.id }>
                        <h5>{pelikaupat.storeName}</h5>                                             
                    </ul>                 
                ))
            }
        </div>
        );    
    }
}

export default GameStores;