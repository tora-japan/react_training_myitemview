import React, { useState, useEffect } from "react";

function myInit() {
  console.log("myInit");
  return 123;
}
const countInit = myInit();

const Func1 = () => {
  // useStateで変数を定義
  const [count, setCount] = useState(countInit);

  useEffect(() => {
    document.title = `${count}回クリックされました`;
  }, []);

  // countを表示
  return (
    <div>
      <p>func1</p>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>count up</button>
    </div>
  );
};

// ＮＧっぽい
const Func2 = () => {
  let a = 0;
  useEffect(() => {
    a = 123;
    console.log("useEffect");
  }, []);
  // useStateで変数を定義
  const [count, setCount] = useState(a);

  console.log("レンダリング");

  // countを表示
  return (
    <div>
      <p>func2</p>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>count up</button>
    </div>
  );
};

const Func3 = () => {
  return (
    <>
      <p>func3</p>
      <Company gaiyou="ほげほげ" zigyou="代理店"></Company>;
    </>
  );
};

function Company(props) {
  function about() {
    return (
      <>
        <h1>会社概要</h1>
        <p>{props.gaiyou}</p>
      </>
    );
  }
  function business() {
    return (
      <>
        <h1>事業内容</h1>
        <p>{props.zigyou}</p>
      </>
    );
  }

  return (
    <>
      {about()}
      {business()}
    </>
  );
}

export default Func1;
