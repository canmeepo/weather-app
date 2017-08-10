import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchResults extends Component {
  renderWeather = weatherData => {
    const name = weatherData.city.name;
    const id = weatherData.city.id;
    const temps = weatherData.list.map((item, index) => {
      return (
        <li className="list-group-item" key={name}>
          Date: {item.dt_txt} Temperature: {Math.floor((item.main.temp - 273) * 100) / 100} °С {}
        </li>
      );
    });

    return (
      <div key={id}>
        <div>
          <span>
            {name}
          </span>
        </div>
        <div>
          <ul>
            {temps}
          </ul>
        </div>
      </div>
    );
  };

  render() {
    const { weather } = this.props;
    return (
      <div>
        {weather.map(this.renderWeather)}
      </div>
    );
  }
}

const mapStateToProps = ({ weather }) => ({
  weather
});

export default connect(mapStateToProps)(SearchResults);
