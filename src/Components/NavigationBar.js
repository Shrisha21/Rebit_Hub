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
import Cookies from 'universal-cookie';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';
const cookies = new Cookies();
export default class NavigationBar extends Component {
    constructor() {
        super();
        this.state = {
            bgcolor: "white",
            color: "gray",
        }
    }
    render() {
        const logout = () => {
            cookies.remove('email')
            cookies.remove('token')
            if(cookies.get('email')===undefined){
                setTimeout(function(){
                    window.location.reload(false)
                },1000)
            }
        }
        return (
                <div >
                    <Router>
                    <Navbar style={{ alignItems: 'center',}}>
                        <Navbar.Brand style={{ marginRight: '-440px' }}>
                            <Link to='/'> <img src={Logo} style={{ width: '20%' }} id='logo' alt='logo' /> </Link>
                        </Navbar.Brand>
                        <Nav className='mr-auto'>
                        <Link to='/' style={{
                                marginRight: '20px', textDecoration: 'none',
                                color: this.state.color
                            }}>DASHBOARD</Link>
                            <Link to='/Backup' style={{
                                marginRight: '20px', textDecoration: 'none',
                                color: this.state.color
                            }}>BACKUP</Link>
                            <Link to='/Restore' style={{
                                marginRight: '20px', textDecoration: 'none',
                                color: this.state.color
                            }}>RECOVERY</Link>
                            <Link to='/Recycle' style={{
                                marginRight: '20px', textDecoration: 'none',
                                color: this.state.color
                            }}>TRASH</Link>

                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                            <span style={{
                                    cursor: 'pointer', marginRight: '45px',
                                    color: this.state.color
                                }} onClick={logout}>LOGOUT</span>
                                <span style={{
                                    cursor: 'pointer', marginRight: '15px',
                                    color: this.state.color
                                }} onClick={this.props.lightMode}><WbSunnyIcon style={{
                                    color : 'orange'
                                }}/></span>
                                <span style={{
                                    cursor: 'pointer', fontWeight: 'bold',
                                    color: this.state.color
                                }} onClick={this.props.darkMode}><Brightness2Icon /></span>
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
