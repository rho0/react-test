import React, {useReducer, createContext, useMemo} from "react";
import Table from "./Table";
import Form from "./Form";

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0이상이면 다 opened
}

//export 함으로써 다른 파일에서 가져다 쓸 수 있게 만듦.
export const TableContext = createContext( {
  //초기값
  tableData: [],
  dispatch: () => {},
});


const initialState = {
  tableData: [],
  timer: 0,
  result: '',
  halted: false,
};

const plantMine = (row, cell, mine) => {
  console.log( row, cell, mine);
  const candidate = Array( row * cell).fill().map((arr, i) => {
    return i;
  });
  const shuffle = []; // 0 ~ 99까지 칸들 중에서 지뢰 개수만큼 뽑아 놓은것.
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i=0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k=0; k<shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE; //지뢰 심기
  }
  console.log(data)
  return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.OPENED;
      return {
        ...state,
        tableData,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }

    default:
      return state;
  }
}


const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useMemo를 사용해서 캐싱 한번 해야 성능 저하가 덜 일어남.
  // dispatch는 바뀌지 않는 함수 => [] 안에 추가하지 않아도됨.
  const value = useMemo(() => ({ tableData: state.tableData, dispatch}), [state.tableData]);
  return (
    // context.Provider: 데이터에 접근하고싶은 컴포넌트를 provider로 묶어줌. 그래야 그 아래 컴포넌트에 접근 가능
    // value: 전달해줄 데이터
    // <TableContext.Provider value={{tableData: state.tableData, dispatch}}> //-> 이렇게 쓰면 안됨

    <TableContext.Provider value={value}>
      <Form  />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  )

}

export default MineSearch;