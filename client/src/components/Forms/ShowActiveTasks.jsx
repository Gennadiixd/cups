import React from 'react';
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import {delTaskAC, placeMarksOnMapAC} from "../../reducers/actions/actions";

const mapStateToProps = (state, ownProps) => ({
    name: state.auth.name,
    tasks: state.auth.tasks
})


class ShowActiveTasks extends React.Component {
    discardTaskHandler = async (id) => {
        let res = await fetch('/tasks/discardtask', {
            method : 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "id" : id,
            })
        })
        this.props.refresh(id);
        alert(await res.text());
    }
    render() {
        return (
            <div className="task col-lg-4">
                {this.props.tasks.length!==0 ?
                <h5 style={{textAlign : 'center'}}>Текущие задания</h5>
                    : <h5 style={{textAlign : 'center'}}>У вас нет активных заданий</h5>}
                <br/>
                {this.props.tasks.map((task, index) =>
                    <div key={task._id+task.title}>
                        <p># {index+1}</p>
                        <p><b>{task.title}</b></p>
                        <p>{task.description}</p>
                        <div>
                            <Button variant="danger" onClick={() => this.discardTaskHandler(task._id)}>Отказаться</Button>
                        </div>
                        <hr/>
                    </div>
                )}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refresh: (id) => dispatch(delTaskAC(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowActiveTasks);
