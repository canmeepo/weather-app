import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class CurrentWeather extends React.Component {
  render() {
    const { isFetchingCurrent, weather } = this.props;

    if (weather.error) {
      return (
        <p>
          error : {weather.error}
        </p>
      );
    }

    return (
      <div>
        <p>
          {' '}temp: {weather.current.temp};
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { weather } = state;

  return {
    weather
  };
};

CurrentWeather = connect(mapStateToProps)(CurrentWeather);

export default CurrentWeather;
