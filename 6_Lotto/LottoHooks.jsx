import React, {Component, useEffect, useRef, useState} from "react";
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
  const [winNumbers, setWinNumbers] = useState(getWinNumbers());
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


  const onClickRedo = () => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = []; //timeouts 값이 변화함
  }

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