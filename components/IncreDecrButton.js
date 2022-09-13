import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useMemo } from "react";

const IncreDecrButton = ({
  storeSettings,
  decrAddQty,
  incrAddQty,
  uId,
  rgbaBackground,
  addQty,
  rgbaColor,
  item_name,
}) => {

  
  return (
    <div className="flex justify-between ">
      <div span={12} style={{ alignItems: "center" }}>
        <p className="font-montMedium px-4 text-lg mb-0 mt-0">{item_name}</p>
      </div>
      <div>
        <div className="flex flex-col">
          <div
            className="border space-x-9  flex items-center "
            style={{
              backgroundColor: "white",
              color: `${
                storeSettings.data
                  ? storeSettings.data.secondary_color
                  : "black"
              }`,
              borderColor: `${
                storeSettings.data
                  ? storeSettings.data.secondary_color
                  : "black"
              }`,
            }}
          >
            <span
              onClick={(e) =>
                // handleDecreaseQuantity(
                //   initialState.defaultVariantItem
                //     ? initialState.defaultVariantItem
                //         .variant_item_id
                //     : id,
                //   cart.find(function (item) {
                //     if (initialState.defaultVariantItem) {
                //       if (item.defaultVariantItem) {
                //         if (
                //           item.defaultVariantItem
                //             .variant_item_id ==
                //           initialState.defaultVariantItem
                //             .variant_item_id
                //         ) {
                //           return item;
                //         }
                //       }
                //     } else if (item.item_id == id) {
                //       return item;
                //     }
                //   }).qty - 1
                // )
                decrAddQty(e, uId)
              }
              className={`px-3 py-2 text-xl cursor-pointer`}
              style={{
                backgroundColor: `${
                  storeSettings.data ? rgbaBackground : "black"
                }`,
                color: `${storeSettings.data ? rgbaColor : "white"}`,
                borderColor: `${
                  storeSettings.data
                    ? storeSettings.data.secondary_color
                    : "black"
                }`,
              }}
            >
              <MinusOutlined />
            </span>

            <span
              className={` text-2xl `}
              style={{
                color: `${
                  storeSettings.data
                    ? storeSettings.data.primary_color
                    : "white"
                }`,
              }}
            >
              {addQty}

              {/* ------------------------------------------------------ COMMENTED CODE ---------------------------------------------- */}

              {/* {!customItemData.addons
        ? cart.find(function (item) {
            if (initialState.defaultVariantItem) {
              if (item.defaultVariantItem) {
                if (
                  item.defaultVariantItem
                    .variant_item_id ==
                  initialState.defaultVariantItem
                    .variant_item_id
                ) {
                  return item;
                }
              }
            } else if (item.item_id == id) {
              return item;
            }
          })?.qty
        : cart.find(function (item) {
            if (initialState.defaultVariantItem) {
              if (item.defaultVariantItem) {
                if (
                  item.defaultVariantItem
                    .variant_item_id ==
                  initialState.defaultVariantItem
                    .variant_item_id
                ) {
                  return item;
                }
              }
            } else if (item.item_id == id) {
              item.addons.find((addon) => {
                console.log(
                  "addddonc",
                  addon.qty,
                  addon,
                  addon.id,
                  uId
                );
                if (addon.id == uId) {
                  return addon.qty;
                }
              });
            }
          })} */}
            </span>
            <span
              onClick={() => incrAddQty(uId)}
              className={`py-2  px-5   text-xl cursor-pointer`}
              style={{
                backgroundColor: `${
                  storeSettings.data ? rgbaBackground : "black"
                }`,
                color: `${storeSettings.data ? rgbaColor : "white"}`,
                borderColor: `${
                  storeSettings.data
                    ? storeSettings.data.secondary_color
                    : "black"
                }`,
              }}
            >
              <PlusOutlined className="" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(IncreDecrButton);
