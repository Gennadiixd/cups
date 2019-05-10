import React from "react";
import {connect} from "react-redux";
import {fetchCoordinatesAC} from "../../reducers/actions/actions";
import {Button, Form} from 'react-bootstrap';

const mapStateToProps = (state, ownProps) => ({
    name: state.auth.name,
})
class AddTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            address: 'Jeffreys Маросейка 15',
            expDate: '',
        };
    }

    updateTitle = title => {
        this.setState({ title });
    };

    updateDescription = description => {
        this.setState({ description });
    };

    updateAddress = address => {
        this.setState({ address });
    };

    updateExpDate = expDate => {
        this.setState({ expDate });
    };

    async createTask(event) {
        event.preventDefault();
        this.props.fetchCoordinates(event.target.address.value, event.target.title.value, event.target.description.value, event.target.expDate.value, this.props.name);       
    }


    render() {
        console.log('name=',this.props.name,'author=', this.state.author)
        return (
            <div className='task col-lg-4'>
            <Form style={{'paddingTop' : '10px'}} onSubmit={(event) => this.createTask(event)}>
                <Form.Text style={{textAlign : 'center'}} as="h5">Создание заказа</Form.Text>
                <Form.Group>
                    <Form.Label>Адрес: </Form.Label>
                    <Form.Control type="text" name="address" value={this.state.address} onChange={event => this.updateAddress(event.target.value)} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Наименование: </Form.Label>
                    <Form.Control type="text" name="title" value={this.state.title} onChange={event => this.updateTitle(event.target.value)} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Подробно опишите суть задания: </Form.Label>
                    <Form.Control className="noResize" as="textarea" rows="5" type="text-field" name="description" value={this.state.description} onChange={event => this.updateDescription(event.target.value)} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Выполнить до: </Form.Label>
                    <Form.Control type="datetime-local" name="expDate" value={this.state.expDate} onChange={event => this.updateExpDate(event.target.value)} required />
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="submit">Добавить</Button>
                </Form.Group>
            </Form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCoordinates: (address, title, description, expDate, author) => dispatch(fetchCoordinatesAC(address, title, description, expDate, author)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddTaskForm);