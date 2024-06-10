import React, {Component, useCallback, useEffect, useMemo, useRef, useState} from "react";
import BallClass from './BallClass';


function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length -1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const LottoHooks = () => {
  //getWinNumbers가 렌더되는 만큼 호출되는것 방지하기
  // useMemo(() => {}, []) 배열안에 값이 바뀌지 않는한 다시 호출하지 않는다. 배열안에 들어간 인자값이 바뀌면 useMemo도 다시 실행됨.
  // useMemo: 복잡한 함수 결과값을 기억함(함수의 리턴값을 기억함). useRef: 일반 값을 기억함.
  const lottoNumbers = useMemo(() => getWinNumbers(), []);

  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);


  // const runTimeOuts = () => {
  //    for (let i = 0; i<winNumbers.length -1; i++) {
  //      timeouts.current[i] = setTimeout(() => {
  //        setWinBalls((prevState) => [...prevState.winBalls, winNumbers[i]])
  //      }, (i + 1) * 1000);
  //    }
  //    timeouts.current[6] = setTimeout(() => {
  //      setBonus(winNumbers[6]);
  //      setRedo(true);
  //    }, 7000)
  // }

  useEffect(() => {
    // runTimeOuts();
    for (let i = 0; i<winNumbers.length -1; i++) {
      timeouts.current[i] = setTimeout(() => { //timeouts 값이 변화하는게 아님.i번째에 값을 넣어준는것임.
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]])
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => { //componentWillUnmount
      timeouts.current.forEach((v) => { clearTimeout(v)});
    }
  }, [timeouts.current]); //빈 배열일 경우 componentDidMount 와 같음.
  //배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행


  // useCallback: 함수 자체를 기억함
  // 함수 컴포넌트가 재실행되도 onClickRedo가 재실행 되지 않음
  // 예를들어 함수 생성 자체가 너무 오래걸릴 경우에 사용.
  // 필수 사용: 자식 컴포넌트에 함수 자체를 넘겨줄 경우 꼭 useCallback을 사용해야함!
  const onClickRedo = useCallback(() => {
    //배열에 값을 넣지 않는다면 console.log(winNumbers)를 찍어보면 값이 변하지만 계속 첫번째 return값을 기억하고있음.
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = []; //timeouts 값이 변화함
  }, [winNumbers]); // 배열안의 값이 매우 중요함! 어떤값이 변햇을떄 다시 실행할지 정하는 부분!

    return (
      <>
        <div>당첨 숫자</div>
        <div id="resultWin">
          {winBalls.map((v) => <BallClass key={v} number={v} />)}
        </div>
        <div>보너스 !</div>
        {bonus && <BallClass number={bonus} />}
        {redo && <button onClick={onClickRedo}>한 번 더 !</button>}
      </>
    )
}

export default LottoHooks;