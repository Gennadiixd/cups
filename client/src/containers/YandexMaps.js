import React from "react";
import { YMaps, Map, Placemark, GeoObject } from 'react-yandex-maps';
import { connect } from "react-redux";
import { addCoordinateAC } from "../redux/actions/actions"

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

  async getAPIKey() {
    let res = await fetch('/key');
    let APIKey = res.text()
    return APIKey;
  }

  placeMark = async (event) => {
    event.preventDefault();
    const APIkey = await this.getAPIKey();
    console.log(APIkey, this.state.input);
    let res = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${APIkey}&format=json&geocode=Москва ${this.state.input}`)
    let data = await res.json();
    let coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
    coordinates = coordinates.split(' ')
    let long = Number(coordinates[0]);
    let lat = Number(coordinates[1])
    let arrayWithCoordinates = [lat, long];
    console.log(arrayWithCoordinates)
    this.props.addCoordinate(arrayWithCoordinates);
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YandexMaps);
