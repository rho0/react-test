import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import NumberBaseballClass from "../3_BaseBallGame/NumberBaseballClass";
import LottoClass from "../6_Lotto/LottoClass";

class GameMatcher extends Component {
  render() {
    return (
      <Routes>
        <Route path="numberBaseball" element={<NumberBaseballClass />} />
        <Route path="lotto" element={<LottoClass />} />
      </Routes>
    );
  }
}

export default GameMatcher;
