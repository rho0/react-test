const React = require('react');
const {useState, useRef} = React;

const GuGuDan = () => {
    //꼭 컴포넌트 안에 있어야함.
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (parseInt(value) === first * second) {
            setResult('정답: ' + value);
            setResult((prevResult) => {
                return 'pre정답: '+ value
            });
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue(''); //setState를 모아서 한번에 렌더함 ==> react 공식 문서에 제공 ==> 렌더링이 한번 일어남
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

    console.log('렌더링')
    // class,for 두가지 사용 못함 className, htmlFor을 사용해야함
    return(
        <>
            <div>{first} 곱하기 {second}</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} onChange={onChangeInput} value={value}/>
                <button id="button">입력!</button>
            </form>
            <div>{result}</div>
        </>
    );
};

module.exports = GuGuDan;