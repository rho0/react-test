import React, {Component, useState, useCallback, useReducer, useEffect} from "react";
import Table from "./Table";

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [['', '', ''],['', '', ''],['', '', '']],
  recentCell: [-1, -1],
}

// action type은 별도 선언하는것을 권장 (export를 붙여 모듈로 만들기 -> Td에서도 쓸거여서)
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
  switch(action.type) {
    case SET_WINNER:  //state.winner = action.winner; 이렇게 하면 안됨!!
      return {
        ...state, //기존 state 얕은복사
        winner: action.winner, // 바뀌는  state값만 변경해줌.
      };
    case CLICK_CELL:
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 문제 해결할 예정
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state, //기존 state 얕은복사
        tableData,
        recentCell: [action.row, action.cell],
      };
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    case RESET_GAME:
      return {
        ...state,
        turn: 'O',
        tableData: [['', '', ''],['', '', ''],['', '', '']],
        recentCell: [-1, -1],
      };
    default:
      return state;
  }
}

const TictactoeHooks = () => {
  // state가 많아지면 관리가 힘들어짐 -> useReducer로 정리가능!
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell }  = state;
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''],['', '', ''],['', '', '']]);

  const onClickTable = useCallback(() => {
    dispatch({ type: 'SET_WINNER', winner: 'O'}); //action객체
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }

    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell]) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    
    if (win) {// 이겼을 경우,
      dispatch({ type: SET_WINNER, winner: turn}); //비동기
      dispatch({ type: RESET_GAME})
    } else {
      let all = true; // 무승부라는 뜻
      tableData.forEach((row) => {row.forEach((cell) => {if (!cell) { all = false}})})//무승부검사
      if (all) {  dispatch({ type: RESET_GAME});}
      else {dispatch({ type:CHANGE_TURN });}
    }
  }, [recentCell]);

  return (
    <>
      <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
      {state.winner && <div>{state.winner} 님의 승리</div>}
    </>
  )
}

export default TictactoeHooks;