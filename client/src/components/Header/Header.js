import React from "react";
import './headerStyle.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }
    render() {
        return (
            <div className="header">
                <ul className="header-ul">
                    <li><a href="#">Active Tsks : 0</a></li>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Logout</a></li>
                    <li><a href="#">Signup</a></li>
                    <li><a href="#">Signin</a></li>
                </ul>
            </div>
        );
    }
}