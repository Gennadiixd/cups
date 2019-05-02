import React from "react";
import { YMaps, Map, Placemark, GeoObject } from 'react-yandex-maps';
import { connect } from "react-redux";
import { fetchCoordinatesAC } from "../redux/actions/actions"
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
    let res = await fetch("/tasks/getall");
    let data = await res.json();    
    for (let i = 0; i < data.length; i++) {
      this.props.addCoordinates(data[i].adress[0], data[i].title ,data[i].description)
    }    
  }

  render() {
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

              {this.props.coordinates.map(coordinate => <Placemark onClick={()=>console.log(coordinate.id)} geometry={coordinate.coordinates} properties={{
                balloonContentHeader: `${coordinate.title}`,
                balloonContentBody: `${coordinate.description}`,
                balloonContentFooter: `ВЗЯТЬ ЗАДАНИЕ`,
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
    fetchCoordinates: (adress) => dispatch(fetchCoordinatesAC(adress)),
    addCoordinates : (coordinates, title, description) => dispatch(addCoordinateAC(coordinates,title, description))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YandexMaps);
