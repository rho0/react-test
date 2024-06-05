import React, { Component } from "react";


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

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
}

class RSPclass extends Component {
  state = {
    result: '',
    imgCoord: rspCoords.바위,
    score: 0,
  }

  interval;

  /** componentDidMount
   * 컴포넌트가 첫 렌더링된 후.랜더가 성공적으로 실행됬다면, render 다음 실행됨. 리렌더링 실행시에 실행되지 않음.
   * 이 부분에 비동기 요청을 많이 작성함.
   **/
  componentDidMount() {
    this.interval = setInterval(() => {
      const {imgCoord} = this.state; // 비동기 함수가 비동기 함수 바깥에 있는 변수 참조시 클로저 발생!(js)
      if (imgCoord === rspCoords.바위) {
        this.setState({
          imgCoord: rspCoords.가위,
        });
      } else if (imgCoord === rspCoords.가위) {
        this.setState({
          imgCoord: rspCoords.보,
        });
      } else if (imgCoord === rspCoords.보) {
        this.setState({
          imgCoord: rspCoords.바위,
        });
      }
    }, 1000)
  }


  /** componentWillUnmount
   * 컴포넌트가 제거되기 직전.
   * 부모에의해 자식 컴포넌트가 없어질경우에 실행됨.
   * 비동기 요청 정리를 하는 부분.
   */
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeHand = () => {

  }

  onClickBtn = (choice) => {
    const {imgCoord} = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      this.setState({
        result: '비겼다',
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return{
          result: '이김',
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌다',
          score: prevState.score - 1,
        };
      });
    }

    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 1000);

  }

  render() {
    const {result, score, imgCoord} = this.state;
    return (
      <>
        <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}/>
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    )
  }

}


export default RSPclass;