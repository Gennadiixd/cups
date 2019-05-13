import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import YandexMaps from '../containers/YandexMaps/YandexMaps';
import NotFound from './NotFound';
import TasksForExecutor from './tasks/TasksForExecutor';
import TasksForAuthor from './tasks/TasksForAuthor';

const mapStateToProps = (state, ownProps) => ({
    isAuth: state.auth.isAuth,
    role: state.auth.role
})
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }
    // async componentDidMount() {
    //     let response = await fetch(this.props.match.url);
    //     let currentUser = await response.json();
    //     this.setState({
    //         user: currentUser
    //     });
    // }
    render() {
        return (<main>
            {/* {!this.props.isAuth && <Redirect to="/login" />} */}
            <Switch>
                <Route exact path='/users/:name' render={(props) => (
                    this.props.role === 'worker' ? <TasksForExecutor {...props}/> :
                        this.props.role === 'author' ? <TasksForAuthor {...props}/> : <Redirect to="/"/>
                )} />
                <Route path='/' component={YandexMaps} />
                <Route exact path='/404' component={NotFound} />
            </Switch>
        </main>)
    }
}

export default connect(mapStateToProps)(Main);