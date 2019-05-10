import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
    user: state.auth
})
class UserPage extends React.Component {

    render() {
        return (
            !this.props.user ?
                <Redirect to='/404' /> :
                <div>
                    <h1>{this.props.user.name}</h1>
                    <p>{this.props.user.email}</p>
                    <p><b>Баланс:</b> {this.props.user.balance} руб.</p>
                    <p><b>Завершено заданий:</b> {this.props.user.statistics}</p>
                    <Link to={`/users/${this.props.user.name}/edit`}>Редактировать</Link>
                </div>
        )
    }
}
export default connect(mapStateToProps)(UserPage);