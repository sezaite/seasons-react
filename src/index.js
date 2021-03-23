import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    //special f-ion. non required. iskvieciama kiekviena karta kai app clases objektas sukuriamas (kaip ir oop)
    constructor(props) {
        super(props); // tam, kad tevo konstruktorius butu iskviestas, nes siaip constructorius overridina tevo 
        this.state = { lat: null, errorMessage: '' }; //state object iniciavimas. po iniciavimo bus pasiekiamas visoje klaseje
        //kai pakeiciam state, render metodas is naujo pasileidzia. todel iniciavimus reikia iskelti is render (ne tik iniciavimus, bet tai, ko nenori, kad vel uzsikrovinetu)
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({ lat: position.coords.latitude }); //butinai naudoti setState, no direct asignments
            },
            (err) => {
                this.setState({ errorMessage: err.message });
            }
        );
    }
    //render() is required
    render() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <div>Latitude: {this.state.lat}</div>
        }
        //jei vienas is virsutiniu suveikia, tai iki sito neprieis vis tiek 
        return <div>Loading...</div>
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));