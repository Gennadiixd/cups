import React from "react";
import { YMaps, Map, Placemark, GeolocationControl } from 'react-yandex-maps';
import { connect } from "react-redux";
import { fetchCoordinatesAC } from "../../reducers/actions/actions";
import { placeMarksOnMapAC } from "../../reducers/actions/actions";
import { convertCoordinatesToAddressAC } from "../../reducers/actions/actions";

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
      zoom: 10.5,
      width: 0,
      height: 0,
      hint: null,
      address: '',
      geolocation: false
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
    if ("geolocation" in navigator) {
      await navigator.geolocation.getCurrentPosition(async (pos) => {
        await this.setState({geolocation : true, center: [pos.coords.latitude, pos.coords.longitude]})
      });
    }
    if (this.props.coordinates.length===1)
    this.props.placeMarksOnMap();
  }



  render() {
    const mapData = {
      center: this.state.center,
      zoom: this.state.zoom,
    }

    const tasks = this.props.coordinates.filter(task => task.status!=='completed');
    let ownTasks = []
    if (this.props.ownTasks)
    ownTasks = this.props.ownTasks.filter(task => task.status!=='completed')
    return (
      <div>

        <div className="yMap">
          <YMaps>
            <div>
              <Map
                onClick={async (e) => {
                  if (this.props.role === 'author') {
                    if (!this.state.hint) {
                      await this.setState({ hint: e.get('coords') });
                      let res = await this.props.convertCoordinatesToAddress(e.get('coords'));
                      let address = res.replace(/^(.*),(.*), (.*), (.*)/, '$3 $4, $2');
                      await this.setState({ address: address });
                    } else {
                      await this.setState({ hint: null })
                    }
                  }
                }}
                width={this.state.width}
                height={this.state.height}
                defaultState={mapData}
                state={{ center: mapData.center, zoom: this.state.zoom, }} >

                {this.state.geolocation &&
                <Placemark geometry={mapData.center} properties={{
                  balloonContentHeader: `Вы Здесь`,
                  balloonContentBody: ``,
                  balloonContentFooter: ``,
                }} options={{ preset: 'islands#darkGreenIcon'}} />}

                {this.props.role === 'author' ? this.state.hint && <Placemark onDragEnd={async (e) => {
                  this.setState({ hint: e.originalEvent.target.geometry._coordinates });
                  let res = await this.props.convertCoordinatesToAddress(e.originalEvent.target.geometry._coordinates);
                  let address = res.replace(/^(.*),(.*), (.*), (.*)/, '$3 $4, $2');
                  await this.setState({ address: address });
                }} onClick={(e) => { console.log(e.get('coords')); }} geometry={this.state.hint} properties={{
                  balloonContentHeader: ``,
                  balloonContentBody: ``,
                  balloonContentFooter: ``,
                }} modules={
                  ['geoObject.addon.hint']
                } options={{ preset: 'islands#redDotIconWithCaption', draggable: true }} /> : null}

                {this.props.isAuth && tasks.map(coordinate => <Placemark key={coordinate.id} geometry={coordinate.coordinates} properties={{
                  balloonContentHeader: `${coordinate.title}`,
                  balloonContentBody: `${coordinate.description}`,
                  balloonContentFooter: this.props.role === 'worker' ? `<a href = '#tasks/${coordinate.id}'>Взять задание</a>` : this.props.role === 'author' ? coordinate.status === 'pending' ? '<h7>Задание ожидает подтверждения</h7>' : '<h7>Задание ожидает выполнения</h7>' : '<h7>Задание ожидает выполнения</h7>',
                }} modules={
                  ['geoObject.addon.balloon', 'geoObject.addon.hint']
                } options={{ preset: coordinate.status !== 'pending' ? 'default' : 'islands#yellowCircleDotIcon' }} />)}


                {ownTasks && this.props.role==='worker' && ownTasks.map(coordinate => <Placemark key={coordinate._id + '111'} geometry={coordinate.coordinates[0]} properties={{
                  balloonContentHeader: `${coordinate.title}`,
                  balloonContentBody: `${coordinate.description}`,
                  balloonContentFooter: coordinate.status !== 'pending' ? `<h7>"Это ваше активное задание"</h7>` : `<h7>"Задание на проверке"</h7>`,
                }} modules={
                  ['geoObject.addon.balloon', 'geoObject.addon.hint']
                } options={{ preset: coordinate.status !== 'pending' ? 'islands#greenDotIconWithCaption' : 'islands#yellowCircleDotIcon' }} />)}

              </Map>
            </div>
          </YMaps>
        </div>
        <HashRouter />
        {this.props.isAuth ? this.props.role === 'author' ?
          <AddTaskForm address={this.state.address} /> : <ShowActiveTasks /> :
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
    convertCoordinatesToAddress: (address) => convertCoordinatesToAddressAC(address),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YandexMaps);
