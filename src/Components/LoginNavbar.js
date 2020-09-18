import React, { Component } from 'react'
import Logo from '../rebit.png';
import Form from 'react-bootstrap/Form';
import Home from '../Home.jpg';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Row, Col } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default class LoginNavbar extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            name: '',
            phone: '',
            password: '',
            repeatPass: '',
            signUp: true,
            loginMail: '',
            loginPass: '',
            responseSignUp: '',
            showAlert: false,
            loginSuccess: {},
            showLoginAlert: false
        }

    }

    render() {
        const validateLogin = (e) => {
            e.preventDefault();
            fetch("http://localhost:8080/api/login", {
                "method": "POST",
                "body": JSON.stringify({
                    email: this.state.loginMail,
                    password: this.state.loginPass
                })
            }).then(res => res.json()).then(res => {
                this.setState({
                    loginSuccess: res,
                    showLoginAlert:true
                })
                if (res.status ==='Login Success'){
                    cookies.set('email',res.email)
                    cookies.set('token',res.token)
                    setTimeout(function(){
                        window.location.reload(false)
                    },1000)
                }
            }) 
                .catch(err => {
                    console.log(err);
                })
            this.setState({
                email: '',
                password: '',
            })
            
            
        }
        const validateSignUp = (e) => {
            e.preventDefault();
            console.log(this.state.email, this.state.password, this.state.repeatPass)
            fetch("http://localhost:8080/api/createUser", {
                "method": "POST",
                "body": JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name,
                    phone: this.state.phone
                })
            }).then(res => res.json()).then(res =>
                this.setState({
                    responseSignUp: res,
                    showAlert: true
                }))
                .catch(err => {
                    console.log(err);
                })
            this.setState({
                email: '',
                password: '',
                repeatPass: '',
                name: '',
                phone: ''
            })
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
        const handleName = (event) => {
            this.setState({
                name: event.target.value
            });

        }
        const handlePhone = (event) => {
            this.setState({
                phone: event.target.value
            });

        }
        const handleRepeatPassword = (event) => {
            this.setState({
                repeatPass: event.target.value
            });

        }
        const handleLoginMail = (event) => {
            this.setState({
                loginMail: event.target.value
            });

        }
        const handleLoginPassword = (event) => {
            this.setState({
                loginPass: event.target.value
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
                        <Col sm={6} style={{ paddingLeft: '180px' }}>
                            {this.state.responseSignUp === "Success" &&
                                this.state.showAlert && <Alert style={{
                                    backgroundColor: 'yellowgreen',
                                    width: '75%', color: 'white', fontSize: '17px'
                                }}
                                    onClose={() => this.setState({ showAlert: false,signUp:true  })} dismissible>
                                    Sign Up Success. Login to continue
                    </Alert>}
                            {this.state.responseSignUp === "Email Found" &&
                                this.state.showAlert && <Alert style={{
                                    backgroundColor: 'orange',
                                    width: '75%', color: 'white', fontSize: '17px'
                                }}
                                    onClose={() => this.setState({ showAlert: false })} dismissible>
                                    Email id exist. Try again
                    </Alert>}
                            {!this.state.signUp && <form onSubmit={validateSignUp}>
                                <div style={{
                                    color: 'yellowgreen', fontSize: '28px',
                                    marginLeft: '135px'
                                }}>
                                    SIGN UP
                        </div>
                                <Form.Group >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email"
                                        value={this.state.email}
                                        onChange={handleEmail} placeholder="Enter email" style={{
                                            width: '80%'
                                        }} required />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text"
                                        value={this.state.name}
                                        onChange={handleName} placeholder="Enter Name" style={{
                                            width: '80%'
                                        }} required />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="number"
                                        minLength="10"
                                        value={this.state.phone}
                                        onChange={handlePhone} placeholder="Enter Phone" style={{
                                            width: '80%'
                                        }} required />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password"
                                        value={this.state.password}
                                        onChange={handlePassword}
                                        pattern=".{8,}"
                                        placeholder="Password with 8 charcters or more" style={{
                                            width: '80%'
                                        }} required />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label> Repeat Password</Form.Label>
                                    <Form.Control type="password"
                                        value={this.state.repeatPass}
                                        onChange={handleRepeatPassword}
                                        pattern=".{8,}"
                                        placeholder="Password with 8 charcters or more" style={{
                                            width: '80%'
                                        }} required />
                                </Form.Group>

                                {this.state.password === this.state.repeatPass &&
                                    <Button variant="primary" type="submit" style={{
                                        backgroundColor: 'yellowgreen',
                                        marginLeft: '135px', border: 'aliceblue', width: '19%', marginBotton: '10px'
                                    }}>
                                        SIGN UP
                        </Button>}
                                {this.state.password !== this.state.repeatPass && <div>
                                    <Button variant="primary" style={{
                                        backgroundColor: 'yellowgreen',
                                        marginLeft: '135px', border: 'aliceblue', width: '19%', marginBotton: '10px'
                                    }} disabled>
                                        SIGN UP
                        </Button>
                                    <div style={{ color: 'red', marginLeft: '20px', fontSize: '13px', display: 'inline' }}>Password Mismatch</div></div>
                                }
                                <div style={{ cursor: 'pointer' }} onClick={() => { this.setState({ signUp: true }) }}
                                >Already have an account click here to login</div>
                            </form>
                            }
                            {
                                this.state.signUp && <form onSubmit={validateLogin}>

                                    {this.state.loginSuccess === "Login Failed" &&
                                        this.state.showLoginAlert && <Alert style={{
                                            backgroundColor: 'orange',
                                            width: '75%', color: 'white', fontSize: '17px'
                                        }}
                                            onClose={() => this.setState({ showLoginAlert: false })} dismissible>
                                            Login Failed
                                    </Alert>}
                                    <div style={{
                                        color: 'yellowgreen', fontSize: '28px',
                                        marginLeft: '135px'
                                    }}>
                                        LOGIN
                        </div>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email"
                                            value={this.state.loginMail}
                                            onChange={handleLoginMail} placeholder="Enter email" s style={{
                                                width: '80%'
                                            }} required />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password"
                                            value={this.state.loginPass}
                                            onChange={handleLoginPassword}
                                            placeholder="Password" style={{
                                                width: '80%'
                                            }} required />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" style={{
                                        backgroundColor: 'yellowgreen',
                                        marginLeft: '135px', border: 'aliceblue', width: '19%', marginBotton: '10px'
                                    }}>
                                        LOGIN
                        </Button>
                                    <div style={{ cursor: 'pointer', paddingLeft: '39px' }} onClick={() => { this.setState({ signUp: !this.state.signUp }) }}
                                    >Create your account for free here</div>
                                </form>
                            }
                        </Col>
                    </Row>
                </div>

            </div>
        )
    }
}
