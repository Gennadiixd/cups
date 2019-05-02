import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

class AddTask extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            phone: "",
            isVeg: false,
            isSent: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    handleChange(event) {
        const { name, value, type, checked } = event.target;
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value });
    }
    async handleClick() {
        await fetch('/restaurants',
            {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: this.state.name,
                    phone: this.state.phone,
                    isVeg: this.state.isVeg
                })
            });
        this.setState({ isSent: true });
    }
    render() {
        return (
            <form>
                <input
                    type="text"
                    value={this.state.name}
                    name="name"
                    placeholder="name"
                    onChange={this.handleChange}
                /> <br />
                <input
                    type="tel"
                    value={this.state.phone}
                    name="phone"
                    placeholder="phone"
                    onChange={this.handleChange}
                /> <br />
                <label>
                    <input
                        type="checkbox"
                        name="isVeg"
                        checked={this.state.isVeg}
                        onChange={this.handleChange}
                    /> Vegan options
                </label> <br />
                <button type='button' onClick={this.handleClick}>Add restaurant</button>
                {this.state.isSent && <Redirect to="/restaurants" />}
            </form>
        )
    }
}

export default AddTask;