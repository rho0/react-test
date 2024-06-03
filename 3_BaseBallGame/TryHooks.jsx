import React from 'react';

//const Try = ({tryInfo}) => {} props 자리를 구조분해 할당으로 작성해도 무관하다. 보통 (props) 보다  ({tryInfo})와 같이 구조분해해서 사용함
const TryHooks = ({tryInfo}) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  )
}

export default TryHooks;