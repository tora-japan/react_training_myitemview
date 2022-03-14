//import React, { useState, useEffect } from "react";

import React, { useState } from "react";
import trash from "./trash.svg";

function randomBool() {
  return Math.random() < 0.5;
}
function randomInt(max) {
  return Math.floor(Math.random() * max);
}
function uniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

function dummyItems(count, itemMax) {
  let items = [];
  for (let i = 0; i <= count; i++) items.push([]);
  for (let i = 1; i <= itemMax; i++) {
    items[randomInt(count + 1)].push({
      uid: uniqueId(),
      isSelected: randomBool(),
      name: "item" + (i < 10 ? "0" : "") + i,
    });
  }
  return items;
}

function dummyItems2(count, itemMax) {
  let items = [];
  for (let i = 0; i <= count; i++) items.push([]);
  for (let i = 1; i <= itemMax; i++) {
    items[0].push({
      uid: uniqueId(),
      isSelected: false,
      name: "item" + (i < 10 ? "0" : "") + i,
    });
  }
  return items;
}

// 初期化
const itemsInit = dummyItems(3, 9);

const MyItemView = () => {
  // useStateで変数を定義
  const [items, setItems] = useState(itemsInit);
  const [aName, setName] = useState("");
  const [groupCount, setGroupCount] = useState(3);
  const [itemCount, setItemCount] = useState(10);
  const [textFile, setTextFile] = useState("");

  //console.log(items);

  // リセットする
  function itemsReset(count) {
    let newItems = [];
    for (let i = 0; i <= count; i++) {
      newItems.push([]);
    }
    setItems(newItems);
  }

  // ソートする
  function itemsSort(newItems) {
    for (let i = 0; i < newItems.length; i++) {
      newItems[i].sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
    return newItems;
  }

  // アイテムを追加する
  function itemAdd(name) {
    let newItems = [...items];
    newItems[0].push({
      uid: uniqueId(),
      isSelected: false,
      name: name,
    });
    setItems(itemsSort(newItems));
    setName("");
  }
  // テキストリストを追加する
  function itemAddTextList(lines) {
    if (lines === undefined) return;
    if (lines.length === 0) return;
    let newItems = [...items];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] === undefined) continue;
      if (lines[i].length === 0) continue;
      // console.log(lines[i].length);
      newItems[0].push({
        uid: uniqueId(),
        isSelected: false,
        name: lines[i],
      });
    }
    setItems(itemsSort(newItems));
  }

  // アイテムを移動する
  function itemMove(dest, src, uid) {
    let newItems = [...items];
    // インデクスを検索
    let index = newItems[src].findIndex((item) => item.uid === uid);
    if (index === -1) return;
    // 選択フラグを変更
    newItems[src][index].isSelected = true;
    // 移動先のリストに追加
    newItems[dest].push(newItems[src][index]);
    // 移動元のリストから削除
    newItems[src].splice(index, 1);
    // 名前をソートする
    setItems(itemsSort(newItems));
  }

  // アイテムを削除する
  function itemRemove(src, uid) {
    // itemsをコピーする
    let newItems = [...items];
    let idx = newItems[src].findIndex((item) => item.uid === uid);
    if (idx === -1) return;
    newItems[src].splice(idx, 1);
    setItems(newItems);
  }

  // アイテムをトグル選択する
  function itemSelectToggle(src, uid) {
    let newItems = [...items];
    let idx = newItems[src].findIndex((item) => item.uid === uid);
    if (idx === -1) return;
    newItems[src][idx].isSelected = !newItems[src][idx].isSelected;
    setItems(newItems);
  }
  /*
  // アイテムを選択する
  function itemSelect(src, uid, isSelected) {
    let newItems = [...items];
    let idx = newItems[src].findIndex((item) => item.uid === uid);
    if (idx === -1) return;
    newItems[src][idx].isSelected = isSelected;
    setItems(newItems);
  }
  */

  // 全選択/全解除
  function itemSelectAll(src, isSelected) {
    let newItems = [...items];
    for (let i = 0; i < newItems[src].length; i++) {
      newItems[src][i].isSelected = isSelected;
    }
    setItems(newItems);
  }
  // アイテムをグループ移動する
  function itemMoveGroup(dest, src) {
    let newItems = [...items];
    for (let i = newItems[src].length - 1; i >= 0; i--) {
      if (newItems[src][i].isSelected) {
        newItems[dest].push(newItems[src][i]);
        newItems[src].splice(i, 1);
      }
    }
    // 名前をソートする
    for (let i = 0; i < newItems.length; i++) {
      newItems[i].sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
    setItems(newItems);
  }
  // アイテムを全てグループ移動する
  function itemMoveGroupAll(dest, src) {
    let newItems = [...items];
    for (let i = newItems[src].length - 1; i >= 0; i--) {
      newItems[dest].push(newItems[src][i]);
      newItems[src].splice(i, 1);
    }
    // 名前をソートする
    setItems(itemsSort(newItems));
  }

  //
  // ハンドルクリック用のインターフェス
  //

  // 選択
  const handleClickSelect = (id, uid) => {
    itemSelectToggle(id, uid);
  };
  // 削除
  const handleClickRemove = (uid) => {
    itemRemove(0, uid);
  };
  // 移動する
  const handleClickMove = (dest, src, uid) => {
    itemMove(dest, src, uid);
  };
  // グループ移動
  const handleClickMoveGroup = (dest, src) => {
    itemMoveGroup(dest, src);
  };

  // グループを全て移動する
  const handleClickMoveGroupAll = (dest, src) => {
    itemMoveGroupAll(dest, src);
  };

  // リセット
  const handleClickItemsReset = (count) => {
    itemsReset(count);
  };

  // ダミーデータを入れてリセット（ランダム）
  const handleClickItemsDummySet = (count, itemMax) => {
    setItems(dummyItems(count, itemMax));
  };

  // ダミーデータを入れてリセット（ルートのみにアイテムを追加する）
  const handleClickItemsDummySet2 = (count, itemMax) => {
    setItems(dummyItems2(count, itemMax));
  };

  // テキストファイルを読み込む
  const handleOnFileInputChange = (e) => {
    console.log("テキストファイルを読み込む");
    console.log(e.target.files);
    if (e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      //console.log(text);

      // テキストファイルを改行で分割する
      const lines = text.split("\n");
      //console.log(lines);
      itemAddTextList(lines);

      setTextFile("");
    };
    reader.readAsText(file); // 読み込み開始
  };

  // メイングループ（ルート）
  function main() {
    let listItems = [];
    for (let i = 0; i < items[0].length; i++) {
      const { uid, isSelected, name } = items[0][i];
      let aClassName = isSelected ? "flex bg-blue-200" : "flex";
      listItems.push(
        <div
          key={uid}
          className={aClassName}
          onClick={() => handleClickSelect(0, uid)}
        >
          <button
            onClick={() => handleClickRemove(uid)}
            className="btn bg-red-400"
          >
            <div className="flex items-center justify-center h-full">
              <img src={trash} alt="trash" />
            </div>
          </button>
          <div className="ml-2 p-2">{name}</div>
        </div>
      );
    }

    return (
      <>
        <div>ルート</div>
        <div>
          <button
            className="btn bg-gray-100 w/1/2"
            onClick={() => itemSelectAll(0, true)}
          >
            全選択
          </button>
          <button
            className="btn bg-gray-100 w/1/2"
            onClick={() => itemSelectAll(0, false)}
          >
            全解除
          </button>
        </div>

        {listItems}
      </>
    );
  }

  // グループ
  function group(id) {
    let listItems = [];
    for (let i = 0; i < items[id].length; i++) {
      const { uid, isSelected, name } = items[id][i];
      let aClassName = isSelected ? "flex bg-blue-200" : "flex";
      listItems.push(
        <div
          key={uid}
          className={aClassName}
          onClick={() => handleClickSelect(id, uid)}
        >
          <button
            onClick={() => handleClickMove(0, id, uid)}
            className="btn bg-green-400"
          >
            ⇦
          </button>
          <div className="px-4 py-2">{name}</div>
        </div>
      );
    }

    return (
      <>
        <div>
          <div>グループ {id}</div>
          <div className="flex">
            <div className="flex flex-col w-[270px] ">
              <button
                className="btn bg-gray-100 "
                onClick={() => handleClickMoveGroup(id, 0)}
              >
                ⇨グループ
              </button>
              <button
                className="btn bg-gray-100 "
                onClick={() => handleClickMoveGroup(0, id)}
              >
                ⇦ルート
              </button>

              <button
                className="btn bg-gray-100 "
                onClick={() => handleClickMoveGroupAll(0, id)}
              >
                ⇦全移動
              </button>

              <button
                className="btn bg-gray-100 "
                onClick={() => itemSelectAll(id, true)}
              >
                全選択
              </button>
              <button
                className="btn bg-gray-100 "
                onClick={() => itemSelectAll(id, false)}
              >
                全解除
              </button>
            </div>
            <div className="w-full">{listItems}</div>
          </div>
        </div>
      </>
    );
  }

  // グループを全て表示する
  let listGroup = [];
  for (let i = 1; i < items.length; i++) {
    listGroup.push(<div key={i}>{group(i)}</div>);
  }

  return (
    <div>
      <p>MyItemView</p>

      <div className="flex">
        <div className="px-4 py-2">グループ数</div>
        <input
          className="inputText"
          type="number"
          value={groupCount}
          placeholder="1"
          step="1"
          min="2"
          max="10"
          onChange={(e) => {
            let value = 0;
            if (e.target.value !== "") {
              value = parseInt(e.target.value);
            }
            if (value === 0) value = 2;

            setGroupCount(value);
            handleClickItemsReset(value);
          }}
        />
        <input
          className="btn bg-blue-400 text-white"
          type="button"
          value="リセット"
          onClick={() => handleClickItemsReset(groupCount)}
        />
      </div>
      <div className="flex">
        <div className="px-4 py-2">アイテム数</div>
        <input
          className="inputText"
          type="number"
          value={itemCount}
          placeholder="1"
          step="1"
          min="2"
          max="100"
          onChange={(e) => {
            let value = 0;
            if (e.target.value !== "") {
              value = parseInt(e.target.value);
            }
            if (value === 0) value = 2;
            setItemCount(value);
          }}
        />

        <input
          className="btn bg-blue-400 text-white"
          type="button"
          value="ダミー作成"
          onClick={() => handleClickItemsDummySet(groupCount, itemCount)}
        />
        <input
          className="btn bg-blue-400 text-white"
          type="button"
          value="ダミー作成2"
          onClick={() => handleClickItemsDummySet2(groupCount, itemCount)}
        />
      </div>

      <div className="flex ">
        <div className="px-4 py-2">名称</div>
        <input
          className="inputText"
          type="text"
          value={aName}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={() => itemAdd(aName)}
          className="btn bg-blue-400 text-white"
        >
          追加
        </button>
      </div>

      <div className="flex">
        <div className="px-4 py-2">テキスト読み込み</div>
        <input
          type="file"
          onChange={handleOnFileInputChange}
          value={textFile}
        />
      </div>

      <div className="flex ">
        <div className="w-2/5">{main()}</div>
        <div className="w-fill">{listGroup}</div>
      </div>
    </div>
  );
};

export default MyItemView;
