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
            repeatPass:'',
            signUp:true,
            loginMail:'',
            loginPass:''
           }
    }

    render() {
        const validateLogin = (e) => {
            e.preventDefault();
            console.log(this.state.loginMail,this.state.loginPass)
        }
        const validateSignUp = (e) => {
            e.preventDefault();
            console.log(this.state.email,this.state.password,this.state.repeatPass)
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
                        <Col sm={6} style={{ paddingLeft: '180px', marginTop: '60px' }}>
                            {this.state.signUp && <form onSubmit={validateSignUp}>
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
                                        onChange={handleEmail} placeholder="Enter email" s style={{
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

                               { this.state.password === this.state.repeatPass &&
                                <Button variant="primary" type="submit" style={{
                                    backgroundColor: 'yellowgreen',
                                    marginLeft: '135px', border: 'aliceblue', width: '19%',marginBotton:'10px'
                                }}>
                                    SIGN UP
                        </Button>}
                        { this.state.password !== this.state.repeatPass && <div>
                                <Button variant="primary"  style={{
                                    backgroundColor: 'yellowgreen',
                                    marginLeft: '135px', border: 'aliceblue', width: '19%',marginBotton:'10px'
                                }} disabled>
                                    SIGN UP
                        </Button>
                        <div style={{color:'red',marginLeft:'20px',fontSize:'13px',display:'inline'}}>Password Mismatch</div></div>
                        }
                               <div style={{cursor:'pointer'}} onClick={()=>{this.setState({signUp:false})}}
                               >Already have an account click here to login</div> 
                            </form>}
                            {
                                !this.state.signUp && <form onSubmit={validateLogin}>
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
                                        pattern=".{8,}"
                                        placeholder="Password" style={{
                                            width: '80%'
                                        }} required />
                                </Form.Group>
                                
                                <Button variant="primary" type="submit" style={{
                                    backgroundColor: 'yellowgreen',
                                    marginLeft: '135px', border: 'aliceblue', width: '19%',marginBotton:'10px'
                                }}>
                                    LOGIN
                        </Button>
                               <div style={{cursor:'pointer',paddingLeft:'39px'}} onClick={()=>{this.setState({signUp:!this.state.signUp})}}
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
