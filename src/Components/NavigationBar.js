import React, { Component } from 'react'
import Logo from '../rebit.png';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Backup from './Backup';
import Restore from './Restore';
import Recycle from './Recycle';
import Dashboard from './Dashboard';
export default class NavigationBar extends Component {
    constructor() {
        super();
        this.state = {
            bgcolor: "white",
            color: "gray",
        }
    }
    render() {
        
        return (
                <div >
                    <Router>
                    <Navbar style={{ alignItems: 'center', }}>
                        <Navbar.Brand style={{ marginRight: '-440px' }}>
                            <Link to='/'> <img src={Logo} style={{ width: '20%' }} id='logo' alt='logo' /> </Link>
                        </Navbar.Brand>
                        <Nav className='mr-auto'>
                            <Link to='/Backup' style={{
                                marginRight: '20px', textDecoration: 'none',
                                color: this.state.color
                            }}>Backup</Link>
                            <Link to='/Restore' style={{
                                marginRight: '20px', textDecoration: 'none',
                                color: this.state.color
                            }}>Recovery</Link>
                            <Link to='/Recycle' style={{
                                marginRight: '20px', textDecoration: 'none',
                                color: this.state.color
                            }}>Recycle Bin</Link>

                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <span style={{
                                    cursor: 'pointer', marginRight: '15px',
                                    color: this.state.color
                                }} onClick={this.props.lightMode}>Light</span>
                                <span style={{
                                    cursor: 'pointer', fontWeight: 'bold',
                                    color: this.state.color
                                }} onClick={this.props.darkMode}>Dark</span>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>

                    <Switch>
                        <Route exact path='/' component={Dashboard} />
                        <Route path='/Backup' component={Backup} />
                        <Route path='/Restore' component={Restore} />
                        <Route path='/Recycle' component={Recycle} />
                    </Switch>
                </Router>
                </div>  
        )
    }
}
