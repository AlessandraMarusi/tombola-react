import * as React from "react";

const InputNumber = () => {
  const changeNumber: any = () => {};
  return (
    <div>
      <input
        type="text"
        name="inputNumber"
        placeholder="1"
        onChange={changeNumber}
      />
    </div>
  );
};

export default InputNumber;
