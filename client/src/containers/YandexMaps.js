import React from "react";
import { YMaps, Map, Placemark, GeoObject } from 'react-yandex-maps';
import { connect } from "react-redux";
import { addCoordinateAC } from "../redux/actions/actions"
import { fetchCoordinatesAC } from "../redux/actions/actions"

const mapStateToProps = (state) => ({
  coordinates: state.coordinates,
});

class YandexMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  placeMark = async (event) => {
    event.preventDefault();
    this.props.fetchCoordinates(this.state.input);
  }

  inputHandler = async (input) => {
    this.setState({ input: input })
  }

  updateInput = input => {
    this.setState({ input });
  };

  async componentWillMount() {
    await fetch("/tasks/getall");
  }

  render() {
    const coordinates = [];
    for (let i = 0; i < this.props.coordinates.length; i++) {
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
            <Map width='500px' height='500px' defaultState={mapData}>
              {coordinates.map(coordinate => <Placemark geometry={coordinate} properties={{
                balloonContentHeader: "Task Name",
                balloonContentBody: "Task Description",
                balloonContentFooter: "да что угодно",
              }} modules={
                ['geoObject.addon.balloon', 'geoObject.addon.hint']
              } />)}
            </Map>
          </div>
        </YMaps>
        <form >
          <label>
            <input type="text" name="Adress" value={this.state.input} onChange={event => this.inputHandler(event.target.value)} />
          </label>
          <button className='getCoordinates' onClick={event => this.placeMark(event)}>
            Place Mark
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCoordinate: (coordinates) => dispatch(addCoordinateAC(coordinates)),
    fetchCoordinates: (adress) => dispatch(fetchCoordinatesAC(adress))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YandexMaps);
