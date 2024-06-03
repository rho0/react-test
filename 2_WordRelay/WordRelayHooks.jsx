const React = require('react'); //불러와야 쓸 수 있다.
const { useState, useRef } = React


const WordRelay = () => {
  const[word, setWord] = useState('시작');
  const[value, setValue] = useState('');
  const[result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[word.length -1] === value[0]) {
      setResult('딩동댕');
      setValue('');
      setWord(value);
      inputRef.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return(
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="wordInput">글자를 입력하세요</label>
        <input id="wordInput" className="wordInput" ref={inputRef} value={value} onChange={onChangeInput}/>
        <button>입력!</button>
        </form>
        <div>{result}</div>
    </>
  )// <!-- 태그에 htmlFor과 className 권장( for, class 사용 가능한 상태이지만, 간혹 에러가 발생함) -->
}

module.exports = WordRelay;

//파일을 쪼갤때 React와 module.exports를 써줘야함