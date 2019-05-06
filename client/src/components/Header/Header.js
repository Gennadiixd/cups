import React from "react";
import {connect} from 'react-redux'
import {Navbar, Nav, Modal} from 'react-bootstrap'
import Login from '../Auth/Login'
import Register from '../Auth/Register'

import {userLogout} from "../../reducers/actions/actions";

const mapStateToProps = state => ({
    isAuth : state.auth.isAuth,
    userName : state.auth.username
})

class Header extends React.Component {
        state = {
            showLogin: false,
            showRegister : false
        };

    handleCloseLogin = () => {
        this.setState({ showLogin: false });
    }

    handleShowLogin = () => {
        this.setState({ showLogin: true });
    }
    handleCloseRegister = () => {
        this.setState({ showRegister: false });
    }

    handleShowRegister = () => {
        this.setState({ showRegister: true });
    }
    render() {
        return (
            <div className='sticky-top'>
                <Navbar bg='light' expand="lg">
                    <Navbar.Brand href="#home">Mysteryagent</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav inline="true" className="mr-sm-2">
                            {!this.props.isAuth ?
                                <Nav>
                                <Nav.Link onClick={this.handleShowRegister}>Регистрация</Nav.Link>
                                <Nav.Link onClick={this.handleShowLogin}>Войти</Nav.Link>
                                </Nav>
                            :
                                <Nav>
                                    <Navbar.Text>{this.props.userName}</Navbar.Text>
                                <Nav.Link onClick={this.props.logout}>Выйти</Nav.Link>
                                </Nav>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Modal show={this.state.showLogin} onHide={this.handleCloseLogin}>
                    <Modal.Header closeButton>
                        <Modal.Title>Вход</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Login close={this.handleCloseLogin}/></Modal.Body>
                </Modal>

                <Modal show={this.state.showRegister} onHide={this.handleCloseRegister}>
                    <Modal.Header closeButton>
                        <Modal.Title>Регистрация</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Register close={this.handleCloseRegister}/></Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(userLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)