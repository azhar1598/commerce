import { Checkbox, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../actions";

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

export const AddonModal = ({
  setAddonCombination,
  addonCombination,
  addonSelected,
  setAddonSelected,
  selectedCartItem,
  setSelectedCartItem,
  addToCart,
  setShowEditAddon,
  showEditAddon,
  storeSettings,
  stateStoreDetails,
  addonsData,
}) => {
  const handleAddonCancel = () => {
    setShowEditAddon(false);
  };

  const handleAddonClose = () => {};

  const handleAddonOk = () => {};

  const handleAddonChange = (e) => {
    let selectedaddon;

    if (e.target.checked) {
      setAddonCombination([...addonCombination, e.target.value]);
      selectedaddon = [...addonCombination, e.target.value];
    } else {
      setAddonCombination(
        addonCombination.filter(
          (item) => item.add_on_option_id !== e.target?.value?.add_on_option_id
        )
      );
      selectedaddon = [
        ...addonCombination.filter(
          (item) => item.add_on_option_id !== e.target?.value?.add_on_option_id
        ),
      ];
    }
    setAddonSelected({ ...addonSelected, addons: selectedaddon });
  };

  const handleAddonInstructions = (
    e,
    add_on_group_id,
    add_on_title,
    addonSelected,
    mapId
  ) => {
    let instructions = {
      add_on_group_id,
      add_on_title,
      mapId,
      text: e.target.value,
    };
    setAddonCombination([...addonCombination, e.target.value]);

    let isCookingInstr = addonCombination.find(
      (item) => item.add_on_title === "Cooking Instructions"
    );

    if (!isCookingInstr) {
      // setAddonSelected({...addonSelected,{...instructions} )
      setAddonCombination([...addonCombination, instructions]);
      // setAddonSelected({...addonSelected,addons: [addonText] })
    } else {
      let addonText = addonCombination.map((item) => {
        return item?.add_on_title === add_on_title ? instructions : item;
      });

      setAddonCombination(addonText);
      setAddonSelected({ ...addonSelected, addons: addonText });
    }

    // let selectedProduct = cart.find((product) => {
    //   findSelectedAddon = product.addons.find((addon) => {
    //     console.log("addddon", addonSelected, addon);
    //     if (addonSelected.id == addon.id) {
    //       addonText =
    //         addonSelected &&
    //         addonSelected?.addons?.find((element) => {

    //           if (element?.add_on_group_id == add_on_group_id) {
    //             return true
    //           } else {
    //             return false;
    //           }
    //         });
    //         console.log('addonText',addonText)
    //         addonText.text=e.target.value
    //     }
    //   });
    // });
    // setAddonCombination(addonCombination.filter(item => item.add_on_option_id === e.target?.value?.add_on_option_id))

    // console.log("jelll", e.target.name, e.target.value);
  };

  const confirmUpdateCart = () => {
    // let selectedItem = {...addonSelected,addons: selectedaddon };
    // let item = {...selectedCartItem, addons: [addonSelected]}

    let item = {
      ...selectedCartItem,
      addons: selectedCartItem.addons.map((item) =>
        item.id === addonSelected.id ? addonSelected : item
      ),
    };

    // let  addonCombinationGroupby
    // let groupByaddonsWithQty = groupBy(addonsWithQty.addons, "add_on_title");
    //

    //   let duplicate = item.addons.find((item) => {
    //     addonCombinationGroupby = groupBy(item.addons, "add_on_title");
    //     return (
    //       JSON.stringify(addonCombinationGroupby) ===
    //       JSON.stringify(groupByaddonsWithQty)
    //     );
    //   });

    //   console.log('selecyed',duplicate,selectedCartItem.addons)

    setSelectedCartItem(item);
    let editData = [];
    let addonValues = [];
    let finalEditData = [];

    item.addons?.map((addon, index) => {
      console.log("itemmmmmmmmmmmmaddonnn", addon);

      let checkkk = groupBy(addon.addons, "add_on_group_id");
      let values = [];
      // checkkk.map((item,index)=>{
      //   if(item.add_on_option_id){
      //   values.push(item.add_on_option_id)
      //   }
      // })

      // let tekk=getValuesByKey(addon.addons,"")

      let chek = {};

      console.log("chekkkkk", values, checkkk, Object.values(checkkk));

      addon.addons.map((element) => {
        console.log(
          "Object.keys(editData).length>0",
          Object.keys(editData).length > 0
        );

        if (editData.length > 0) {
          editData?.map((ed, index) => {
            console.log(
              "itemmmmmmmmgroup_id.add_on_group_id==element.add_on_group_id)",
              ed.add_on_group_id,
              element.add_on_group_id,
              ed.add_on_group_id == element.add_on_group_id
            );

            if (ed.add_on_group_id == element.add_on_group_id) {
              ;
              addonValues.push(
                element.add_on_option_id
                  ? element.add_on_option_id
                  : element.text
              );
            } else {
              ;

              console.log("itemmmmmmmfinalDatasa", finalEditData);
              let data=   {
                add_on_mapping_id: element.mapId,                
  
                add_on_group_id: element.add_on_group_id,
                add_on_values: [element.text]
              }

              finalEditData.push(data);
            }
          });

          console.log(
            "itemmmmmmmmelement.add_on_option_idddd",
            element.add_on_option_id
          );

          // Object.keys(editData['add_on_details']).

          console.log("itemmmmmmeditDataaa");
        } else {
          ;

          addonValues = [element.add_on_option_id];

          editData = [
            {
              add_on_mapping_id: element.add_on_mapping_id,

              add_on_group_id: element.add_on_group_id,
              add_on_values: addonValues,
            },
          ];

          finalEditData.push(editData[0]);
        }
      });
    });

    // ;

    console.log("itemmmmmconfirm", finalEditData, item, editData);

    addToCart(item);

    setShowEditAddon(false);
  };

  return (
    <Modal
      visible={showEditAddon}
      onOk={handleAddonOk}
      afterClose={handleAddonClose}
      destroyOnClose={true}
      onCancel={handleAddonCancel}
      footer={null}
      okButtonProps={{ disabled: true }}
      cancelButtonProps={{ disabled: true }}
      width={800}
      style={{ height: "100px" }}
    >
      <div className="p-4 w-full flex item-center  flex-col">
        <p
          className="font-montBold text-lg self-center py-4"
          style={{
            color: storeSettings.data
              ? storeSettings.data.secondary_color
              : "black",
          }}
        >
          You can customize this item !!
        </p>

        {Object.keys(addonsData).map((mapId, index) => {
          const item = addonsData[mapId];
          // console.log("itemmmmmmmmm", item, addonsData);

          return (
            <div className="px-12 py-2">
              <p className="text-black font-montMedium ">
                {item.add_on_title}
                {item.mandatory ? (
                  <span className="font-montSemiBold text-red-600 px-2">*</span>
                ) : (
                  ""
                )}
              </p>
              <p className="text-gray text-sm font-montMedium ">
                {item.add_on_group_type == "CHECKLIST"
                  ? item.add_on_description
                  : ""}
              </p>
              {item.add_on_group_type == "CHECKLIST" ? (
                item.add_on_options?.map((value, index) => {
                  return (
                    <div className=" w-1/2 flex">
                      <div className="flex ">
                        <Checkbox
                          onChange={(e) => {
                            handleAddonChange(e);
                          }}
                          defaultChecked={false}
                          name={item.add_on_group_id}
                          checked={
                            addonSelected &&
                            addonSelected?.addons?.find((product) => {
                              if (
                                product?.add_on_option_id ==
                                value.add_on_option_id
                              ) {
                                return true;
                              } else {
                                return false;
                              }
                            })
                          }
                          // checked={addonsAdded?.some(item =>

                          //     item.add_on_option_id == value.add_on_option_id

                          // )
                          // }
                          value={{
                            ...value,
                            add_on_group_id: item.add_on_group_id,
                            add_on_title: item.add_on_title,
                            add_on_mapping_id: mapId,
                          }}
                          style={{ color: "black" }}
                        >
                          <div className="flex justify-between  w-[20vw]">
                            <p className="font-montRegular px-4">
                              {" "}
                              {value.add_on_name}
                            </p>
                            <p className="font-montMedium pr-2">
                              {stateStoreDetails?.currency_symbol} {value.price}
                            </p>
                          </div>
                        </Checkbox>
                      </div>
                    </div>
                  );
                })
              ) : (
                <TextArea
                  rows={4}
                  placeholder={item.add_on_description}
                  maxLength={200}
                  name="addon_instructions"
                  value={
                    addonSelected &&
                    addonSelected?.addons?.find((product) => {
                      if (product?.add_on_group_id == item.add_on_group_id) {
                        return true;
                      } else {
                        return false;
                      }
                    })?.text
                  }
                  onChange={(e) => {
                    handleAddonInstructions(
                      e,
                      item.add_on_group_id,
                      item.add_on_title,
                      addonSelected,

                      mapId
                    );
                  }}
                />
              )}
              {/* {item.mandatory ? <p className='text-red-600 font-montMedium py-2'>Addon {index + 1} is mandatory.Cannot add this product without it. Kindly choose to proceed</p> : ''} */}
            </div>
          );
        })}
        <button
          className="px-10 py-2 self-center "
          style={{
            color: `${
              storeSettings.data ? storeSettings.data.navbar_color : "white"
            }`,
            backgroundColor: `${
              storeSettings.data ? storeSettings.data.secondary_color : "black"
            }`,
          }}
          onClick={confirmUpdateCart}
          //   onClick={
          //     addonsAdded.filter(
          //       (item) => item.add_on_title === "Toppings on the Pizza"
          //     )?.length < 2
          //       ? () => {
          //           message.error("addons should be more than 1");
          //         }
          //       : handleConfirmAddons
          //   }
        >
          Confirm
          <span className="pl-12"> {stateStoreDetails?.currency_symbol}</span>
        </button>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  storeSettings: state.storeSettingsReducer,
  cart: state.cartReducer.cart,
  checkout: state.checkoutReducer,
  customerDetails: state.customerDetailsReducer,
  stateStoreDetails: state.storeDetailsReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (data) => dispatch(addToCart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddonModal);
