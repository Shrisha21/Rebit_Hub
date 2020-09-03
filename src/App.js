import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import LoginNavbar from './Components/LoginNavbar';
import NavigationBar from './Components/NavigationBar'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      login: false
    }
  }
  render() {
    const validate = (data) => {
      console.log(data)
      this.setState({
        login: data.status
      })
    }
    return (
      <div>
        {!this.state.login &&
          <LoginNavbar onChange={validate} />
        }
        {
          this.state.login &&
          <NavigationBar />
        }
      </div>
    )
  }
}


