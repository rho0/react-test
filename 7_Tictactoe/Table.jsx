import React, {useMemo} from "react";
import Tr from "./Tr";

const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      <tbody>
      {Array(tableData.length).fill().map((tr, i) =>(
        <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]}>{''}</Tr>))

        // memo로도 최적화가 안될경우 useMemo 사용하여 최적화 (컴포넌트 자체를 기억할 수 있음.)
        // useMemo(() => {<Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]}>{''}</Tr>})))
      }
      </tbody>
    </table>
  )
}

export default Table;