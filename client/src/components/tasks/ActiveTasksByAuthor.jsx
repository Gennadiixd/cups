import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
    name: state.auth.name,
    role: state.auth.role
})
class ActiveTasksByAuthor extends React.Component {
    async componentDidMount() {
        console.log(this.props.match.url);
        let response = await fetch(this.props.match.url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.props.name,
                role: this.props.role
            })
        });
        let activeArr = await response.json();
        console.log(activeArr);
    }
        render() {
            return (
                // !this.state.user ?
                //     <Redirect to='/404' /> :
                <div>
                    <Link />
                    ActiveTasksByAuthor
                </div>
            )
        }
    }
    export default connect(mapStateToProps)(ActiveTasksByAuthor);