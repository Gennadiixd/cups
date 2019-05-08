import React from "react";
import { YMaps, Map, Placemark, GeoObject } from 'react-yandex-maps';
import { connect } from "react-redux";
import { fetchCoordinatesAC } from "../../reducers/actions/actions";
import { addCoordinateAC } from "../../reducers/actions/actions";

import AddTaskForm from "../../components/AddTaskForm/AddTaskFrom";
import HashRouter from '../../components/HashRouter';
import Info from "../../components/Auth/Info"


const mapStateToProps = (state) => ({
  coordinates: state.maps.coordinates,
  isAuth: state.auth.isAuth,
  ownTasks: state.auth.tasks,
});

class YandexMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      center: [55.751574, 37.573856],
      zoom: 9,
      width: 0,
      height: 0
    };
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight - 56 });
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  placeMark = async (event) => {
    event.preventDefault();
    await this.setState({ center: this.props.coordinates[this.props.coordinates.length - 1].coordinates })
  }

  inputHandler = async (input) => {
    this.setState({ input: input })
  }

  updateInput = input => {
    this.setState({ input });
  };

  async componentWillMount() {
    let res = await fetch("/tasks/getall");
    let data = await res.json();
    for (let i = 0; i < data.length; i++) {
      this.props.addCoordinates(data[i].adress[0], data[i].title, data[i].description, data[i]._id, [55.751574, 37.573856])
    }
  }

  render() {
    const mapData = {
      center: this.state.center,
      zoom: this.state.zoom,
    }
    return (
      <div>
        <div className="test col-lg-6">
          <YMaps>
            <div>
              <Map width={this.state.width}
                height={this.state.height}
                defaultState={mapData}
                state={{ center: this.props.coordinates[this.props.coordinates.length - 1].mapCenter, zoom: this.state.zoom, }} >

                {this.props.coordinates.map(coordinate => <Placemark key={coordinate.title + coordinate.id} geometry={coordinate.coordinates} properties={{
                  balloonContentHeader: `${coordinate.title}`,
                  balloonContentBody: `${coordinate.description}`,
                  balloonContentFooter: `<a href = '#${coordinate.id}'>Взять задание</a>`,
                }} modules={
                  ['geoObject.addon.balloon', 'geoObject.addon.hint']
                } />)}

                

              </Map>
            </div>
          </YMaps>
        </div>
        <HashRouter />
        {this.props.isAuth ?
          <AddTaskForm /> :
          <Info />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCoordinates: (adress) => dispatch(fetchCoordinatesAC(adress)),
    addCoordinates: (coordinates, title, description, adressId = 1, mapCenter) => dispatch(addCoordinateAC(coordinates, title, description, adressId, mapCenter))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YandexMaps);
