import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather, fetchForecast } from '../actions/';
import Autocomplete from 'react-google-autocomplete';

class SearchBar extends React.Component {
  PlaceSelected(place) {
    let city = place.formatted_address || place.name;
    this.props.onFetchFotrecast(city);
    this.props.onFetchWeather(city);
  }

  render() {
    return (
      <Autocomplete
        placeholder="City"
        ref="city"
        onPlaceSelected={this.PlaceSelected.bind(this)}
        style={{ width: '100%' }}
        types={['(cities)']}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchWeather: function(city) {
      return dispatch(fetchWeather(`q=${city}`));
    },
    onFetchFotrecast: function(city) {
      return dispatch(fetchForecast(`q=${city}`));
    }
  };
}

SearchBar = connect(null, mapDispatchToProps)(SearchBar);

export default SearchBar;
