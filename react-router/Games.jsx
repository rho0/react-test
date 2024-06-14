import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import NumberBaseballHooks from "../3_BaseBallGame/NumberBaseballClass";
import LottoHook from "../6_Lotto/LottoClass";
// import GameMatcher from "./GameMatcher";
import Game from "./game";

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to={"/game/numberBaseball"}>숫자야구</Link>
        <br />
        <Link to={"/game/numberBaseball/1"}>숫자야구/Class 호출</Link>
        <br />
        <Link to={"/game/numberBaseball/2"}>숫자야구/Function 호출</Link>
        <br />
        <Link to={"/game/lotto"}>lotto</Link>
        <br />
        <Link to={"/game/test"}>게임매쳐</Link>
        <br />
      </div>
      <div>
        <Routes>
          <Route path={"/numberBaseball"} element={<NumberBaseballHooks />} />
          <Route path={"/lotto"} element={<LottoHook />} />
          <Route path={"/game/*"} element={<Game />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Games;
