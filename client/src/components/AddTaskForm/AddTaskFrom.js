import React from "react";
import { connect } from "react-redux";
import { fetchCoordinatesAC } from "../../redux/actions/actions";

class AddTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            adress: '',
            expDate: '',
        };
    }

    updateTitle = title => {
        this.setState({ title });
    };

    updateDescription = description => {
        this.setState({ description });
    };

    updateAdress = adress => {
        this.setState({ adress });
    };

    updateExpDate = expDate => {
        this.setState({ expDate });
    };

    async createTask(event) {
        event.preventDefault();
        this.props.fetchCoordinates(event.target.adress.value, event.target.title.value, event.target.description.value, event.target.expDate.value);       
    }


    render() {
        return (
            <form onSubmit={(event) => this.createTask(event)}>
                <div>
                    <label>title: </label>
                    <input type="text" name="title" value={this.state.title} onChange={event => this.updateTitle(event.target.value)} />
                </div>
                <div>
                    <label>description: </label>
                    <input type="text-field" name="description" value={this.state.description} onChange={event => this.updateDescription(event.target.value)} />
                </div>
                <div>
                    <label>adress: </label>
                    <input type="text" name="adress" value={this.state.adress} onChange={event => this.updateAdress(event.target.value)} />
                </div>
                <div>
                    <label>expDate: </label>
                    <input type="datetime-local" name="expDate" value={this.state.expDate} onChange={event => this.updateExpDate(event.target.value)} />
                </div>
                <div>
                    <button type="submit">Create TASK</button>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCoordinates: (adress, title, description, expDate) => dispatch(fetchCoordinatesAC(adress, title, description, expDate)),
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(AddTaskForm);