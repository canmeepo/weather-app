import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchResults extends Component {
  renderWeather = weatherData => {
    const name = weatherData.city.name;
    const id = weatherData.city.id;
    const temps = weatherData.list.map((item, index) => {
      return (
        <li className="list-group-item" key={name}>
          Date: {item.dt_txt} Temperature: {item.main.temp}°C
        </li>
      );
    });

    return (
      <div key={id} className="panel panel-info">
        <div className="panel-heading">
          <div className="panel-title">
            <span className="text-center city-name">
              {name}
            </span>
          </div>
        </div>
        <div className="panel-body">
          <ul className="list-group">
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
