import React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import NumberBaseballHooks from "../3_BaseBallGame/NumberBaseballClass"
import LottoHook from "../6_Lotto/LottoClass"


const Games = () => {
  return (
      <BrowserRouter>
        <div>
          <Link to={"/numberBaseball"}>숫자야구</Link><br/>
          <Link to={"/lotto"}>lotto</Link>
        </div>
        <div>
          <Routes>
            <Route path={"/numberBaseball"} element={<NumberBaseballHooks/>}/>
            <Route path={"/lotto"} element={<LottoHook />}/>
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default Games;