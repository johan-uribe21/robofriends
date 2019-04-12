import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: '',
    }
  }


  componentDidMount(){
    // fetch users, parse the json, then update the state with the new users.
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({robots: users}));
  } 

  // use arrow function here to make sure 'this' is here, not in SearchBox input.
  // arrow functions make "this" refer to where the function was created, not called.
  onSearchChange = (event) => {
    //changes state so that the searchfield gets updated as you type.
    this.setState({ searchfield: event.target.value }); 
  }
  
  render(){
    const {robots, searchfield} = this.state;
    // this updates the robot list every time onSearchChange updates the searchfield in state.
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    
    return !robots.length ? // ternary statement
      <h1>Loading</h1> :
      (
        <div className = 'tc'>
          <h1 className = 'f2'>RoboFriends</h1>
          <SearchBox searchChange = {this.onSearchChange}/>
          <Scroll>
            <ErrorBoundary>
              <CardList robots = {filteredRobots} /> 
            </ErrorBoundary>
          </Scroll>
        </div>
      );
  }
};

export default App;