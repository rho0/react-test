import React, {Component, createRef} from 'react';
import TryHooks from './TryHooks'

function getNumbers() { //숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;

}


class NumberBaseballClass extends Component{
  state = {
    result: '',
    value: '',
    answer: getNumbers(), //this를 쓰지 않을때 바깥으로 빼는편. class 안에 작성해서 this.getNumbers()를 사용해도 무관하다.
    tries:[], //push 쓰면 안됩니다.
  };

  fruits = [{fruit: '사과', taste: '새콤'},
    {fruit: '포도', taste: '달다'},
    {fruit: '귤', taste: '시다'},
    {fruit: '배', taste: '시원'}, ];

  onSubmitForm = (e) => {
    //비구조화 분해할당으로 this.state의 반복되는 코드를 줄일 수 있다.
    // const { result, tries, answer } = this.state;
    //props도 똑같음 : const { tryInfo } = this.props; -> TryClass.jsx에 작성하면됨.

    e.preventDefault();
    if (this.state.value == this.state.answer.join('')) {
      this.setState( {
        result: '홈런',
        tries: [...this.state.tries, {try: this.state.value, result: '홈런!'}]
      });
      alert('게임을 다시 시작합니다');
      this.setState( {
        value: '',
        answer: getNumbers(),
        tries:[],
      });
    } else {
      const answerArray = this.state.value.split('').map( (v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState( {
          result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였습니다.`
        });
        alert('게임을 다시 시작합니다');
        this.setState( {
          value: '',
          answer: getNumbers(),
          tries:[],
        });
      } else {
        for (let i=0; i<4; i+=1) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState( {
          tries: [...this.state.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball}볼`}]
        })
      }
    }
    this.inputRef.current.focus();
  }

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  }

  inputRef = createRef();

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map( (v,i) => {
            return (
              <TryHooks key={`${i + 1}차시도: `} tryInfo={v} index={i}/>
            )
          })}
        </ul>
      </>
    );
  }

}
export default NumberBaseballClass; //import NumberBaseball; 를 사용해서 가져와야함.