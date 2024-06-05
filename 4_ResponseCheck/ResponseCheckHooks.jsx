import React, {useRef, useState} from "react";

const ResponseCheckHooks = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);

  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  //useRef 변수를 사용한 부분은 return 부분이 재실행 되지 않음.
  //불필요한 랜더링을 막아야함
  // 값이 바뀌어도 화면에 영향을 미치지 않음.
  //


  const onClickScreen = () => {
    if (state === 'waiting') {
      timeout.current = setTimeout( () => {
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); //2초~3초
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.')
    } else if (state === 'ready') { //성급하게 클릭
      clearTimeout(timeout.current); //timeout 없애기
      setState('waiting');
      setMessage('성급하셨군요. 초록색이 된 후에 클릭하세요.');
    } else if (state === 'now') {//반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevResult) => { return [...prevResult, endTime.current - startTime.current]});
    }
  }

  const renderAverage = () => {
    return ( result.length === 0
          ? null
          :<>
            <div>평균 시간: {result.reduce((a, c) => a + c / result.length)}ms</div>
            <button onClick={onReset}>reset</button>
            </>
    )
  }

  const onReset = () => {
    setResult([]);
  }

    return (
      <>
        <div id="screen" className={state} onClick={onClickScreen}>
          {message}
        </div>
        {/*{this.state.result.length === 0*/}
        {/*  ? null*/}
        {/*  : <div>평균 시간: {this.state.result.reduce((a, c) => a + c / this.state.result.length)}ms</div>*/}
        {/*}*/}
        {renderAverage()}
      </>

    );

}

export default ResponseCheckHooks;