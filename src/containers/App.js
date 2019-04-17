import React, { Component } from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';
import {setSearchField, requestRobots} from '../actions';


const mapStateToProps = state => {
  return {
    // it is now state.searchRobots.searchField because that is the props I am passing in index.js
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

// the dispatch is what sends the actions object to the reducer
// we get dispatch from redux
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {

  componentDidMount(){
    this.props.onRequestRobots();
  } 
  
  render(){

    const {searchField, onSearchChange, robots, isPending} = this.props;
    // this updates the robot list every time onSearchChange updates the searchfield in state.
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    
    return isPending ? // ternary statement
      <h1>Loading</h1> :
      (
        <div className = 'tc'>
          <h1 className = 'f2'>RoboFriends</h1>
          <SearchBox searchChange = {onSearchChange}/>
          <Scroll>
            <ErrorBoundary>
              <CardList robots = {filteredRobots} /> 
            </ErrorBoundary>
          </Scroll>
        </div>
      );
  }
};

// tells the component to suscribe to changes in the store
export default connect(mapStateToProps, mapDispatchToProps)(App);