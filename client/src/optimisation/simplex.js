export function simplex(c, k) {
  if (c.length + 1 !== k.length) throw "Wrong vectors length";

  if (k[0] > k.reduce((acc, val, ind) => acc + val) - k[0]) throw "Unsolvable";
  let cMax = c.map(el => -el);
  let rows = c.length + 2;
  let cols = c.length + 1;
  //начальная таблица для F(x,a)=-a
  let table = array2D(rows);
  for (let i = 0; i < rows - 1; i++) {
    table[0][i] = 1;
  }
  for (let i = 1; i < rows - 1; i++) {
    for (let j = 0; j < cols - 1; j++) {
      if (i - 1 === j) table[i][j] = 1;
      else table[i][j] = 0;
    }
  }
  for (let i = 0; i < rows - 1; i++) {
    table[i][cols - 1] = k[i];
  }
  for (let i = 0; i < cols - 1; i++) {
    table[rows - 1][i] = -1;
  }
  table[rows - 1][cols - 1] = -k[0];

  //базисные переменные
  let basicVars = [
    {
      type: "a",
      ind: 0
    }
  ];
  for (let i = 0; i < c.length; i++) {
    basicVars.push({
      type: "s",
      ind: i
    });
  }
  //небазисные переменные x
  let nonBasicVars = [];
  for (let i = 0; i < c.length; i++) {
    nonBasicVars.push({
      type: "x",
      ind: i
    });
  }
  //итерации
  let newTable = table;
  while (!isOptimal(newTable[rows - 1])) {
    newTable = iterate(newTable, basicVars, nonBasicVars);
  }
  if (newTable[rows - 1][cols - 1] !== 0) {
    return null;
  }

  //удаляем строку или столбец a0
  //и пересчитываем функцию
  let aInd = -1;
  for (let i = 0; i < basicVars.length; i++) {
    let val = 0;
    if (basicVars[i].type === "a") {
      aInd = i;
      continue;
    }
    if (basicVars[i].type === "x") {
      val = cMax[basicVars[i].ind];
    }
    for (let j = 0; j < cols; j++) {
      newTable[rows - 1][j] += val * newTable[i][j];
    }
  }
  if (aInd !== -1) {
    newTable.splice(aInd, 1);
    basicVars.splice(aInd, 1);
    aInd = -1;
  }
  for (let i = 0; i < nonBasicVars.length; i++) {
    let val = 0;
    if (nonBasicVars[i].type === "a") {
      aInd = i;
      continue;
    }
    if (nonBasicVars[i].type === "x") {
      val = cMax[nonBasicVars[i].ind];
    }
    newTable[rows - 1][i] -= val;
  }
  if (aInd !== -1) {
    for (let j = 0; j < rows; j++) {
      newTable[j].splice(aInd, 1);
    }
    nonBasicVars.splice(aInd, 1);
  }
  rows = newTable.length;
  cols = newTable[0].length;
  //newTable - начальная таблица
  //считаем f*(x)
  while (!isOptimal(newTable[rows - 1])) {
    newTable = iterate(newTable, basicVars, nonBasicVars);
  }
  //формируем ответ
  let ans = {
    x: new Array(c.length).fill(0),
    f: -newTable[rows - 1][cols - 1]
  };
  for (let i = 0; i < basicVars.length; i++) {
    if (basicVars[i].type === "x") {
      ans.x[basicVars[i].ind] = newTable[i][cols - 1];
    }
  }
  return ans;
}

function isOptimal(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < 0) return false;
  }
  return true;
}

function iterate(table, basicVars, nonBasicVars) {
  //разрешающий элемент
  let rows = table.length;
  let cols = table[0].length;
  let minCol = Number.MAX_VALUE;
  let minColInd = -1;
  for (let i = 0; i < cols - 1; i++) {
    if (table[rows - 1][i] < minCol) {
      minCol = table[rows - 1][i];
      minColInd = i;
    }
  }
  let minRow = Number.MAX_VALUE;
  let minRowInd = -1;
  for (let i = 0; i < rows - 1; i++) {
    if (table[i][minColInd] <= 0) continue;
    let quot = table[i][cols - 1] / table[i][minColInd];
    if (quot < minRow) {
      minRow = quot;
      minRowInd = i;
    }
  }
  let temp = basicVars[minRowInd];
  basicVars[minRowInd] = nonBasicVars[minColInd];
  nonBasicVars[minColInd] = temp;
  let pivot = table[minRowInd][minColInd];
  //пересчитываем таблицу
  let newTable = array2D(rows);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i === minRowInd && j === minColInd) {
        newTable[i][j] = 1 / pivot;
        continue;
      }
      if (i === minRowInd) {
        newTable[i][j] = table[i][j] / pivot;
        continue;
      }
      if (j === minColInd) {
        newTable[i][j] = -table[i][j] / pivot;
        continue;
      }
      newTable[i][j] =
        table[i][j] - table[minRowInd][j] * table[i][minColInd] / pivot;
    }
  }
  return newTable;
}

function array2D(n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr[i] = [];
  }
  return arr;
}
