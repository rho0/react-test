import React, {useState} from "react";

const Form = () => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);

  return (
    <div>
      <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="가로" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="지뢰" value={row} onChange={onChangeRow} />
    </div>
  )

}

export default Form;