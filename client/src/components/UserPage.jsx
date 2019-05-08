import React from 'react';
import { Link } from 'react-router-dom';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }
    async componentDidMount() {
        let response = await fetch(this.props.match.url);
        let currentUser = await response.json();
        this.setState({
            user: currentUser
        });
    }
    render() {
        return (
            <div>
                <h1>{this.state.user.name}</h1>
                <p><b>Balance:</b> {this.state.user.balance} RUB</p>
                <p><b>Tasks completed:</b> {this.state.user.statistics}</p>
                <Link to='/'>Back</Link>
                <Link to={`/users/${this.state.user._id}/edit`}>Edit</Link>
            </div>
        )
    }
}
export default UserPage;