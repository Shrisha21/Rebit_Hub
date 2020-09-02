import './App.css';
import Logo from './rebit.png';
import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Backup from './Components/Backup';
import Restore from './Components/Restore';
import Recycle from './Components/Recycle';
import Dashboard from './Components/Dashboard';
export default class App extends Component {
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
      <Router>
      <div style={{ color: this.state.color, backgroundColor: this.state.bgcolor,
      fontFamily:'kaushan script',fontSize:'20px' }}>
        <Navbar style={{alignItems: 'center'}}>
          <Navbar.Brand style={{ color: this.state.color, backgroundColor: this.state.bgcolor,marginRight:'-440px' }}>
         <Link to='/'> <img src={Logo} style={{width:'20%'}} id='logo' alt='logo' /> </Link>
          </Navbar.Brand>
            <Nav className='mr-auto'>
            <Link to='/Backup' style={{marginRight:'20px',textDecoration:'none',
          color:this.state.color}}>Backup</Link>
            <Link to='/Restore' style={{marginRight:'20px',textDecoration:'none',
          color:this.state.color}}>Recovery</Link>
            <Link to='/Recycle' style={{marginRight:'20px',textDecoration:'none',
          color:this.state.color}}>Recycle Bin</Link>
          </Nav>
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

      <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/Backup' component={Backup} />
          <Route path='/Restore' component={Restore} />
          <Route path='/Recycle' component={Recycle} />
      </Switch>
      </div>
      
      </Router>
    )
  }
}


