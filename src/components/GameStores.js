import React, { Component } from 'react'

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
        const {pelikaupat} = this.state;

    return (       
        <div className="StoresFetched">
            <br></br>
              {
                pelikaupat.map((pelikaupat) => (     

                    <ol key = { pelikaupat.id }>
                        <img src = {'https://www.cheapshark.com/' + pelikaupat.images.logo}></img>                                     
                    </ol>                 
                ))
            }
        </div>
        );    
    }
}

export default GameStores; 