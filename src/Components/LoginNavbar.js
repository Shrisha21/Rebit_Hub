import React, { Component } from 'react'
import Logo from '../rebit.png';
import Form from 'react-bootstrap/Form';
import Home from '../Home.jpg';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Row, Col } from 'react-bootstrap';
export default class LoginNavbar extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            testmail: 'shrisha.adiga@betsol.com',
            testpass: '12345678',
            status: false,
        }
    }

    render() {
        const validate = (e) => {
            e.preventDefault();
            const passcheck = this.state.password.toString();
            if (this.state.email === this.state.testmail) {
                if (passcheck === this.state.testpass) {
                    this.setState({
                        status: true
                    })
                }
            }
            if (this.props.onChange) {
                this.props.onChange(this.state);
            }
        }
        const handleEmail = (event) => {
            this.setState({
                email: event.target.value
            });

        }
        const handlePassword = (event) => {
            this.setState({
                password: event.target.value
            });

        }

        return (
            <div style={{
                color: 'gray', backgroundColor: 'white',
                fontFamily: 'kaushan script', fontSize: '20px'
            }} className="w3-container w3-animate-zoom">
                <Navbar style={{ alignItems: 'center' }}>
                    <Navbar.Brand style={{ color: 'gray', backgroundColor: 'white', marginRight: '-440px' }}>
                        <img src={Logo} style={{ width: '20%' }} id='logo' alt='logo' />
                    </Navbar.Brand>
                </Navbar>
                <div>
                    <Row className='row'>

                        <Col sm={6}>
                            <img src={Home} style={{ width: '100%' }} id='logo' alt='logo' />
                        </Col>
                        <Col sm={6} style={{ paddingLeft: '180px', marginTop: '60px' }}>
                            <form onSubmit={validate}>
                                <div style={{
                                    color: 'yellowgreen', fontSize: '28px',
                                    marginLeft: '135px'
                                }}>
                                    LOGIN
                        </div>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email"
                                        value={this.state.email}
                                        onChange={handleEmail} placeholder="Enter email" s style={{
                                            width: '80%'
                                        }} required />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password"
                                        value={this.state.password}
                                        onChange={handlePassword}
                                        pattern=".{8,}"
                                        placeholder="Password" style={{
                                            width: '80%'
                                        }} required />
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{
                                    backgroundColor: 'yellowgreen',
                                    marginLeft: '135px', border: 'aliceblue', width: '19%'
                                }}>
                                    Login
                        </Button>
                                {this.state.status && <div style={{
                                    color: 'green',
                                    fontSize: '14px'
                                }}>
                                    Login Successfull
                        </div>}
                            </form>
                        </Col>
                    </Row>
                </div>

            </div>
        )
    }
}
