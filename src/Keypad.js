import React from 'react';
import {Button} from './Button.js';

class Keypad extends React.Component {
  render() {

    let handleClick = this.props.handleClick;

    return (
      <div>
        <div className="keypad-row">
          <Button val="C" onClick = {handleClick} onKeyPress = {handleClick} addClass="text-orange"></Button>
          <Button val="+/-" onClick = {handleClick} addClass="text-orange text-mid"></Button>
          <Button val="DEL" onClick = {handleClick} addClass="text-orange text-small button-double"></Button>
        </div>
        <div className="keypad-row">
          <Button val="%" onClick = {handleClick} onKeyPress = {handleClick} addClass="text-orange"></Button>
          <Button val="√" onClick = {handleClick} addClass="text-orange"></Button>
          <Button val="ₓʸ" onClick = {handleClick} addClass="text-orange"></Button>
          <Button val="×" onClick = {handleClick} addClass="text-orange"></Button>
        </div>
        <div className="keypad-row">
          <Button val="1" onClick = {handleClick}></Button>
          <Button val="2" onClick = {handleClick}></Button>
          <Button val="3" onClick = {handleClick}></Button>
          <Button val="÷" onClick = {handleClick} addClass="text-orange"></Button>
        </div>
        <div className="keypad-row">
          <Button val="4" onClick = {handleClick}></Button>
          <Button val="5" onClick = {handleClick}></Button>
          <Button val="6" onClick = {handleClick}></Button>
          <Button val="+" onClick = {handleClick} addClass="text-orange"></Button>
        </div>
        <div className="keypad-row">
          <Button val="7" onClick = {handleClick}></Button>
          <Button val="8" onClick = {handleClick}></Button>
          <Button val="9" onClick = {handleClick}></Button>
          <Button val="-" onClick = {handleClick} addClass="text-orange"></Button>
        </div>
        <div className="keypad-row">
          <Button val="0" onClick = {handleClick}></Button>
          <Button val="." onClick = {handleClick}></Button>
          <Button val="=" addClass="button-double button-special" onClick = {handleClick}></Button>
        </div>
      </div>
    );
  }
}

export default Keypad;
