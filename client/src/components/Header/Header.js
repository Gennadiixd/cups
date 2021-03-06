import React from "react";
import { connect } from 'react-redux'
import { Navbar, Nav, Modal, Badge } from 'react-bootstrap'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import UserPage from '../UserPage'

import { userLogout } from "../../reducers/actions/actions";

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    userName: state.auth.name,
    role: state.auth.role,
    tasks: state.maps.coordinates
})

class Header extends React.Component {
    state = {
        showLogin: false,
        showRegister: false,
        showProfile: false
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

    handleCloseProfile = () => {
        this.setState({ showProfile: false });
    }

    handleShowProfile = () => {
        this.setState({ showProfile: true });
    }

    handleLogout = async () => {
        window.location = '#/'
        this.props.logout()
        await fetch('users/logout');
    }

    scrollDown = () => {
        window.scrollTo({ top: window.innerHeight + 216, behavior: 'smooth' })
    }

    render() {
        let pendingTasks = this.props.tasks.filter(task => task.author === this.props.username && task.status === 'pending');
        return (
            <header className='sticky-top'>
                <Navbar style={{ background: 'rgba(59,89,153 ,1 )' }} variant="dark" expand='sm'>
                    <Navbar.Brand href="#home">cups,_____?</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {this.props.role === 'author' && 
                            <Nav.Link href={`#/users/${this.props.userName}`}>Мои задания {pendingTasks.length > 0 && 
                                <Badge variant="primary">{pendingTasks.length}</Badge>}
                            </Nav.Link>}
                            {this.props.role === 'worker' && <Nav.Link href={`#/users/${this.props.userName}`}>Выполненные</Nav.Link>}

                            <Nav.Link className="scrollButton" onClick={this.scrollDown}>
                                {this.props.role === 'worker' ? 'Просмотреть задания' : 'Добавить задание'}
                            </Nav.Link>

                        </Nav>
                        <Nav inline="true" className="mr-sm-2">
                            {!this.props.isAuth ?
                                <Nav>
                                    <Nav.Link onClick={this.handleShowRegister}>Регистрация</Nav.Link>
                                    <Nav.Link onClick={this.handleShowLogin}>Войти</Nav.Link>
                                </Nav>
                                :
                                <Nav>
                                    <Nav.Link onClick={this.handleShowProfile}>{this.props.userName}</Nav.Link>
                                    <Nav.Link onClick={this.handleLogout}>Выйти</Nav.Link>
                                </Nav>
                            }
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
                <Modal show={this.state.showLogin} onHide={this.handleCloseLogin}>
                    <Modal.Header className="modals" style={{ background: 'rgba(59,89,153 ,1 )' }} closeButton>
                        <Modal.Title>Вход</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Login close={this.handleCloseLogin} /></Modal.Body>
                </Modal>

                <Modal show={this.state.showRegister} onHide={this.handleCloseRegister}>
                    <Modal.Header className="modals" closeButton>
                        <Modal.Title>Регистрация</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Register close={this.handleCloseRegister} /></Modal.Body>
                </Modal>

                <Modal show={this.state.showProfile} onHide={this.handleCloseProfile}>
                    <Modal.Header className="modals" closeButton>
                        <Modal.Title>Профиль</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><UserPage close={this.handleCloseProfile} /></Modal.Body>
                </Modal>
            </header>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(userLogout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
