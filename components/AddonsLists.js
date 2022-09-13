import React from "react";

const groupBy = function (arr, key) {
  return arr.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);

    return rv;
  }, {});
};

const AddonsLists = ({ itemMap }) => {
  return (
    <div className="flex flex-col pl-4 mt-4" style={{ width: "100%" }}>
      <p className="pl-4 -mt-3"></p>
      {(() => {
        const newVar = groupBy && groupBy(itemMap?.addons || [], "add_on_title");
        return Object.keys(newVar).map((item, index) => {
          const addons = newVar[item];

          return (
            <div className="flex w-100">
              <p className="font-montMedium px-1 -mt-3">{item}:</p>
              {addons.map((addon, num) => {
                return (
                  <p className="font-montRegular px-1 -mt-3">
                    {addon.add_on_name ? addon.add_on_name : addon.text}
                  </p>
                );
              })}
            </div>
          );
          // })
        });
      })()}
    </div>
  );
};

export default AddonsLists;
