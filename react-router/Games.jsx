import React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import NumberBaseballHooks from "../3_BaseBallGame/NumberBaseballHooks"
import lottoHook from "../6_Lotto/LottoHooks"


const Games = () => {
  return (
      <BrowserRouter>
        <Link to={"/numberBaseball"}>숫자야구</Link><br/>
        <Link to={"/lotto"}>lotto</Link>
        <div>
          <Routes>
            <Route path={"/numberBaseball"} component={NumberBaseballHooks}/>
            <Route path={"/numberBaseball"} component={NumberBaseballHooks}/>
          <Route path={"/lotto"} component={lottoHook}/>
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default Games;