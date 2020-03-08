import React from 'react';

class Screen extends React.Component {

  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <div className="screen">
        <div>
          {this.props.value}
        </div>
        <div className="text-small text-summary mar-top-small">
          {this.props.stackString}
        </div>
      </div>
    );
  }
}

export default Screen;
