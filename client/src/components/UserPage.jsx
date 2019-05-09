import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
    name: state.auth.username
})
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
            !this.state.user ?
                <Redirect to='/404' /> :
                <div>
                    <h1>{this.props.name}</h1>
                    <p>{this.state.user.email}</p>
                    <p><b>Balance:</b> {this.state.user.balance} RUB</p>
                    <p><b>Tasks completed:</b> {this.state.user.statistics}</p>
                    <Link to={`/users/${this.state.user.name}/edit`}>Edit</Link>
                </div>
        )
    }
}
export default connect(mapStateToProps)(UserPage);