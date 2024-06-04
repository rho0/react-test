import React, {memo} from 'react';

//const Try = ({tryInfo}) => {} props 자리를 구조분해 할당으로 작성해도 무관하다. 보통 (props) 보다  ({tryInfo})와 같이 구조분해해서 사용함
const TryHooks = memo(({tryInfo}) => {
  //tryInfo.try='hello' 와 같이 값을 직접 변경하면 안된다
  //props는 부모가 바꾸어주어야함.
  //자식에서 바꿔야 할 경우 state에 넣어준다
  // const [result, setResult] = useState(tryInfo.reslt);
  // const onClick = () => {
  //   setResult('1')
  // }

  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  )
});

export default TryHooks;