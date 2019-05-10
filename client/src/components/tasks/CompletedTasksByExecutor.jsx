import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
    name: state.auth.name,
    role: state.auth.role
})
class CompletedTasksByExecutor extends React.Component {
    async componentDidMount() {
        console.log(this.props.match.url)
        let response = await fetch(this.props.match.url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                role: this.props.role
            })
        });
        let completedArr = await response.json();
        console.log(completedArr);
    }
    render() {
        return (
            // !this.state.user ?
            //     <Redirect to='/404' /> :
            <div>
                CompletedTasksByExecutor
                </div>
        )
    }
}
export default connect(mapStateToProps)(CompletedTasksByExecutor);