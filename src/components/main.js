import React, { Component } from 'react'
import '../styles/main.css'
import { Icon } from '@iconify/react'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import {CategoryScale } from 'react-chartjs-2'

class main extends Component {

    constructor(props){

        super(props);

        this.state = {
            title: "",
            maxhinta: [],
            minhinta: "",
            pelit: [ ],
            DataisLoaded: false,
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleUpperInput = this.handleUpperInput.bind(this);
        this.handleLowerInput = this.handleLowerInput.bind(this);
        this.handlePriceSubmit = this.handlePriceSubmit.bind(this);

    }

    // Handle inputti ja submitti käsittelee muutokset input kentässä ja
    // vaihtaa parametrejä sen mukaan.
    handleInput (event) {
        this.setState({ title: event.target.value});
    }

    handleUpperInput (event) {
        this.setState({ maxhinta: event.target.value});
    }

    handleLowerInput (event) {
        this.setState({ minhinta: event.target.value});
    }

    handlePriceSubmit (event) {
        console.log('Etsitään peliä: ' + this.state.maxhinta);
        event.preventDefault();   
    }

    //Hakee dataa cheapsharkin API:sta.
    componentDidMount = () => {

        fetch(`api/1.0/deals?title='counter strike'&pageSize=5`)
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

            fetch(`api/1.0/deals?title='${this.state.title}'&pageSize=5&upperPrice=${this.state.maxhinta}&lowerPrice=${this.state.minhinta}`)
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
        if (!JSONFetched) return <h1> Odota hetki...</h1>;

        // Asettaa chartjs parametrit.
        const pricecomparison = {
            labels: ['', '',],
            datasets: [
              {
                label: 'HINTA VERTAILU (€)',
                lineTension: 0.5,
                fill: true,
                backgroundColor: 'rgb(0,191,255)',
                borderColor: 'white',
                borderWidth: 2,
                data: pelit.map(pelit => (pelit.normalPrice * 0.9, pelit.salePrice * 0.9))
              }
            ]
          }

    return (     
          
        <div className="FetchJson">
 
        <br></br>
            <h1>CHEAPE$TFIN</h1>
            <h3>Täältä löydät peleille parhaat hinnat ja statistiikat!</h3>

            <form onSubmit={this.handleSubmit}>
                <label>                         
                    <input type="search" placeholder="  Etsi peliä....." value={this.state.title} onChange={this.handleInput} />                             
                </label>                             
            </form> 
            
            <br></br>

            <h5 className="hakuehdot">CUSTOMOI HAKUEHTOJA 🔀</h5>
            
            <form onSubmit={this.handlePriceSubmit}>
                <label>       
                    <input className = "maxhinta" type="number" placeholder="MAX HINTA (€)" value = {this.state.maxhinta} onChange={this.handleUpperInput} />
                    <input className = "minhinta" type="number" placeholder="MIN HINTA (€)"  value = {this.state.minhinta} onChange={this.handleLowerInput} />                        
                </label>                        
            </form> 
            
              {
                pelit.map((pelit) => (   
                    
                    <ul key = { pelit.id }>
                        <fieldset><img className = "gameImage" src = {pelit.thumb}></img>
                        <fieldset className="datachart">
                           <p>Kaavio vertailee kaikkien tätä peliä myyvien verkkokauppojen hintoja ja ottaa niistä halvimman 
                            alennuksessa olevan hinnan ja halvimman normaalin hinnan. <span style= {{fontSize: "10px", color:"black", backgroundColor: "white"}}>Järjestys: alennettu hinta, normaali hinta</span></p>
                        <Line
                            data={pricecomparison}
                            options={{
                                title:{
                                display:true,
                            },
                                legend:{
                                display: true,
                                position:'right'
                                }
                            }}
                        />
                        </fieldset>
                        <h5><mark>PELIN NIMI:<br></br></mark>{pelit.title}</h5>
                        <h5><mark>STEAMIN ARVOSTELU:</mark><br></br>{pelit.steamRatingText}: {pelit.steamRatingPercent} %</h5>
                        <h5><mark>NORMAALI HINTA:<br></br></mark>{pelit.normalPrice} $ = n. {pelit.normalPrice*0.9} €</h5>
                        <h5><mark>HALVIN HINTA TÄLLÄ HETKELLÄ:<br></br></mark>{pelit.salePrice} $ = n. {pelit.salePrice*0.9} €</h5>
                        <h5><mark>SÄÄSTÄT NORMAALI HINNASTA:</mark><br></br>{pelit.savings} %</h5>
                        <h5><a href={'https://www.cheapshark.com/redirect?dealID=' + pelit.dealID}><strong>LINKKI VERKKOKAUPPAAN</strong></a></h5>  
                        </fieldset>                       
                    </ul>   
                    
                                  
                ))
            }
        </div>
        );    
    }
}

export default main;