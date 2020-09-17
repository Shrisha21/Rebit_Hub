import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import LoginNavbar from './Components/LoginNavbar';
import NavigationBar from './Components/NavigationBar'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      bgcolor: "white",
      color: "gray",
    }
  }
  render() {
    const validate = (data) => {
      console.log(data)
      this.setState({
        login: data.status
      })
    }
    const lightMode = () => {
      this.setState({
          bgcolor: "white",
          color: "gray",
      })
      if (this.props.onChange) {
          this.props.onChange(this.state);
      }
     
  }
  const darkMode = () => {
      this.setState({
          bgcolor: "black",
          color: "white",
      })
      if (this.props.onChange) {
          this.props.onChange(this.state);
      }
      
  }
    return (
      <div className='App' style={{
        color: this.state.color, backgroundColor: this.state.bgcolor,
        fontFamily: 'kaushan script', fontSize: '20px',height:'100%'}}>
         {
           cookies.get('email') === undefined && 
            <LoginNavbar onChange={validate} />
         } 
        
        {cookies.get('email') !== undefined && 
          <NavigationBar lightMode={lightMode} darkMode={darkMode}/>
        }
          
      </div>
    )
  }
}


