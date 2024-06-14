import React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import NumberBaseballHooks from "../3_BaseBallGame/NumberBaseballClass"
import LottoHook from "../6_Lotto/LottoClass"
import GameMatcher from "./GameMatcher"


const Games = () => {
  return (
      <BrowserRouter>
        <div>
          {/*<Link to={"/numberBaseball"}>숫자야구</Link><br/>*/}
          {/*<Link to={"/lotto"}>lotto</Link>*/}
          <Link to={"/game/numberBaseball"}>숫자야구</Link><br/>
          <Link to={"/game/lotto"}>lotto</Link><br/>
          <Link to={"/game/test"}>게임매쳐</Link><br/>
        </div>
        <div>
          <Routes>
            <Route path={"/numberBaseball"} element={<NumberBaseballHooks/>}/>
            <Route path={"/lotto"} element={<LottoHook />}/>
            <Route path={"/game/:name"} element={<GameMatcher />}/>
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default Games;