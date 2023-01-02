export const qtySum = function (items, prop) {
    return items.reduce(function (a, b) {
      return parseInt(a) + parseInt(b[prop]);
    }, 0);
  };``

  export const groupBy = function (arr, key) {
    console.log("arrrr", arr);
    return arr.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
  
      return rv;
    }, {});
  };

   // Warn if overriding existing method
   if (Array.prototype.equals)
   console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
 // attach the .equals method to Array's prototype to call it on any array
 Array.prototype.equals = function (array) {
   // if the other array is a falsy value, return
   if (!array)
     return false;

   // compare lengths - can save a lot of time 
   if (this.length != array.length)
     return false;


   for (var i = 0; i < this.length; i++) {
     // Check if we have nested arrays
     if (!array.includes(this[i]))
       return false



     // if (this[i] instanceof Array && array[i] instanceof Array) {
     //   // recurse into the nested arrays
     //   if (!this[i].equals(array[i]))
     //     return false;
     // }
     // else if (this[i] != array[i]) {
     //   // Warning - two different object instances will never be equal: {x:20} != {x:20}
     //   return false;
     // }
   }
   return true;
 }
 // Hide method from for-in loops
 Object.defineProperty(Array.prototype, "equals", { enumerable: false });


 swapcase = function swapcase(str) {
  return str.replace(/([a-z]+)|([A-Z]+)/g, function(match, chr) {
      return chr ? match.toUpperCase() : match.toLowerCase();
  });
}