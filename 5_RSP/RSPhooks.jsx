import React, {useEffect, useRef, useState} from "react";
import useInterval from "./useInterval";


const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px,'
};

const scores = {
  가위: 1,
  바위: 0,
  보 : -2,
}


const RSPhooks = () => { //함수컴포넌트는 이 안이 통째로 리렌더링
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const [isRunning, setRunning] = useState(true);

  const interval = useRef();

  useEffect(() => { //componentDidMount, componentDidUpdate 역할을 대신 해줄 공간(1:1 대응은 아님.)
    interval.current = setInterval(changeHand, 100);
    return () => {// componentWillUnMount 역할.
      clearInterval(interval.current);

    }

  }, [imgCoord]);
  //클로저 문제 해결해주는 부분, 여기에

  const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
      return v[1] === imgCoord;
    })[0];
  }

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위)
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보)
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위)
    }
  }

  useInterval(changeHand(), isRunning ? 100 : null);

  const onClickBtn = (choice) => () => {
    // clearInterval(interval.current);

    if (isRunning) {
      setRunning(false);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;

      if (diff === 0) {
        setResult('비겼다.')
      } else if ([-1, 2].includes(diff)) {
        setResult('이김.');
        setScore((prevScore) => prevScore + 1);
      } else {
        setResult('졌다.');
        setScore((prevScore) => prevScore - 1);
      }

      setTimeout(() => {
        setRunning(true);
        //interval.current = setInterval(changeHand, 100);
      }, 1000);
    }
  }


  return (
    <>
      <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}/>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  )
}


export default RSPhooks;