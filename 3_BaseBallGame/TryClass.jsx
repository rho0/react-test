import React, { Component } from 'react';

class TryClass extends  Component {
  constructor(props) {
    super(props);
    //다른 동작
    this.props.filter(() => {
      //... 정밀한 동작이 필요할때 사용하기도 함.
    })
  }

  state = {
    result: this.props.tryInfo.result,
    try: this.props.tryInfo.try,
  }

  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    )
  }
}

export default TryClass;