import React from 'react';

export class Button extends React.Component {
  constructor(props) {
    super(props);
    this.clickFunc = this.clickFunc.bind(this);
  }

  clickFunc() {
    this.props.onClick(this.props.val);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    if(this.props.addClass){
        return(
          <button
          val={this.props.val}
          className={`button button--${this.props.val } ${this.props.addClass}`}
          onClick={this.clickFunc}
          >
          {this.props.val}
          </button>
        )
    }
    return (
      <button
      val={this.props.val}
      className={`button button--${this.props.val}`}
      onClick={this.clickFunc}
      >
      {this.props.val}
      </button>
    );
  }
}
