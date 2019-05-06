import React from 'react';

export default class ClassName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        console.log(this.props.match)
        return (
            <div></div>
        );
    }
}