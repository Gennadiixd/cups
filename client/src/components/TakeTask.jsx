import React from 'react';
import {Redirect} from 'react-router-dom'
import { connect } from "react-redux";
import { delTaskFromReducerAC } from "../reducers/actions/actions"
import { takeTaskAC } from "../reducers/actions/actions"


const mapStateToProps = (state) => ({
    auth: state.auth.name,
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
        let data = await res.json();
       
        //удалить из редьюсера по id, если бэк правильно отработал
        if (data.respond !== 'empty') {            
            this.props.takeTask(data.taskID, data.task)          
        }
        window.location = '#/';
    }

    render() {
        this.sendId();
        return (
            <div>                
                {/* <Redirect to={'/'}/> */}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        delTaskFromReducer: (id) => dispatch(delTaskFromReducerAC(id)),
        takeTask: (id, task) => dispatch(takeTaskAC(id, task))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TakeTask);