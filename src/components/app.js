import React, { Component } from 'react';
import SearchBar from '../containers/searchBar';
import ResultList from '../containers/resultList';

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
