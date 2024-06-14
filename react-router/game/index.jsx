import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import NumberBaseballClass from "../../3_BaseBallGame/NumberBaseballClass";
import LottoClass from "../../6_Lotto/LottoClass";
import DetailPages from "./numberBaseball";

class Game extends Component {
  render() {
    return (
      <Routes>
        <Route path="numberBaseball" element={<NumberBaseballClass />} />
        <Route path="numberBaseball/:testId" element={<DetailPages />} />
        <Route path="lotto" element={<LottoClass />} />
      </Routes>
    );
  }
}

export default Game;
