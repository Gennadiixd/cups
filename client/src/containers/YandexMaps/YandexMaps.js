import React from "react";
import { YMaps, Map, Placemark, GeoObject } from 'react-yandex-maps';
import { connect } from "react-redux";
import { fetchCoordinatesAC } from "../../reducers/actions/actions";
import { addCoordinateAC } from "../../reducers/actions/actions";
import { placeMarksOnMapAC } from "../../reducers/actions/actions";

import AddTaskForm from "../../components/Forms/AddTaskForm";
import HashRouter from '../../components/HashRouter';
import Info from "../../components/Forms/Info"
import ShowActiveTasks from "../../components/Forms/ShowActiveTasks";

const mapStateToProps = (state) => ({
  coordinates: state.maps.coordinates,
  isAuth: state.auth.isAuth,
  ownTasks: state.auth.tasks,
  role: state.auth.role
});

class YandexMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      center: [55.751574, 37.573856],
      zoom: 9,
      width: 0,
      height: 0,
      hint: [],
    };
  }
  
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
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
    this.props.placeMarksOnMap();
  }

  render() {
    const mapData = {
      center: this.state.center,
      zoom: this.state.zoom,
    }
    return (
      <div>

        <div className="yMap">
          <YMaps>
            <div>
              <Map
                onClick={(e) => {
                  console.log(e.get('coords'));
                  if (this.props.role==='author')
                  this.setState({ hint: e.get('coords') });
                }}
                width={this.state.width}
                height={this.state.height}
                defaultState={mapData}
                state={{ center: this.props.coordinates[this.props.coordinates.length - 1].mapCenter, zoom: this.state.zoom, }} >

                {this.props.role==='author' ? this.state.hint && <Placemark onDragEnd={(e) => { this.setState({hint : e.originalEvent.target.geometry._coordinates})}} onClick={(e) => { console.log(e.get('coords')); }} geometry={this.state.hint} properties={{
                  balloonContentHeader: ``,
                  balloonContentBody: ``,
                  balloonContentFooter: ``,
                }} modules={
                  ['geoObject.addon.hint']
                } options={{ preset: 'islands#redDotIconWithCaption', draggable: true }} /> : null}

                {this.props.isAuth && this.props.coordinates.map(coordinate => <Placemark key={coordinate.id} geometry={coordinate.coordinates} properties={{
                  balloonContentHeader: `${coordinate.title}`,
                  balloonContentBody: `${coordinate.description}`,
                  balloonContentFooter: `<a href = '#tasks/${coordinate.id}'>Взять задание</a>`,
                }} modules={
                  ['geoObject.addon.balloon', 'geoObject.addon.hint']
                } />)}

                {this.props.ownTasks && this.props.ownTasks.map(coordinate => <Placemark key={coordinate.id} geometry={coordinate.coordinates[0]} properties={{
                  balloonContentHeader: `${coordinate.title}`,
                  balloonContentBody: `${coordinate.description}`,
                  balloonContentFooter: `<a href = '#tasks/${coordinate.id}'>Выполнить задание</a>`,
                }} modules={
                  ['geoObject.addon.balloon', 'geoObject.addon.hint']
                } options={{ preset: 'islands#greenDotIconWithCaption' }} />)}

              </Map>
            </div>
          </YMaps>
        </div>
        <HashRouter />
        {this.props.isAuth ? this.props.role==='author' ?
          <AddTaskForm/> : <ShowActiveTasks/> :
          <Info />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCoordinates: (address) => dispatch(fetchCoordinatesAC(address)),
    //addCoordinates: (coordinates, title, description, addressId = 1, mapCenter) => dispatch(addCoordinateAC(coordinates, title, description, addressId, mapCenter)),
    placeMarksOnMap: () => dispatch(placeMarksOnMapAC()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YandexMaps);
