import React from 'react';
import {connect} from "react-redux";

const mapStateToProps = (state, ownProps) => ({
    name: state.auth.name,
    tasks: state.auth.tasks
})

class ShowActiveTasks extends React.Component {
    render() {
        return (
            <div className="task col-lg-4">
                {this.props.tasks.length!==0 ?
                <h5 style={{textAlign : 'center'}}>Текущие задания</h5>
                    : <h5 style={{textAlign : 'center'}}>У вас нет активных заданий</h5>}
                <br/>
                {this.props.tasks.map((task, index) =>
                    <div>
                        <p># {index+1}</p>
                        <p><b>{task.title}</b></p>
                        <p>{task.description}</p>
                        <hr/>
                    </div>
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps)(ShowActiveTasks);
