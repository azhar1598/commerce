import { Checkbox, Input, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { groupBy, qtySum } from "../../config/utility";
import crypto from "crypto";

export const AddonModalPdp = ({
  addonVisible,
  setAddonVisible,
  initialState,
  storeSettings,
  storeDetails,
  selectedVariant,
}) => {
  const [addonsAdded, setAddonsAdded] = useState([]);
  const [addonsFullInfo, setAddonsFullInfo] = useState({});
  const [priceWithAddon, setPriceWithAddon] = useState();

  //   Multiple Choices or CHECKLIST States
  const [checkListMandatory, setCheckListMandatory] = useState(false);

  const [givenCheckListQty, setGivenCheckListQty] = useState(0);

  const handleAddonOk = () => {};

  const handleAddonClose = () => {
    // setAddonVisible(false)
  };

  const handleAddonCancel = () => {
    setAddonVisible(false);
  };

  useEffect(() => {
    if (initialState?.defaultVariant)
      setPriceWithAddon(initialState.defaultVariantItem.sale_price);
    else setPriceWithAddon(initialState.data?.sale_price);
  }, [initialState.data, initialState.defaultVariant]);


//   Function to handle all the CHECKLIST Group
  const handleCheckList = (
    e,
    min_qty,
    max_qty,
    group_id,
    is_mandatory,
    value
  ) => {
    if (e.target.checked) {
      const sortedAddons = addonsAdded.sort((a, b) =>
        a.add_on_name > b.add_on_name ? 1 : -1
      );
      let priceWithChecklist = Number(priceWithAddon) + Number(value.price);
      setPriceWithAddon(priceWithChecklist);
      if (is_mandatory != "Y") {
        setCheckListMandatory(true);
        let groupByGroupType = groupBy(
          [...sortedAddons, e.target.value],
          "add_on_group_type"
        );

        let checkboxesLength = groupByGroupType["CHECKLIST"].length;
        setGivenCheckListQty(checkboxesLength);
      } else {
        setCheckListMandatory(false);
      }

      setAddonsAdded([...sortedAddons, e.target.value]);

      if (initialState?.variants?.length) {
        let itemData = {
          qty: 1,
          variantDetails: selectedVariant || [],
          addons: addonsAdded,
          id: crypto.randomBytes(16).toString("hex"),
        };

        itemData.addons.push(e.target.value);
        itemData.addons = itemData.addons.sort((a, b) =>
          a.add_on_name > b.add_on_name ? 1 : -1
        );

        setAddonsFullInfo(itemData);

        console.log("adddddons", addonsFullInfo, addonsAdded);
      }


    }
 else {
      const filterData = addonsAdded.filter((item, index) => {
        return item.add_on_option_id != e.target.value.add_on_option_id;
      });
      setAddonsAdded(filterData);

      if (is_mandatory != "Y") {
        setCheckListMandatory(true);
        let groupByGroupType = groupBy(
          filterData,
          "add_on_group_type"
        );
        let checkboxesLength = groupByGroupType["CHECKLIST"]?.length?groupByGroupType["CHECKLIST"]?.length:0;
        setGivenCheckListQty(checkboxesLength);
        }
      let priceWithChecklist = Number(priceWithAddon) - Number(value.price);
      setPriceWithAddon(priceWithChecklist);      
    }
  };

  const confirmAddonCombination = (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      visible={addonVisible}
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
      <div className="max-h-[80vh] overflow-scroll">
        {/* {!showCustomItemData ? ( */}

        <form
          onSubmit={(e) => {
            confirmAddonCombination(e);
          }}
          id="form"
          className="p-4 w-full flex item-center  flex-col"
        >
          <p
            className="font-montBold text-lg px-12 "
            style={{
              color: storeSettings.data
                ? storeSettings.data.secondary_color
                : "black",
            }}
          >
            {initialState.data ? initialState.data.item_name : ""}
          </p>
          <p className="font-montSemiBold text-[16px]  px-12 -mt-3">
            Customize Your Product
          </p>

          {initialState?.addons &&
            Object.keys(initialState?.addons).map((mapId, index) => {
              const item = initialState?.addons[mapId];

              return (
                <div className="px-12 py-2" key={index}>
                  <p className="text-black font-montMedium ">
                    {item.add_on_title}
                    {item.is_mandatory == "Y" ? (
                      <span className="font-montSemiBold text-red-600 px-2">
                        *
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                  <p className="text-slate-400 text-[12px] -mt-3 font-montMedium ">
                    {item.add_on_description}
                  </p>
                  {item.add_on_group_type == "CHECKLIST" ? (
                    item.add_on_options?.map((value, index) => {
                      return (
                        <div className=" w-1/2 flex" key={index}>
                          <fieldset>
                            <Checkbox
                              onChange={(e) => {
                                handleCheckList(
                                  e,
                                  item?.min_qty,
                                  item.max_qty,
                                  item.add_on_group_id,
                                  item._is_mandatory,
                                  value
                                );
                              }}
                              defaultChecked={false}
                              name={item.add_on_group_id}
                              // checked={addonsAdded?.some(item =>

                              //     item.add_on_option_id == value.add_on_option_id

                              // )
                              // }
                              value={{
                                ...value,
                                add_on_group_id: item.add_on_group_id,
                                add_on_title: item.add_on_title,
                                add_on_mapping_id: mapId,
                                add_on_group_type: item.add_on_group_type,
                              }}
                              style={{ color: "black" }}
                              required={
                                item?.is_mandatory == "N" ?
                                givenCheckListQty<item.min_qty? true : false:false
                              }
                            >
                              <div className="flex justify-between  w-[20vw]">
                                <p className="font-montRegular px-4">
                                  {" "}
                                  {value.add_on_name}
                                </p>
                                <p className="font-montMedium pr-2">
                                  {storeDetails?.currency_symbol} {value.price}
                                </p>
                              </div>
                            </Checkbox>
                          </fieldset>
                        </div>
                      );
                    })
                  ) : item.add_on_group_type == "LONG_TEXT" ? (
                    <TextArea
                      rows={4}
                      maxLength={item?.max_qty ? item?.max_qty : 100}
                      //   onChange={(e) => {
                      //     handleAddonInstructions(
                      //       e,
                      //       item.add_on_group_id,
                      //       item.add_on_title,
                      //       mapId,
                      //       item.add_on_group_type
                      //     );
                      //   }}
                      title={item.add_on_description}
                      required={item.is_mandatory == "Y" ? true : false}
                    />
                  ) : item.add_on_group_type == "SMALL_TEXT" ? (
                    <Input
                      type="text"
                      className=""
                      maxLength={item?.max_qty ? item?.max_qty : 100}
                      minLength={item?.min_qty ? item?.min_qty : ""}
                      //   onChange={(e) => {
                      //     handleAddonInstructions(
                      //       e,
                      //       item.add_on_group_id,
                      //       item.add_on_title,
                      //       mapId,
                      //       item.add_on_group_type
                      //     );
                      //   }}
                      title={item.add_on_description}
                      required={item.is_mandatory == "Y" ? true : false}
                    />
                  ) : (
                    ""
                  )}
                  {/* {item.mandatory ? <p className='text-red-600 font-montMedium py-2'>Addon {index + 1} is mandatory.Cannot add this product without it. Kindly choose to proceed</p> : ''} */}
                </div>
              );
            })}
          <div className="w-full flex justify-center">
            <button
              className="px-10 py-2 self-center "
              style={{
                color: `${
                  storeSettings.data ? storeSettings.data.navbar_color : "white"
                }`,
                backgroundColor: `${
                  storeSettings.data
                    ? storeSettings.data.secondary_color
                    : "black"
                }`,
              }}
              // onClick={
              //   // addonsAdded.length==0 || addonsAdded.filter(
              //   //   (item) => item.add_on_title != "Cooking Instructions"
              //   // )?.length < addonMinQty
              //   //   ? () => {
              //   //       toast.error(` ${addonMinQty?`Minimum Addon Quantity is ${addonMinQty}`:`Please Add Minimum Quantity`}`, {
              //   //         position: "bottom-right",
              //   //         autoClose: 1000,
              //   //         hideProgressBar: false,
              //   //         closeOnClick: true,
              //   //         pauseOnHover: true,
              //   //         draggable: true,
              //   //         progress: undefined,
              //   //       });
              //   //     }
              //   //   :

              // }
            >
              Confirm
              <span className="pl-12">
                {" "}
                {storeDetails?.currency_symbol}
                {priceWithAddon}
              </span>
            </button>
          </div>
        </form>

        {/* ) : ( */}

        {/* )} */}
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    initialState: state.itemDetailsReducer,
    storeDetails: state.storeDetailsReducer?.data,
    storeSettings: state.storeSettingsReducer,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddonModalPdp);
