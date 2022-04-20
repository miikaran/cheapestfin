import React, { Component } from 'react'
import '../styles/main.css'
import { Icon } from '@iconify/react'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import {CategoryScale } from 'react-chartjs-2'
import loading from '../assets/loading anim.gif'

class main extends Component {

    constructor(props){

        super(props);

        this.state = {
            title: "",
            maxhinta: "9999",
            minhinta: "0",
            pelit: [ ],
            DataisLoaded: false,
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleUpperInput = this.handleUpperInput.bind(this);
        this.handleLowerInput = this.handleLowerInput.bind(this);
        this.resetAll = this.resetAll.bind(this);
    }

    // handlet käsittelee muutokset input kentässä ja
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

    resetAll () {

        this.setState({maxhinta: "9999"});
        this.setState({title: " "});
        this.setState({minhinta: "0"});

    }

    //Hakee dataa cheapsharkin API:sta.
    componentDidMount = () => {

        fetch(`api/1.0/deals?`)
        .then((res) => res.json())
        .then((json) => {

            this.setState({
                pelit: json, JSONFetched: true,           
            });
        })
    }

    //Jos title muuttuu input- kentässä, niin lista päivittyy sen mukaan.
    componentDidUpdate(prevState) {
        if (this.state.title !== prevState.title){

            fetch(`api/1.0/deals?title='${this.state.title}'&pageSize=5&upperPrice=${this.state.maxhinta}&lowerPrice=${this.state.minhinta}`)
            .then((res) => res.json())
            .then((json) => {
    
                this.setState({
                    pelit: json, JSONFetched: true, 
                });
            })                     
        }
    }
    
    // Renderöi haetut json datat ja palauttaa ne sivulle.
    render() {
        const {JSONFetched, pelit} = this.state;
        if (!JSONFetched) return <h1 style={{textAlign: 'center'}}> Odota hetki...<br></br><img src={loading} width="100%"></img></h1>

        // Asettaa chartjs parametrit.
        const pricecomparison = {
            labels: ['NORMAALI HINTA', 'ALENNETTU HINTA',],
            datasets: [
              {
                label: 'HINTA VERTAILU (€)',
                lineTension: 0.5,
                fill: true,
                backgroundColor: 'rgb(0,191,255)',
                borderColor: 'white',
                borderWidth: 2,
                data: [pelit.map(pelit => (pelit.normalPrice * 0.9)), pelit.map(pelit => (pelit.salePrice * 0.9))]
              }
            ]
          }

    return (     
          
        <div className="FetchJson">  

            <br></br>

            <h1>CHEAPE$TFIN</h1>
            <h3>Täältä löydät peleille parhaat hinnat ja statistiikat!</h3>
            <form>
                <label>                         
                    <input type="search" placeholder="  Etsi peliä....." value={this.state.title} onChange={this.handleInput} />                             
                </label>                             
            </form>

            <br></br>

            <button className="tyhjennä" onClick={this.resetAll}>NOLLAA HAKUEHDOT</button>
            <h5 className="customoi">CUSTOMOI HAKUEHTOJA 🔀</h5>            
            <form>
                <h6>MAX HINTA -</h6>
                <h6 className="min">MIN HINTA -</h6>
                <label>  
                    <input className = "maxhinta" type="number" value={this.state.maxhinta} onChange={this.handleUpperInput} />
                    <input className = "minhinta" type="number" value={this.state.minhinta} onChange={this.handleLowerInput} />                     
                </label>                       
            </form>        
              {
                pelit.map((pelit, key) => (   
                    
                    <ul key = { key }>
                        <fieldset><img className = "gameImage" src = {pelit.thumb}></img>
                        <fieldset className="datachart">
                           <p>Kaavio vertailee kaikkien tätä peliä myyvien verkkokauppojen hintoja ja ottaa niistä halvimman 
                            normaalin hinnan ja halvimman alennuksessa olevan hinnan. <span style= {{fontSize: "10px", color:"black", backgroundColor: "white"}}>Järjestys: normaali hinta, alennettu hinta</span></p>
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