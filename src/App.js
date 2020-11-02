import React from 'react';
import './App.css';
import DogBar from './components/DogBar'
import DogInfo from './components/DogInfo'


class App extends React.Component {
  
  state={
    dogs: [],
    selectedDog: "",
    filterOn: false
  }

  componentDidMount() {
    fetch('http://localhost:3000/pups')
      .then(resp => resp.json())
      .then(dogs => this.setState({dogs}))
  }

  selectDog = dog => {
    this.setState({
      selectedDog: dog
    })
  }
  
  updateHandler = () => {
    let updatedDog = {...this.state.selectedDog, isGoodDog: !this.state.selectedDog.isGoodDog}
    fetch(`http://localhost:3000/pups/${updatedDog.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify(updatedDog)
    })
      .then(resp => resp.json())
      .then(dogResp => {
        const newDogs = this.state.dogs.map(dog => {
          if(dog.id === dogResp.id) {
            return dogResp
          } else {
            return dog
          }
        })
        this.setState({dogs: newDogs, selectedDog: dogResp})
      })
  }

  toggleFilter = () => {
    this.setState((prevState) => ({filterOn: !prevState.filterOn}))
  }

  filterDogs = () => {
    if(this.state.filterOn) {
      return this.state.dogs.filter(dog => dog.isGoodDog)
    } else {
      return this.state.dogs
    }
  }

  render() {
    return (
      <div className="App">
        <div id="filter-div">
          <button id="good-dog-filter" onClick={this.toggleFilter}>{this.state.filterOn ? "Filter good dogs: ON" : "Filter good dogs: OFF"}</button>
        </div>
        <div id="dog-bar">
          <DogBar dogs={this.filterDogs()} selectDog={this.selectDog}/>
        </div>
        <div id="dog-summary-container">
          <h1>DOGGO:</h1>
          <div id="dog-info">
          <DogInfo dog={this.state.selectedDog} updateHandler={this.updateHandler}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
