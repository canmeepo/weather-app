import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCity } from '../actions';
import CurrentWeather from '../components/currentWeather';

class SearchResults extends Component {
  render() {
    const { isFetching, weather } = this.props;

    if (weather.error) {
      return (
        <p>
          Error {weather.error}
        </p>
      );
    }

    let city = '';

    if (weather.current) {
      city = weather.current.name + ', ' + weather.current.sys.country;
    }

    return (
      <div>
        <p>
          {' '}City name: {city}{' '}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { location, weather } = state;

  return {
    location,
    weather
  };
};

SearchResults = connect(mapStateToProps)(SearchResults);

export default SearchResults;
