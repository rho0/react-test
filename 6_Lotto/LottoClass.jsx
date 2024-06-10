import React, {Component} from "react";
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

class LottoClass extends Component {
  state = {
    winNumbers: getWinNumbers(), //당첨 숫자들
    winBalls: [], //보너스 공
    bonus: null,
    redo: false,
  };

  timeouts = [];

   runTimeOuts = () => {
     const {winNumbers} = this.state;
     for (let i = 0; i<this.state.winNumbers.length -1; i++) {
       this.timeouts[i] = setTimeout(() => {
         this.setState((prevState) => {
           return {
             winBalls: [...prevState.winBalls, winNumbers[i]],
           };
         });
       }, (i + 1) * 1000);
     }
     this.timeouts[6] = setTimeout(() => {
       this.setState({
         bonus: winNumbers[6],
         redo: true,
       })
     }, 7000)
   }
  componentDidMount() {
    this.runTimeOuts();
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.winBalls.length === 0) {
      this.runTimeOuts();
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach((v) => {
       clearTimeout(v);
    })
  }

  onClickRedo = () => {
    this.setState( {
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  }

  render() {
    const {winBalls, bonus, redo} = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="resultWin">
          {winBalls.map((v) => <BallClass key={v} number={v} />)}
        </div>
        <div>보너스 !</div>
        {bonus && <BallClass number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더 !</button>}
      </>
    )
  }

}

export default LottoClass;