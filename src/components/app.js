import React, { Component } from 'react';
import SearchBar from '../containers/searchBar';
import ResultList from '../containers/resultList';
import CurrentWeather from '../components/currentWeather';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ResultList />
      </div>
    );
  }
}
