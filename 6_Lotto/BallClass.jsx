import React, {memo, PureComponent} from "react";


/**
 * 아래 pureComponent 외의 다른 방법
 * ※ Hooks 버전 아님. 일반 함수 컴포넌트 (High Order Component[HOC]라고 함) ※
 * ※ Hooks => useState, useEffect 등
 * */
const BallClass = memo(({number}) => { //memo -> PureComponent 역할을 함.
  let background;
  if (number <= 10) {
    background = 'red';
  } else if (number <= 20) {
    background = 'orange';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'blue';
  } else {
    background = 'green'
  }
  return (
    <div className="ball" style={{ background }}>{number}</div>
  )
});


// class BallClass extends PureComponent {
//   render() {
//     const {number} = this.props;
//
//     let background;
//     if (number <= 10) {
//       background = 'red';
//     } else if (number <= 20) {
//       background = 'orange';
//     } else if (number <= 30) {
//       background = 'yellow';
//     } else if (number <= 40) {
//       background = 'blue';
//     } else {
//       background = 'green'
//     }
//     return (
//       <div className="ball" style={{ background }}>{number}</div>
//     )
//   }
// }

export default BallClass;