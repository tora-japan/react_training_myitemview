import React, { useState, useEffect } from "react";

const myInit = () => {
  return 123;
};

const Func = () => {
  const [isInit, setInit] = useState(0);
  let a = 0;

  // 最初の一回だけ実行される
  if (!isInit) {
    setInit(1);
    a = myInit();
  }
  // useStateで変数を定義
  const [count, setCount] = useState(a);

  function handleClick() {
    setCount(count + 1);
  }

  function ItemView(props) {
    function main() {
      return (
        <>
          main
          <button onClick={handleClick}>count up</button>
        </>
      );
    }
    function sub(id) {
      return <>sub {id}</>;
    }
    return (
      <>
        <p>func4</p>
        <p>{count}</p>
        {main()}
        {sub(1)}
        {sub(2)}
      </>
    );
  }

  // countを表示
  return (
    <div>
      <p>func1</p>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>count up</button>
      <ItemView aValue="123"></ItemView>
    </div>
  );
};

export default Func;
