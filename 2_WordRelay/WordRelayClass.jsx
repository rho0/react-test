const React = require('react'); //불러와야 쓸 수 있다.
const { Component } = React
class WordRelayClass extends Component {
  state = {
   word:'시작',
   value: '',
   result: '',
  };

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length -1] === this.state.value[0]) {
            this.setState({
                result: '딩동댕',
                word: this.state.value,
                value: '',
            });
            this.input.focus();
        } else {
            this.setState({
                result: '땡',
                value: '',
            });
            this.input.focus();
        }
    };
    onChangeInput = (e) => {
      this.setState({value: e.target.value})
    };
    onRefInput = (e) => {
        this.input = e;
    };
    input;
  render(){
    return(
        <>
          <div>{this.state.word}</div>
          <form onSubmit={this.onSubmitForm}>
           <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}/>
           <button>입력!</button>
          </form>
            <div>{this.state.result}</div>
        </>
    )
  }
}

module.exports = WordRelayClass;

//파일을 쪼갤때 React와 module.exports를 써줘야함