import React from 'react';
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    auth: state.auth.username,
  });


class TakeTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        console.log(this.props.match.params.id)
        console.log(this.props.auth)
        return (
            <div></div>
        );
    }
}


export default connect(
    mapStateToProps,
  )(TakeTask);