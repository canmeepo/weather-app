import React from 'react';
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
    if (!weather.current || isFetchingCurrent) {
      return false;
    }

    return (
      <div>
        <div>
          {' '}Temperature {weather.current.main.temp} °C
        </div>
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
