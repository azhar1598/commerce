export const qtySum = function (items, prop) {
    return items.reduce(function (a, b) {
      return parseInt(a) + parseInt(b[prop]);
    }, 0);
  };

  export const groupBy = function (arr, key) {
    console.log("arrrr", arr);
    return arr.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
  
      return rv;
    }, {});
  };