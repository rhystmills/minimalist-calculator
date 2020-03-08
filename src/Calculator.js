import React from 'react';
import Keypad from './Keypad';
import Screen from './Screen';
import Big from 'big.js';
import {nthRoot} from 'mathjs';
import {pow} from 'mathjs';

export class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0',
      screenValue: '0',
      numStack: [],
      commandStack: [],
      prevButton: '0',
      runningTotal: 0,
      stackString: '',
      lastKey: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.keyFunc = this.keyFunc.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  isSpecialChar(string) {
    if (string==='+') return true;
    else if (string==='-') return true;
    else if (string==='×') return true;
    else if (string==='÷') return true;
    else if (string==='%') return true;
    else if (string==='ₓʸ') return true;
    else if (string==='LOG') return true;
    else if (string==='√') return true;
    else return false;
  }

  componentDidMount() {
    this.focusTextInput();
    this.loadLocalState();
  }

  setLocalState(){
    localStorage.setItem('localState', JSON.stringify(this.state));
  }
  loadLocalState(){
    const localState = JSON.parse(localStorage.getItem('localState'));
    console.log(localState)

    if(localState){
      console.log("Inside local results")
      this.setState({
        value: localState.value,
        screenValue: localState.screenValue,
        numStack: localState.numStack,
        commandStack: localState.commandStack,
        prevButton: localState.prevButton,
        runningTotal: localState.runningTotal,
        stackString: localState.stackString
      })
    }
  }
  keyDown(e){
    switch (e.keyCode){
      case 8: this.handleClick('DEL'); break;
    }
  }
  keyFunc(e) {
    console.log(e)
    console.log(e.charCode)
    switch (e.charCode){
      case 48: this.handleClick('0'); break;
      case 49: this.handleClick('1'); break;
      case 50: this.handleClick('2'); break;
      case 51: this.handleClick('3'); break;
      case 52: this.handleClick('4'); break;
      case 53: this.handleClick('5'); break;
      case 54: this.handleClick('6'); break;
      case 55: this.handleClick('7'); break;
      case 56: this.handleClick('8'); break;
      case 57: this.handleClick('9'); break;
      case 45: this.handleClick('-'); break;
      case 43: this.handleClick('+'); break;
      case 47: this.handleClick('÷'); break;
      case 42: this.handleClick('×'); break;
      case 120: this.handleClick('×'); break;
      case 37: this.handleClick('%'); break;
      case 67: this.handleClick('C'); break;
      case 99: this.handleClick('C'); break;
      case 46: this.handleClick('.'); break;
      case 61: this.handleClick('='); break;
      case 13: this.handleClick('='); break;
      case 94: this.handleClick('ₓʸ'); break;
      case 190: this.handleClick('.'); break;
    }
  }
  focusTextInput() {
   // Explicitly focus the text input using the raw DOM API
   // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  handleClick(buttonVal) {
    let regexNums = RegExp('^[\.0123456789]$');

    console.log("Previous button:" + this.state.prevButton)

    //Handle C
    if (buttonVal==='C'){
      this.setState({
        value: '0',
        screenValue: '0',
        numStack: [],
        commandStack: [],
        prevButton: '0',
        stackString: ' '
      }, () => this.setLocalState()
      )
    }

    //Handle DEL
    if (buttonVal==='DEL'){
      let numAsString = this.state.value.toString();
      if (numAsString.length===1){
        this.setState({
          value: '0',
          screenValue: '0'
        }, () => this.setLocalState()
        )
      } else {
        this.setState({
          value: numAsString.slice(0,numAsString.length-1),
          screenValue: numAsString.slice(0,numAsString.length-1)
        }, () => this.setLocalState()
        )
      }
    }
    //Handle +/-
    if (buttonVal==='+/-'){
      console.log(this.state.value);
      this.setState({
        value: this.state.value * -1,
        screenValue: this.state.value *-1
      }, () => this.setLocalState()
      )
    }

    // Handle decimal point on a 0
    else if (this.state.value==='0'&&buttonVal==='.'){
      this.setState({
        value: this.state.value + buttonVal,
        screenValue: this.state.value + buttonVal
      })
    }

    // Handle any initial number
    else if (this.state.value==='0'&&regexNums.test(buttonVal)){
      this.setState({
        value: buttonVal,
        screenValue: buttonVal
      }, () => this.setLocalState()
      )
    }

    // Handle additional numbers or decimal points
    else if (regexNums.test(buttonVal)&&this.state.value.length<21){
      this.setState({
        value: this.state.value + buttonVal,
        screenValue: this.state.value + buttonVal
      }, () => this.setLocalState()
      )
    }

    //Handle =
    else if (buttonVal==='='&&this.state.prevButton!=='='){
      this.state.numStack.push(this.state.value)
      if (this.state.value.length > 10){
        this.setState({
          stackString: this.state.stackString + parseFloat(this.state.value).toPrecision(3) + " " + buttonVal + " "
        }, () => this.setLocalState()
        )
      } else {
        this.setState({
          stackString: this.state.stackString + this.state.value + " " + buttonVal + " "
        }, () => this.setLocalState()
        )
      }
      // this.state.commandStack.push(buttonVal)
      this.evaluateStacks();
      // console.log("Commands: "+this.state.commandStack)
      // console.log("Numbers: "+this.state.numStack)
    }

    //Handle special chars (+,-,*,/)
    // ! Needs to handle two special chars [of diff kinds] in a row !
    else if (this.isSpecialChar(buttonVal)&& !this.isSpecialChar(this.state.prevButton)){

      this.state.numStack.push(this.state.value)
      this.state.commandStack.push(buttonVal)
      if (this.state.value.length > 10){
        this.setState({
          stackString: this.state.stackString + parseFloat(this.state.value).toPrecision(3) + " " + buttonVal + " "
        }, () => this.setLocalState()
        )
      } else {
        this.setState({
          stackString: this.state.stackString + this.state.value + " " + buttonVal + " "
        }, () => this.setLocalState()
        )
      }

      this.setState({
        value: '0',
      }, () => this.setLocalState()
      )
    }
    //Set prevButton
    this.setState({
      prevButton: buttonVal
    }, () => this.setLocalState()
    )

    this.setLocalState();
  }

  evaluateStacks() {
    //Run the commands on commandStack on the nums from numStack
    //Needs to work for stacks of indeterminate length - i loop? recursive func?
    //for i<this.state.commandstack.length if symbol is '+' setstate this.runningTotal: this.state.numStack[i]+this.state.numStack(i+1)
    //take the final number -> show it on the screen
    // console.log("Evaluating stacks.")

    let runningTotal = parseFloat(this.state.numStack[0]);
    // console.log(runningTotal);

    for (let i=0; i<this.state.commandStack.length; i++){
      // let tempVal=this.state.runningTotal;

      if (this.state.commandStack[i]==='+'){
        // console.log("adding");
        // console.log(this.state.numStack[i+1])
        let x = new Big(runningTotal)
        runningTotal = x.plus(parseFloat(this.state.numStack[i+1]))
      }

      if (this.state.commandStack[i]==='-'){
        let x = new Big(runningTotal)
        runningTotal = x.minus(parseFloat(this.state.numStack[i+1]))
      }

      if (this.state.commandStack[i]==='×'){
        let x = new Big(runningTotal)
        runningTotal = x.times(parseFloat(this.state.numStack[i+1]))
      }

      if (this.state.commandStack[i]==='÷'){
        try{
          let x = new Big(runningTotal)
          runningTotal = x.div(parseFloat(this.state.numStack[i+1]))
        }
        catch (e) {
          console.log(e)
          this.setState({
            value: '0',
            screenValue: 'Error: Cannot divide by zero',
            numStack: [],
            commandStack: [],
            prevButton: '0',
            stackString: ' '
          })
          return
        }
      }

      if (this.state.commandStack[i]==='%'){
        let x = new Big(runningTotal)
        runningTotal = x.mod(parseFloat(this.state.numStack[i+1]))
      }

      if (this.state.commandStack[i]==='√'){
        try{
          let x = runningTotal;
          runningTotal = nthRoot(x,this.state.numStack[i+1]);
        }
        catch (e) {
          console.log(e)
          this.setState({
            value: '0',
            screenValue: 'Error: Cannot find root',
            numStack: [],
            commandStack: [],
            prevButton: '0',
            stackString: ' '
          })
          return
        }

      }
      // if (this.state.commandStack[i]==='LOG'){
      //   let x = new Big(runningTotal)
      //   runningTotal = x.mod(parseFloat(this.state.numStack[i+1]))
      // }

      if (this.state.commandStack[i]==='ₓʸ'){
        
        try{
          if (parseFloat(this.state.numStack[i+1])<=1000){
            let x = new Big(runningTotal)
            runningTotal = x.pow(parseFloat(this.state.numStack[i+1]))
          }
          else {
            let x = new Big(runningTotal)
            this.setState({
              value: 0,
              screenValue: 'Error: Exponent too large',
              numStack: [],
              commandStack: [],
              prevButton: '0',
              stackString: ' '
            })
            return;
            // runningTotal = Math.pow(runningTotal,parseFloat(this.state.numStack[i+1]))
          }
        } catch (e) {
          let x = runningTotal;
          runningTotal = pow(x,this.state.numStack[i+1]);
        }
      }
    }
    //End for loop
    console.log('Runningtotal: ' + runningTotal.toString().length);
    if (runningTotal.toString().length<16){
      this.setState({
        value: runningTotal.toString(),
        // screenValue: runningTotal.toPrecision(15),
        screenValue: runningTotal.toString(),
        numStack: [],
        commandStack: []
      }, () => this.setLocalState()
      )
    }
    else{
      this.setState({
        value: runningTotal.toString(),
        screenValue: runningTotal.toPrecision(16),
        // screenValue: runningTotal.toString(),
        numStack: [],
        commandStack: []
      }, () => this.setLocalState()
      )
    }

    console.log("Running total: "+runningTotal);
    console.log("Num stack: " + this.state.numStack);
    console.log(this.state.commandStack);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <div onKeyPress= {this.keyFunc} onKeyDown={this.keyDown} onClick={this.focusTextInput} ref={this.textInput} tabIndex={0}>
        <Screen
          value = {this.state.screenValue}
          stackString = {this.state.stackString}
        />

        <Keypad handleClick={this.handleClick}  />
      </div>
    );
  }
}
