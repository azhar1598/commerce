import { SyncOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { connect } from "react-redux";
import { isEmpty } from "@firebase/util";
import { useRouter } from "next/router";
import AddonModal from "./AddonModal";
import { addToCart, fetchAddons, fetchItemDetails } from "../../actions";

const groupBy = function (arr, key) {
  return arr.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);

    return rv;
  }, {});
};

const qtySum = function (items, prop) {
  return items.reduce(function (a, b) {
    return parseInt(a) + parseInt(b[prop]);
  }, 0);
};

const getValuesByKey = (arrayOfObjects, key) => {
  if (!Array.isArray(arrayOfObjects) || !key) return [];
  return arrayOfObjects.map((item) => item[key]);
};

export const CartAddons = ({
  item,
  fetchItemDetails,
  checkout,
  storeSettings,
  stateStoreDetails,
  cartUpdate,
  setCartUpdate,
  addToCart,
  rgbaBackground,
  cart,
  readyCartData,
}) => {
  const router = useRouter();

  const [showEditAddon, setShowEditAddon] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState({});
  const [addonSelected, setAddonSelected] = useState();
  const [addonCombination, setAddonCombination] = useState([]);
  const [addonsData, setAddonsData] = useState({});

  const handleIncreaseQuantity = (item) => {
    let selectedAddon;

    let selectedProduct = cart.cart.find((product) => {
      return (selectedAddon = product.addons.find((addon) => {
        if (addon.id == item.id) {
          addon.qty = addon.qty + 1;
          return true;
        }
      }));
      // addToCart();
      console.log("selectedAddonnnn", selectedAddon);
    });

    const quantity = qtySum(selectedProduct.addons, "qty");

    let data = selectedProduct;

    data.addons = selectedProduct?.addons || [];
    data.qty = quantity;

    addToCart(data);
    setCartUpdate(!cartUpdate);
  };

  const handleDecreaseQuantity = (item, qty) => {
    // const datas = readyCartData(cart?.cart);
    // item.defaultVariantItem ? item.defaultVariantItem : item.item_id

    let selectedAddon;
    let selectedProduct = cart.cart.find((product) => {
      return (selectedAddon = product.addons.find((addon) => {
        if (addon.id == item.id) {
          addon.qty = addon.qty - 1;
          return true;
        }
      }));
      // addToCart();
      console.log("selectedAddonnnn", selectedAddon);
    });
    const quantity = qtySum(selectedProduct.addons, "qty");

    console.log("quantityyyy", quantity);

    let data = selectedProduct;

    data.addons = selectedProduct?.addons || [];
    data.qty = quantity;

    addToCart(data);
    setCartUpdate(!cartUpdate);
  };

  const editAddonModal = (addon, cartItem) => {
    console.log("edittt", addon, cartItem);

    setShowEditAddon(true);
    setAddonsData(cartItem.addon_data);
    setSelectedCartItem(cartItem);
    setAddonSelected(addon);
    setAddonCombination(addon?.addons);

    // setAddonsAdded();
  };

  return (
    <>
      {item.addons.map((addon, index) => (
        <div
          className="flex items-start text-left w-full border-2 border-slate-300 mb-2 rounded lg:pl-8 px-3 pb-2 md:pl-8 lg: md:pt-3"
          key={index}
        >
          <div className="flex flex-col item-center">
            <img
              src={
                item?.primary_img
                  ? item?.primary_img
                  : "https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png"
              }
              className="w-72 min-w-72 max-w-72 h-36 border border-blue-100 shadow "
              onClick={() => {
                router.push(`/product/${item.item_id}`);
              }}
            />

            {checkout.backendCart?.purchase_id != undefined ||
            Object.keys(checkout).length == 0 ? (
              <div className="flex -mt-5  gap-4 ">
                <div
                  className="border border-gray-400 space-x-4 mb-2 w-32 mx-4 flex items-center rounded"
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
                    onClick={() => handleDecreaseQuantity(addon)}
                    className={`px-4   py-1 text-xl cursor-pointer`}
                    style={{
                      backgroundColor: `${
                        storeSettings.data ? rgbaBackground : "black"
                      }`,
                      color: `${
                        storeSettings.data
                          ? storeSettings.data.navbar_color
                          : "white"
                      }`,
                      borderColor: `${
                        storeSettings.data
                          ? storeSettings.data.secondary_color
                          : "black"
                      }`,
                    }}
                  >
                    -
                  </span>
                  <span
                    className="font-montSemiBold"
                    style={{
                      color: `${
                        !storeSettings.data
                          ? storeSettings.data.primary_color
                          : "black"
                      }`,
                    }}
                  >
                    {addon?.qty}
                  </span>

                  <span
                    onClick={() => {
                      handleIncreaseQuantity(addon);
                    }}
                    className={`px-4  text-xl cursor-pointer py-1`}
                    style={{
                      backgroundColor: `${
                        storeSettings.data ? rgbaBackground : "black"
                      }`,
                      color: `${
                        storeSettings.data
                          ? storeSettings.data.navbar_color
                          : "white"
                      }`,
                      borderColor: `${
                        storeSettings.data
                          ? storeSettings.data.secondary_color
                          : "black"
                      }`,
                    }}
                  >
                    +
                  </span>
                </div>
                {/* <div onClick={() => removeFromCart(item.defaultVariantItem ? item.defaultVariantItem.variant_item_id : item.item_id)} className='text-red-500 font-montMedium cursor-pointer'>Remove</div> */}
              </div>
            ) : (
              <div className=" w-full  flex items-center justify-center">
                <SyncOutlined style={{ fontSize: 24 }} spin />
              </div>
            )}
          </div>

          <div className="flex flex-col items-start w-full ml-3 lg:ml-24 md:ml-24">
            <div className="flex">
              <p
                className="text-lg font-montSemiBold "
                onClick={() => {
                  router.push(`/product/${item.item_id}`);
                }}
              >
                {item.item_name}
              </p>
              <p
                className="font-montMedium px-2 text-blue-500"
                onClick={() => {
                  editAddonModal(addon, item);
                }}
              >
                Edit
              </p>
            </div>

            {addon?.variantDetails ? (
              <p className="text-sm font-montSemiBold -mt-4">
                <span className="text-gray-500">
                  {addon?.variantDetails
                    ? `${addon.variantDetails?.variant_value_1?.variant_group_name}:`
                    : ""}
                </span>{" "}
                {addon?.variantDetails
                  ? addon.variantDetails?.variant_value_1?.variant_value_name
                  : ""}
                <span className="text-gray-500">
                  {addon?.variantDetails
                    ? `${
                        addon.variantDetails?.variant_value_2
                          ?.variant_group_name
                          ? `, ${addon.variantDetails?.variant_value_2?.variant_group_name}:`
                          : ""
                      }`
                    : ""}
                </span>{" "}
                {addon?.variantDetails
                  ? addon.variantDetails?.variant_value_2?.variant_value_name
                  : ""}
                <span className="text-black-500">
                  {addon?.variantDetails
                    ? `${
                        addon?.variantDetails.variant_value_3
                          ?.variant_group_name
                          ? `, ${addon.variantDetails?.variant_value_3?.variant_group_name}:`
                          : ""
                      }`
                    : ""}
                </span>{" "}
                {addon?.variantDetails
                  ? addon.variantDetails?.variant_value_3?.variant_value_name
                  : ""}
              </p>
            ) : (
              ""
            )}

            {(() => {
              const newVar = groupBy(addon?.addons || [], "add_on_title");
              console.log("grooooo", newVar);

              return Object.keys(newVar).map((item, index) => {
                const addons = newVar[item];

                console.log;

                if (
                  item == "Cooking Instructions" &&
                  isEmpty(addons[0]["text"])
                ) {
                  return "";
                } else
                  return (
                    <div className="">
                      <div className="flex ">
                       
                        <div className=" flex flex-wrap  lg:w-[32vw]">
                        <p className="font-montSemiBold text-slate-400 px-1 -mt-3 whitespace-nowrap">
                          {item}:
                        </p>
                          {addons.map((value, num) => {
                            console.log("adddddons", addons);
                            return (
                              <>
                                <p className="font-montMedium whitespace-nowrap   px-1 -mt-3 text-black">
                                  {value.add_on_name
                                    ? value.add_on_name
                                    : value.text}
                                  ,
                                </p>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                // })
              });
            })()}

            <p className="text-[#212B3680] hidden">{item.item_desc}</p>
            <p className="text-lg font-montSemiBold flex items-start -mt-3">
              {stateStoreDetails?.currency_symbol}{" "}
              {item.defaultVariantItem
                ? item.defaultVariantItem.sale_price
                : item.sale_price}
              <span className="line-through px-1 text-sm hidden lg:flex mt-1 ml-2">
                {item.price - item.sale_price != 0
                  ? `${stateStoreDetails?.currency_symbol} ${item.price}`
                  : ""}
              </span>
              <span className="text-green-500 text-sm hidden lg:flex mt-1 ml-2">
                {item.price - item.sale_price != 0
                  ? `Save ${stateStoreDetails?.currency_symbol}${
                      item.defaultVariantItem
                        ? item.defaultVariantItem.list_price -
                          item.defaultVariantItem.sale_price
                        : item.price - item.sale_price
                    }`
                  : ""}
              </span>
            </p>
          </div>
          {console.log("item...id", item)}

          {/* <CloseOutlined
          className="p-4"
          onClick={() =>
            removeFromCart(
              {
                addonId: item?.id || null,
                variantId:
                  item?.defaultVariantItem?.variant_item_id ||
                  null,
                itemId: item.item_id,
              }
              // item.defaultVariantItem
              // ? item.defaultVariantItem.variant_item_id
              // : item.item_id
            )
          }
        /> */}
        </div>
      ))}

      {/*Addon Modal  */}

      <AddonModal
        setAddonCombination={setAddonCombination}
        addonCombination={addonCombination}
        addonSelected={addonSelected}
        setAddonSelected={setAddonSelected}
        selectedCartItem={selectedCartItem}
        setSelectedCartItem={setSelectedCartItem}
        showEditAddon={showEditAddon}
        setShowEditAddon={setShowEditAddon}
        addonsData={addonsData}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cartReducer,
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchItemDetails: (customerId, itemId) =>
      dispatch(fetchItemDetails(customerId, itemId)),
    fetchAddons: (payload) => dispatch(fetchAddons(payload)),
    addToCart: (data) => dispatch(addToCart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartAddons);
