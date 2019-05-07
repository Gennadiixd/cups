import React from 'react';
import { connect } from "react-redux";
import { delTaskFromReducerAC } from "../reducers/actions/actions"

const mapStateToProps = (state) => ({
    auth: state.auth.username,
    reducerTaskId: state.maps.coordinates
});


class TakeTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    async sendId() {
        let res = await fetch(`/tasks/take`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskId: this.props.match.params.id, userName : this.props.auth }),
        });
        let id = await res.text();
        //удалить из редьюсера по id, если бэк правильно отработал
        if (id !== 'empty') {
            // console.log(id);
            // console.log(this.props.reducerTaskId);
            this.props.delTaskFromReducer(id);            
        }
    }

    render() {
        this.sendId();
        console.log('THIS IS ID ' + this.props.match.params.id)
        console.log('THIS IS USER ' + this.props.auth)
        return (
            <div></div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        delTaskFromReducer: (id) => dispatch(delTaskFromReducerAC(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TakeTask);