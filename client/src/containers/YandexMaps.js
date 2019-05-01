import React from "react";
import { YMaps, Map, Placemark, GeoObject } from 'react-yandex-maps';
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  coordinates: state.coordinates,
});

class YandexMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentWillMount() {
    await fetch("/tasks/getall");
  }

  render() {
    const coordinates = [];
    for (let i = 0; i <  this.props.coordinates.length; i++) {      
      coordinates.push(this.props.coordinates[i].coordinates)
    }

    const mapData = {
      center: [55.751574, 37.573856],
      zoom: 9,
    };

    return (
      <div className="map">
        <YMaps>
          <div>
            This is Yandex Map!
            <Map defaultState={mapData}>
              {coordinates.map(coordinate => <Placemark geometry={coordinate} />)}
            </Map>
          </div>
        </YMaps>
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
)(YandexMaps);
