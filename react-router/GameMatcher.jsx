import React, {Component} from "react";
import NumberBaseballClass from "../3_BaseBallGame/NumberBaseballClass";
import LottoClass from "../6_Lotto/LottoClass";

class GameMatcher extends Component {

  render() {
    console.log("this.props")
    console.log(this.props.name)
    if (this.props.match.params.name === 'numberBaseball') {
      return <NumberBaseballClass/>
    } else if (this.props.match.params.name === 'lotto') {
      return <LottoClass/>
    }
    return (
      <div>게임매쳐</div>
    )
  }

}

export default GameMatcher