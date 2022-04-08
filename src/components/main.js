import React, { Component } from 'react'
import '../styles/main.css'
import {useState} from 'react'
import { Icon } from '@iconify/react'
import { Line } from 'react-chartjs-2'
import {Chart} from 'chart.js/auto'
import {Bar} from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';

class main extends Component {

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

    // Handle inputti ja submitti käsittelee muutokset input kentässä ja
    // vaihtaa titlen sen mukaan.
    handleInput (event) {
        this.setState({ title: event.target.value});
    }

    handleSubmit (event) {
        console.log('Etsitään peliä: ' + this.state.title);
        event.preventDefault();   
    }

    //Hakee dataa cheapsharkin API:sta.
    componentDidMount = () => {

        fetch(`https://www.cheapshark.com/api/1.0/deals?title='counter strike'`)
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

            fetch(`https://www.cheapshark.com/api/1.0/deals?title='${this.state.title}'`)
            .then((res) => res.json())
            .then((json) => {
    
                this.setState({
                    pelit: json, JSONFetched: true, 
                });   
                console.log(this.state.handleInput);   
            })                     
        }
    }


    // Renderöi haetut json datat ja palauttaa ne jsx muodossa sivulle.

    render() {
        const {JSONFetched, pelit} = this.state;
        if (!JSONFetched) return <div> Odota hetki...</div>;

        const state = {
            labels: ['January', 'February', 'March',
                     'April', 'May'],
            datasets: [
              {
                label: 'Game prices',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: pelit.map(pelit => (pelit.salePrice, pelit.normalPrice))
              }
            ]
          }

  
    return (     
          
        <div className="FetchJson">

            <br></br>

            <h1>CHEAPE$TFIN</h1>
            <h3>Täältä löydät peleille parhaat hinnat!</h3>

            <form onSubmit={this.handleSubmit}>
                <label>    

                    <Icon icon="bi:search" className="searchicon"/>                       
                    <input type="search" placeholder="   Etsi peliä....." value={this.state.title} onChange={this.handleInput} />                  
            
                </label>               
            </form>
            <br></br>
              {
                pelit.map((pelit) => (     

                    <ul key = { pelit.id }>
                        <fieldset><img className = "gameImage" src = {pelit.thumb}></img>
                        <h5><mark>PELIN NIMI:<br></br></mark>{pelit.title}</h5>
                        <h5><mark>STEAMIN ARVOSTELU:</mark><br></br>{pelit.steamRatingText}: {pelit.steamRatingPercent} %</h5>
                        <h5><mark>NORMAALI HINTA:<br></br></mark>{pelit.normalPrice} $ = n. {pelit.normalPrice*0.9} €</h5>
                        <h5><mark>HALVIN HINTA TÄLLÄ HETKELLÄ:<br></br></mark>{pelit.salePrice} $ = n. {pelit.salePrice*0.9} €</h5>
                        <h5><mark>SÄÄSTÄT NORMAALI HINNASTA:</mark><br></br>{pelit.savings} %</h5>
                        <h5><a href={'https://www.cheapshark.com/redirect?dealID=' + pelit.dealID}><strong>LINKKI VERKKOKAUPPAAN</strong></a></h5>                
                        </fieldset>  

                        <Bar
                            data={state}
                            options={{
                                title:{
                                display:true,
                                text:'Average Rainfall per month',
                                fontSize:20
                                },
                                legend:{
                                display:true,
                                position:'right'
                                }
                            }}
                            />
                    </ul>                 
                ))
            }
        </div>
        );    
    }
}

export default main;