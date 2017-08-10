import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/';

class SearchBar extends React.Component {
  PlaceSelected(place) {
    let city = place.formatted_address || place.name;
    this.props.onFetchWeather(city);
  }

  render() {
    return <input placeholder="Укажите место" />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchWeather: function(city) {
      return dispatch(fetchWeather(`q=${city}`));
    }
  };
}

SearchBar = connect(null, mapDispatchToProps)(SearchBar);

export default SearchBar;
