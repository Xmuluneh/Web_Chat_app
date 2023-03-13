import React, { Component } from 'react';
import Robot from '../images/robot.gif';
import './Welcome.css';
class Welcome extends Component {
  render() {
    return (
      <div className='Welcome'>
        <img src={Robot} alt='Robot' />
        <h1>Welcome</h1>
        <h3>Select a chat to start texting</h3>
      </div>
    );
  }
}

export default Welcome;
