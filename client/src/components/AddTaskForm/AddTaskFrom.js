import React from "react";
import { connect } from "react-redux";

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

        
        // console.log(event.target.title.value);
        // const resp = await fetch('/tasks/savetask', {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ title: event.target.title.value, description: event.target.description.value, adress: event.target.adress.value, expDate: event.target.expDate.value }),
        // });
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
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(AddTaskForm);