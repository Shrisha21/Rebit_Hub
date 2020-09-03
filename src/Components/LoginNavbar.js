import React, { Component } from 'react'
import Logo from '../rebit.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
export default class LoginNavbar extends Component {
    constructor() {
        super();
        this.state = {
            bgcolor: "white",
            color: "gray",
        }
    }
    render() {
        const lightMode = () => {
            this.setState({
                bgcolor: "white",
                color: "gray",
            })
            console.log(this.state)
        }
        const darkMode = () => {
            this.setState({
                bgcolor: "black",
                color: "white",
            })
            console.log(this.state)
        }
        return (
            <div style={{
                color: this.state.color, backgroundColor: this.state.bgcolor,
                fontFamily: 'kaushan script', fontSize: '20px'
            }}>
                <Navbar style={{ alignItems: 'center' }}>
                    <Navbar.Brand style={{ color: this.state.color, backgroundColor: this.state.bgcolor, marginRight: '-440px' }}>
                     <img src={Logo} style={{ width: '20%' }} id='logo' alt='logo' />
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <span style={{
                                cursor: 'pointer', marginRight: '15px',
                                color: this.state.color, backgroundColor: this.state.bgcolor
                            }} onClick={lightMode}>Light</span>
                            <span style={{
                                cursor: 'pointer', fontWeight: 'bold',
                                color: this.state.color, backgroundColor: this.state.bgcolor
                            }} onClick={darkMode}>Dark</span>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
