import React from "react";
import { Jumbotron, Container } from 'react-bootstrap';

function TaskItem(props) {
    return (
        <div>
            <Jumbotron fluid style={{padding: '10px', 'margin-bottom': '5px'}}>
                <Container>
                    <h1>{props.item.title}</h1>
                    <p>{props.item.description}</p>
                    <p>Выполнить не позднее {props.item.prettyDate}</p>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default TaskItem;