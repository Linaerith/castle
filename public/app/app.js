import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bulma/bulma';

//const json = require('json-loader!C:/Users/grond/Desktop/ESILV/S8/WAA/Workshop3/castle/public/finalList.json');
const people = [
 {
  HotelName: " La Bonne Étape ",
  HotelChef: "  Jany Gleize",
  HotelUrl: " https://www.relaischateaux.com/us/france/bonneetape-alpes-de-haute-provence-chateau-arnoux",
  RestaurantName: " La Bonne Étape",
  RestaurantPriceRange: "  Prix - De 35 € à 75 €",
  RestauChef: "  Jany Gleize"
 },
 {
  HotelName: " Brittany & Spa ",
  HotelChef: "  Loic Le Bail",
  HotelUrl: " https://www.relaischateaux.com/us/france/brittany-finistere-roscoff",
  RestaurantName: " Le Brittany",
  RestaurantPriceRange: "  Prix - De 58 € à 68 €",
  RestauChef: "  Loic Le Bail"
}]
/*

const filepath = "C:/Users/grond/Desktop/ESILV/S8/WAA/Workshop3/castle/public/finalList.json";

// Get content from file
 var contents = fs.readFileSync(filepath);
// Define to JSON type
 var jsonContent = JSON.parse(contents);
*/

function searchingFor(term){
  return function(x){
    return x.first.toLowerCase().includes(term.toLowerCase()) || !term;
  }
}
class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      people: people,
    //  term: '',
    }
    //this.searchHandler = this.searchHandler.bind(this);
}

searchHandler(event){
  this.setState({term: event.target.value})
}

  render() {
    const{term, people} = this.state;
    return (
      <div className ="App">
     <form>
      <input type="text"
              //onChange={this.searchHandler}
              //value = {term}
              />
      </form>
        {
          people
          //.filter(searchingFor(term))
          .map(obj =>
        <div>
          <h1>{obj.HotelUrl}</h1>
          <h2>{obj.HotelName}</h2>
          <h3>{obj.HotelChef}</h3>
          <h4>{obj.HotelUrl}</h4>
          <h5>{obj.RestaurantName}</h5>
          <h6>{obj.RestaurantPriceRange}</h6>
          <h7>{obj.RestauChef}</h7>
        </div>)
      }
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
export default App;
