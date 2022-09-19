import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { connect } from "react-redux";
import {
  fetchItemDetails,
  fetchVariants,
  fetchSpecification,
  fetchAdditionalInfo,
  fetchRelatedItems,
  addToCart,
  adjustQty,
  removeFromCart,
  getStoreDetails,
  getStoreId,
  setVariantImages,
  setDefaultItem,
  getWishlistItems,
  searchItems,
  addAddon,
  decreaseAddon,
  addBulkCart,
  fetchAddons,
} from "../../actions";
import {
  Image,
  message,
  Rate,
  Spin,
  Tooltip,
  Space,
  Carousel,
  Modal,
  Checkbox,
  Input,
  Row,
  Col,
} from "antd";
import Link from "next/link";
import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";
// import ReactImageMagnify from 'react-image-magnify';
import {
  HeartOutlined,
  ArrowLeftOutlined,
  HeartFilled,
  Loading3QuartersOutlined,
  LoadingOutlined,
  SyncOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import {
  addToWishlist,
  deleteFromWishlist,
  getVariantByItemId,
} from "../../services/apiServices";
import Magnify from "../../components/Magnify";
import LoginModal from "../../components/LoginModal/LoginModal";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import crypto from "crypto";
import IncreDecrButton from "../../components/IncreDecrButton";
import Item from "antd/lib/list/Item";
import AddonsLists from "../../components/addonsLists";
import { select } from "redux-saga/effects";

const groupBy = function (arr, key) {
  return arr.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);

    return rv;
  }, {});
};

const Index = ({
  removeFromCart,
  initialState,
  fetchItemDetails,
  fetchVariants,
  fetchAddons,
  fetchSpecification,
  fetchAdditionalInfo,
  fetchRelatedItems,
  addToCart,
  addBulkItemToCart,
  cart,
  adjustQty,
  storeSettings,
  getStoreId,
  getStoreDetails,
  storeDetails,
  setVariantImages,
  setDefaultItem,
  stateCustomerDetails,
  stateWishlistItems,
  dispatchWishlist,
  dispatchSearchItems,
  dispatchAddAddon,
  dispatchDecreaseAddon,
}) => {
  const { TextArea } = Input;
  const router = useRouter();
  const { id } = router.query;

  const [loadingWishlist, setLoadingWishlist] = useState(false);
  // const [page, setPage] = useState(2)
  const [minQtyMsg, setMinQtyMsg] = useState(false);

  const ref = useRef(null);

  // Product Addons
  const [customization, setCustomization] = useState();
  const [addonVisible, setAddonVisible] = useState();
  const [addonsAdded, setAddonsAdded] = useState([]);
  const[changeVariantAddon,setChangeVariantAddon]=useState()
  
  const [priceWithAddon, setPriceWithAddon] = useState(
    initialState.defaultVariantItem
      ? initialState.defaultVariantItem.sale_price
      : initialState.data
      ? initialState.data.sale_price
      : ""
  );

  console.log(
    "initialState?.data?.is_add_on_available=='Y'",
    customization,
    initialState?.data,
    initialState?.data?.is_add_on_available == "Y"
  );

  useEffect(() => {
    if (id) {
      if (initialState?.data?.is_add_on_available == "Y") {
        setCustomization(true);

       
          const payload = {
            itemId: id,
            variantValueId: initialState?.defaultVariantItem?selectedVariantValue?selectedVariantValue:selectedVariant.variant_value_1?.variant_value_id:null,
          };
          
          fetchAddons(payload)
       
      } else {
        setCustomization(false);
      }
    }
  }, [initialState?.data?.is_add_on_available, id]);

  useEffect(()=>{
 
    if (initialState?.data?.is_add_on_available == "Y") {
        setCustomization(true);

       console.log('hello wordl')
          const payload = {
            itemId: id,
            variantValueId: initialState?.defaultVariantItem?selectedVariantValue?selectedVariantValue:selectedVariant.variant_value_1?.variant_value_id:null,
          };
          
          fetchAddons(payload)
        }

  },[selectedVariantValue,selectedVariant,changeVariantAddon])

  const [addonQuantity, setAddonQuantity] = useState();
  const [customItemData, setCustomItemData] = useState();

  const [showCustomItemData, setShowCustomItemData] = useState();

  const [groupByTitle, setGroupByTitle] = useState({});
  const [addonCombination, setAddonCombination] = useState([]);
  const [addonsWithQty, setAddonsWithQty] = useState([]);
  const [confrmAddonCombination, setconfrmAddonCombination] = useState([]);

  // variats

  const [selectedVariant, setselectedVariant] = useState({});

  const[selectedVariantValue,setSelectedVariantValue]=useState()

  // cart addons count

  // const [addons, setAddons] = useState(
  //     [{

  //         id: 0,
  //         name: 'Toppings',
  //         description: '',
  //         min: 1,
  //         mandatory: false,
  //         values: [
  //             {
  //                 id: 0,
  //                 price: 40,
  //                 name: 'Cheese',
  //                 important: false,
  //                 category: 'Toppings'
  //             },
  //             {
  //                 id: 1,
  //                 price: 25,
  //                 name: 'Corn',
  //                 important: false,
  //                 category: 'Toppings'
  //             },
  //             {
  //                 id: 2,
  //                 price: 15,
  //                 name: 'Onion',
  //                 important: false,
  //                 category: 'Toppings'
  //             }
  //         ]
  //     },
  //     {
  //         id: 1,
  //         name: 'Toppings 2',
  //         description: '',
  //         min: 1,
  //         mandatory: true,
  //         values: [
  //             {
  //                 id: 10,
  //                 price: 40,
  //                 name: 'Cheese',
  //                 important: true,
  //                 category: 'Toppings2'
  //             },
  //             {
  //                 id: 11,
  //                 price: 25,
  //                 name: 'Corn',
  //                 important: false,
  //                 category: 'Toppings2'
  //             },
  //             {
  //                 id: 12,
  //                 price: 15,
  //                 name: 'Onion',
  //                 important: false,
  //                 important: false,
  //                 category: 'Toppings2'
  //             }
  //         ]
  //     },]
  // )

  const [addons1, setAddons1] = useState({
    "3ebb31825aea7b4fb8c9f8065eb4bbda": {
      item_id: 12345,
      add_on_title: "Toppings on the Pizza",
      add_on_description: "Select min of 2 and max of 5",
      variant_group_id: 3340,
      variant_value_id: 7064,
      status: "ACTIVE",
      entry_id: 35,
      add_on_group_id: 12,
      add_on_group_type: "CHECKLIST",
      is_mandatory: "Y",
      min_qty: 2,
      max_qty: 5,
      price: null,
      add_on_options: [
        {
          add_on_option_id: 24,
          add_on_name: "Onion",
          price: "30.00",
          option_status: "AVAILABLE",
        },
        {
          add_on_option_id: 25,
          add_on_name: "Jalapeno",
          price: "60.00",
          option_status: "AVAILABLE",
        },
        {
          add_on_option_id: 26,
          add_on_name: "Olives",
          price: "60.00",
          option_status: "AVAILABLE",
        },
      ],
    },

    "6445a0d6cd01e8b7086c5b0f34409dd9": {
      item_id: 12345,
      add_on_title: "Cooking Instructions",
      add_on_description: "Min of 10 characters to 200 characters",
      variant_group_id: null,
      variant_value_id: null,
      status: "ACTIVE",
      entry_id: 38,
      add_on_group_id: 11,
      add_on_group_type: "SHORT_TEXT",
      is_mandatory: "Y",
      min_qty: 0,
      max_qty: 100,
      price: 1.0,
    },
  });


  

  const [separateAddons, setSeparateAddons] = useState();

  const [active, setActive] = useState(0);
  const [highlightDefault, setHighLightDefault] = useState([]);
  const [selectedVariantStyle, setSelectedVariantStyle] = useState([]);
  const [keepVariants, setKeepVariants] = useState([]);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const [loadingVariants, setLoadingVariants] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [heartIcon, setHeartIcon] = useState(initialState?.data?.wishlist);
  const [visible, setVisible] = useState(false);
  const [wishlistId, setWishlistId] = useState();

  const [rgbaBackground, setRgbaBackground] = useState("");

  const [rgbaColor, setRgbaColor] = useState();

  const qtySum = function (items, prop) {
    return items.reduce(function (a, b) {
      return parseInt(a) + parseInt(b[prop]);
    }, 0);
  };

  useEffect(() => {
    console.log("sumQtiqua", addonQuantity);

    // customItemData?.addons && Object.keys(customItemData?.addons).map((cb, num) => {
    //     console.log('sumcbbb', cb, customItemData?.addons[cb])
    //     if (cb == 'qty') {
    //         const item = customItemData?.addons[cb]
    //         sum = sum + item
    //         console.log('sum',sum)
    //     }
    // })
    // if(customItemData?.addons && addonCombination){
    //        const sum= qtySum(addonCombination,'qty')
    //        setAddonQuantity(sum)
    //        console.log('customItemDataSum',customItemData,sum)
    // }
  }, [addonQuantity]);


  useEffect(()=>{
    console.log('customItemData?.addons?.length==0 ',customItemData?.addons?.length )    
    if(customItemData?.addons?.length==0  || customItemData?.addons?.length==undefined){

console.log('customItemData?.addons?.length==0 ',customItemData?.addons?.length==0 )

        setShowCustomItemData(false)
    }
  },[changeVariantAddon,customItemData])

  useEffect(() => {
    setRgbaBackground(
      hex2rgba(
        storeSettings.data ? storeSettings.data.secondary_color : "#ffffff",
        0.2
      )
    );
    setRgbaColor(
      hex2rgba(
        storeSettings.data ? storeSettings.data.navbar_color : "#000000",
        1
      )
    );
    dispatchSearchItems("");
  }, [rgbaBackground == ""]);

  const hex2rgba = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  };

  // 75:5  Error: React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render This is because you made it like this     const [wishlistId, setWishlistId] = useState(initialState?.data?.wishlist), rather this is the solution const [wishlistId, setWishlistId] = useState()

  useEffect(() => {
    const condition = () => {
      if (id) {
        fetchItemDetails(stateCustomerDetails?.data?.customer_id, id);
        fetchVariants(id);
        fetchSpecification(id);
        fetchAdditionalInfo(id);
        fetchRelatedItems(id);
        getStoreDetails(router.query.storeId);
      }
    };
    condition();
  }, [id]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  // useEffect(() => {

  // }, [initialState?.defaultVariantItem, initialState.data])

  useEffect(() => {
    const selectedItem = cart?.find(function (item) {
      console.log(
        "selected cart item",
        item,
        initialState.defaultVariantItem?.variant_item_id,
        item.defaultVariantItem?.variant_item_id,
        item.defaultVariantItem != null &&
          item.defaultVariantItem?.variant_item_id ==
            initialState.defaultVariantItem?.variant_item_id,
        item.item_id == initialState.data?.item_id
      );
      if (initialState.defaultVariantItem) {
        if (
          item.defaultVariantItem != null &&
          item.defaultVariantItem.variant_item_id ==
            initialState?.defaultVariantItem?.variant_item_id
        ) {
          console.log("selected te def", item);
          return item;
        }
      } else if (item.item_id == initialState.data?.item_id) {
        console.log("selected te", item);
        return item;
      }
    });

    if (
      selectedItem?.qty <
        initialState.data?.inventoryDetails?.min_order_quantity ||
      selectedItem?.qty <
        initialState.defaultVariantItem?.inventoryDetails?.min_order_quantity
    ) {
      console.log("initialState.data", initialState.data);
      setMinQtyMsg(true);
      !isDesktopOrLaptop &&
        // message.error(`Minimum Quantity is ${initialState.defaultVariantItem ? item.defaultVariantItem?.inventory_details?.min_order_quantity>item.defaultVariantItem?.inventory_details?.inventory_quantity?item.defaultVariantItem?.inventory_details?.inventory_quantity:item.defaultVariantItem?.inventory_details?.min_order_quantity : initialState.data?.inventoryDetails?.min_order_quantity> initialState.data?.inventoryDetails?.inventory_quantity? initialState.data?.inventoryDetails?.inventory_quantity:initialState.data?.inventoryDetails?.min_order_quantity}`)
        //

        toast.error(
          `Minimum Quantity is ${
            initialState.defaultVariantItem
              ? item.defaultVariantItem?.inventory_details?.min_order_quantity >
                item.defaultVariantItem?.inventory_details?.inventory_quantity
                ? item.defaultVariantItem?.inventory_details?.inventory_quantity
                : item.defaultVariantItem?.inventory_details?.min_order_quantity
              : initialState.data?.inventoryDetails?.min_order_quantity >
                initialState.data?.inventoryDetails?.inventory_quantity
              ? initialState.data?.inventoryDetails?.inventory_quantity
              : initialState.data?.inventoryDetails?.min_order_quantity
          }`,
          {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
    } else {
      setMinQtyMsg(false);
    }
  }, [initialState?.defaultVariantItem, initialState.data, cart]);

  useEffect(() => {
    if (initialState?.defaultVariantItem) {
      const defaultVar = Object.keys(initialState.defaultVariantItem)
        .map((key) => {
          if (key.includes("variant_value")) {
            return initialState.defaultVariantItem[key];
          }
        })
        .filter(Boolean);

      const selectedDefaultVariant = defaultVar.map((e) => e.variant_value_id);


console.log('selectedDefaultVarianttt',selectedDefaultVariant)

      // const selectedVariants = defaultVar.map(
      //   ({ variant_value_id, variant_value_name }) => {
      //     return {
      //       variant_value_id,
      //       variant_value_name,
      //     };
      //   }
      // );
      setselectedVariant(initialState?.defaultVariantItem);

      setSelectedVariantStyle(selectedDefaultVariant);
    }
  }, [initialState?.defaultVariantItem, initialState.data]);

  useEffect(() => {
    if (initialState?.data?.wishlistId) {
      setWishlistId(initialState?.data?.wishlistId);
    }
  }, [initialState?.data?.wishlistId == undefined]);

  // ========================================= ON CART UPDATE ASSIGN ADDONS TO ADDONCOMBINATION ================================ //

  //   useEffect(() => {
  //     console.log("naviiiis", cart);
  //     const selectedItem = cart?.find((item) => {
  //         console.log("naviiii", item,cart);
  //         if (item.item_id == initialState.data?.item_id) {
  //             if (initialState?.defaultVariantItem) {
  //                 if (
  //                     item.defaultVariantItem.variant_item_id ==
  //                     initialState?.defaultVariantItem?.variant_item_id
  //                 ) {

  //                     return true;
  //                 } else {
  //                     return false;
  //                 }

  //             } else {
  //                 console.log("selected te", item, selectedItem);
  //                 //   setAddonCombination(selectedItem?.addons || []);
  //                 return true;
  //             }
  //         } else {
  //             return false;
  //         }
  //     });

  //     console.log("selectedItem,,,,", selectedItem);
  //     setAddonCombination(selectedItem?.addons || []);
  //     setCustomItemData({ ...customItemData, addons: selectedItem?.addons });

  //     console.log("selected Item", initialState, selectedItem, cart);
  // }, [initialState,cart])

  // ========================================= ON FIRST TIME ASSIGN ADDONS TO ADDONCOMBINATION ================================ //
  //   useEffect(() => {
  //     const selectedItem = cart?.find((item) => {
  //       if (
  //         item.defaultVariantItem != null &&
  //         item.defaultVariantItem.variant_item_id ==
  //         initialState?.defaultVariantItem?.variant_item_id
  //       ) {
  //         console.log("selected te def", item);
  //         return item;
  //       } else if (item.item_id == initialState.data?.item_id) {
  //         console.log("selected te", item);
  //         setAddonCombination(selectedItem?.addons || []);

  //         return item;
  //       }
  //     });

  //     setAddonCombination(selectedItem?.addons || []);
  //     setCustomItemData({ ...customItemData, addons: selectedItem?.addons });

  //     console.log("selected Item", initialState, selectedItem, cart);
  //   }, []);

  const colorVariants = [
    "COLOUR",
    "COLOURS",
    "COLOR",
    "COLORS",
    "SHADE",
    "SHADES",
    "Colr",
    "Color",
    "color",
  ];

  // wishlist not in use states

  const showModal = () => {
    setVisible(true);
  };

  const getUpdatedAddonsFromCart = () => {
    const selectedItem = cart?.find((item) => {
      if (initialState.variants.length > 0) {
        if (
          item.defaultVariantItem != null &&
          item.defaultVariantItem.variant_item_id ==
            selectedVariant.variant_item_id
        ) {
          console.log("has variant", item);

          return item;
        }
      } else if (item.item_id == initialState.data?.item_id) {
        console.log("doesn't have variant", item);
        setAddonCombination(selectedItem?.addons || []);
        return item;
      }
    });

    return selectedItem?.addons;
  };

  const handleDecreaseQuantity = (itemid, qty) => {
    if (qty == 0) {
      removeFromCart(Number(itemid));
    } else {
      adjustQty(itemid, qty);
    }
    console.log(
      itemid,
      qty,
      " decrease >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
  };

  const itemAddToCart = (item) => {
    console.log(
      "cutitem >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
      item
    );
    // setAddonVisible(false)

    let quantity = 0;

    if (initialState.defaultVariantItem) {
      item["defaultVariantItem"] = initialState.defaultVariantItem;

      const value = item?.defaultVariantItem?.inventory_details;

      if (value?.inventory_quantity == null) {
        if (value?.max_order_quantity == null) quantity = 15;
        else {
          quantity = value.max_order_quantity;
        }
        // if(maxmin)
      } else if (
        value?.inventory_quantity != null &&
        value?.max_order_quantity == null
      ) {
        quantity = value?.inventory_quantity;
        console.log(
          "value?.inventory_quantity != null && value?.max_order_quantity == null"
        );
      } else if (value?.max_order_quantity > value?.inventory_quantity) {
        quantity = value?.inventory_quantity;
        console.log("value?.max_order_quantity > value?.inventory_quantity");
      } else if (value?.max_order_quantity < value?.inventory_quantity && value?.max_order_quantity!=null) {
        quantity = value.max_order_quantity;
        console.log("value?.max_order_quantity < value?.inventory_quantity");
      }
      

      if (quantity > 0) {
        addToCart(item);
        setShowCustomItemData(true);
      } else {
        // message.error('Sorry, You Cannot add more items')

        toast.error("Sorry, You Cannot add more items", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      // item['store_name'] = storeDetails.data ? storeDetails.data.store_name : "";
      // item['store_logo'] = storeDetails.data ? storeDetails.data.logo_img_url : "";
    } else {
      console.log("itemsms", item);
      if (item.inventoryDetails == null) {
        // addToCart(item)
        quantity = 15;
        // if(maxmin)
      } else if (item.inventoryDetails.inventory_quantity == 0) {
        // message.error('Sorry,The Item is not available at the moment')
        quantity = 0;
        console.log(
          "item.inventoryDetails.inventory_quantity == 0",
          item.inventoryDetails.inventory_quantity == 0
        );
      } else if (item.inventoryDetails.inventory_quantity != 0) {
        console.log(
          "item.inventoryDetails.inventory_quantity != 0",
          item.inventoryDetails.inventory_quantity != 0
        );

        if (
          item.inventoryDetails.inventory_quantity >
          item.inventoryDetails?.max_order_quantity && item.inventoryDetails?.max_order_quantity!=null 
        ) {
          quantity = item.inventoryDetails?.max_order_quantity;
          console.log(
            "item.inventoryDetails.inventory_quantity > item.inventoryDetails?.max_order_quantity",
            item.inventoryDetails.inventory_quantity >
              item.inventoryDetails?.max_order_quantity
          );

        }
      
        // else {
        //     if (item.inventoryDetails.inventory_quantity < item.inventoryDetails.min_order_quantity) {
        //         // message.error('Sorry,The Item is not available at the moment')
        //         // quantity = 0
        //     }
        else {
          quantity = item.inventoryDetails?.inventory_quantity;
        }
        // }
      }
      if (quantity > 0) {
        addToCart(item);
        setShowCustomItemData(true);
      } else {
        // message.error('Sorry, sYou Cannot add more items')

        toast.error("Sorry, You Cannot add more items", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      // item['store_name'] = storeDetails.data ? storeDetails.data.store_name : "";
      // item['store_logo'] = storeDetails.data ? storeDetails.data.logo_img_url : "";
    }
  };

  const oldIncrementFunction = () => {
    !customItemData.addons
      ? adjustQty(
          initialState.defaultVariantItem
            ? initialState.defaultVariantItem.variant_item_id
            : id,
          cart.find(function (item) {
            if (initialState.defaultVariantItem) {
              if (item.defaultVariantItem) {
                if (
                  item.defaultVariantItem.variant_item_id ==
                  initialState.defaultVariantItem.variant_item_id
                ) {
                  let quantity = 0;
                  const value = item?.defaultVariantItem?.inventory_details;

                  if (value?.inventory_quantity == null) {
                    if (value?.max_order_quantity == null) quantity = 15;
                    else {
                      quantity = value.max_order_quantity;
                    }
                    // if(maxmin)
                  } else if (
                    value?.inventory_quantity != null &&
                    value?.max_order_quantity == null
                  ) {
                    quantity = value?.inventory_quantity;
                    console.log(
                      "value?.inventory_quantity != null && value?.max_order_quantity == null"
                    );
                  } else if (
                    value?.max_order_quantity > value?.inventory_quantity
                  ) {
                    quantity = value?.inventory_quantity;
                    console.log(
                      "value?.max_order_quantity > value?.inventory_quantity"
                    );
                  } else if (
                    value?.max_order_quantity < value?.inventory_quantity
                  ) {
                    quantity = value.max_order_quantity;
                    console.log(
                      "value?.max_order_quantity < value?.inventory_quantity"
                    );
                  }

                  if (quantity > 0) {
                    const filter = cart.filter((c) => {
                      if (
                        c.defaultVariantItem?.variant_item_id ==
                        item.defaultVariantItem.variant_item_id
                      ) {
                        return c;
                      }
                    });

                    // if (filter[0].qty >= quantity) {
                    //     message.error(`Sorry, You Cannot add more than ${quantity} items`)
                    //     item.qty = item.qty - 1
                    //     return item
                    // }
                    // else {
                    //     return item
                    // }

                    if (value?.inventory_quantity < value?.min_order_quantity) {
                      if (filter[0].qty < value?.inventory_quantity) {
                        return item;
                      } else if (filter[0].qty >= quantity) {
                        // message.error(`Sorry, You Cannot add more than ${quantity} items`)

                        toast.error(
                          `Sorry, You Cannot add more than ${quantity} items`,
                          {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          }
                        );

                        item.qty = item.qty - 1;

                        return item;
                      } else {
                        return item;
                      }
                    } else {
                      if (filter[0].qty < value?.min_order_quantity) {
                        return item;
                      } else if (filter[0].qty >= quantity) {
                        // message.error(`Sorry, You Cannot add more than ${quantity} items`)

                        toast.error(
                          `Sorry, You Cannot add more than ${quantity} items`,
                          {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          }
                        );
                        item.qty = item.qty - 1;

                        return item;
                      } else {
                        return item;
                      }
                    }
                  } else {
                    // message.error('Sorry, You Cannot add more items')

                    toast.error("Sorry, You Cannot add more items", {
                      position: "bottom-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                }
              }
            } else {
              if (initialState.data) {
                let quantity;
                console.log("itemsms", item);
                if (initialState.data.item_id == item.item_id) {
                  if (item.inventoryDetails == null) {
                    // addToCart(item)
                    console.log("");
                    quantity = 15;
                    // if(maxmin)
                  } else if (item.inventoryDetails.inventory_quantity == 0) {
                    // message.error('Sorry,The Item is not available at the moment')
                    quantity = 0;
                  } else if (item.inventoryDetails.inventory_quantity != 0) {
                    if (
                      item.inventoryDetails.inventory_quantity >
                      item.inventoryDetails?.max_order_quantity && item.inventoryDetails?.max_order_quantity!=null
                    ) {
                      quantity = item.inventoryDetails?.max_order_quantity;
                    } else if (
                      item.inventoryDetails.inventory_quantity <
                      item.inventoryDetails.min_order_quantity
                    ) {
                      // message.error('Sorry,The Item is not available at the moment')
                      quantity = item.inventoryDetails.inventory_quantity;
                    } else {
                      quantity = item.inventoryDetails?.inventory_quantity;
                    }
                    // }
                  }

                  if (quantity > 0) {
                    const filter = cart.filter((c) => {
                      if (c.item_id == item.item_id) {
                        return c;
                      }
                    });

                    if (
                      item.inventoryDetails?.inventory_quantity <
                      item.inventoryDetails?.min_order_quantity
                    ) {
                      if (
                        filter[0].qty < item.inventoryDetails.inventory_quantity
                      ) {
                        return item;
                      } else if (filter[0].qty >= quantity) {
                        // message.error(`Sorry, You Cannot add more than ${quantity} items`)

                        toast.error(
                          `Sorry, You Cannot add more than ${quantity} items`,
                          {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          }
                        );

                        item.qty = item.qty - 1;

                        return item;
                      } else {
                        return item;
                      }
                    } else {
                      if (
                        filter[0].qty <
                        item.inventoryDetails?.min_order_quantity
                      ) {
                        return item;
                      } else if (filter[0].qty >= quantity) {
                        // message.error(`Sorry, You Cannot add more than ${quantity} items`)

                        toast.error(
                          `Sorry, You Cannot add more than ${quantity} items`,
                          {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          }
                        );

                        item.qty = item.qty - 1;

                        return item;
                      } else {
                        return item;
                      }
                    }
                  }
                }
              }
            }
          }).qty + 1
        )
      : handleAddonsQuantity(uId, "add");
  };

  const fetchVariantItemById = async (itemid, variantvalueid) => {
    setLoadingVariants(true);

    const res = await getVariantByItemId(itemid, variantvalueid);
    setLoadingVariants(false);
    return res.data;
  };

  //   ================================================================= METHOD TO INCREASE COUNTS OF ADDON ============================================================================//

  const incrAddQty = (uid) => {
    const addons = customItemData?.addons;

    const updatedAdds = addons.map((item) => {
      return item.id === uid ? { ...item, qty: item.qty + 1 } : item;
    });
    console.log("updated adddons >>>>>>>>>>>>>>>>>>", updatedAdds);
    setCustomItemData({ ...customItemData, addons: updatedAdds });
    setAddonCombination(updatedAdds);
  };

  //   ================================================================= METHOD TO DECREASE COUNTS OF ADDON ============================================================================//

  const decrAddQty = (e, uid) => {
    const addons = customItemData?.addons;
    const addonsItem = addons.find((item) => item.id === uid);

    if (addonsItem?.qty == 1) {
      const updatedAdds = addons.filter((item) => {
        return item.id !== uid;
      });
      setCustomItemData({ ...customItemData, addons: updatedAdds });
      setAddonCombination(updatedAdds);
    } else {
      const updatedAdds = addons.map((item) => {
        return item.id === uid ? { ...item, qty: item.qty - 1 } : item;
      });
      console.log("updated adddons >>>>>>>>>>>>>>>>>>", updatedAdds);
      setCustomItemData({ ...customItemData, addons: updatedAdds });
      setAddonCombination(updatedAdds);
    }
  };

  const handleVariantOnChange = async (
    indices,
    groupName,
    imagedata,
    variantValueId,
    variant_value_name
  ) => {
    selectedVariantStyle[indices - 1] = variantValueId;
    setChangeVariantAddon(!changeVariantAddon)



console.log('variantValueIdddd',variantValueId)
setSelectedVariantValue(variantValueId)

    // setselectedVariant({
    //   variant_value_id: variantValueId,
    //   variant_value_name,
    // });

    const filteredAdds =
      customItemData?.addons?.filter(
        (item) => item.variant_value_id === variantValueId
      ) || [];
    !filteredAdds.length > 0 && setShowCustomItemData(false);
    let variantvalue = {};
    variantvalue[`variant_value_${indices}`] = variantValueId;
    const allVariants = await fetchVariantItemById(id, variantvalue);

    const shouldbeselect = getListedVarants(allVariants, selectedVariantStyle);
    vanishVariants(indices, allVariants);

    if (shouldbeselect) {
      setDefaultItem(shouldbeselect);
    } else {
      const defaultOnChange = allVariants[Object.keys(allVariants)[0]];
      if (defaultOnChange) {
        setDefaultItem(defaultOnChange);
      }
    }

    if (!imagedata) {
      return;
    } else {
      const images = Object.values(imagedata).filter(Boolean);
      setVariantImages(images);
    }
  };

  const vanishVariants = (indices, object) => {
    const keepVariant = initialState.variants.filter(
      (item) => item.indices == indices
    );
    const keep = keepVariant.map((element) => element.variant_values);
    // const keep=keepProp.map(item=>item.variant_value_id)
    let result;
    if (keepVariants.length) {
      result = keep[0].map(function (item) {
        if (keepVariants.includes(item.variant_value_id)) {
          return item.variant_value_id;
        }
      });
    } else {
      result = keep[0].map((a) => a.variant_value_id);
    }

    let not_displayable = [];
    let finalResult = [];
    const giantList = Object.values(object);
    for (let i = 0; i < giantList.length; i++) {
      const x = giantList[i];
      let vari = [];
      let flag = 0;

      if (x["is_displayable"] == "N") {
        for (let i = 1; i <= 5; i++) {
          if (x[`variant_value_${i}`]) {
            // vari.push(x[`variant_value_${i + 1}`])
            const variantx = x[`variant_value_${i}`];
            if (variantx?.variant_value_id) {
              // flag=flag+1
              not_displayable.indexOf(variantx?.variant_value_id) == -1
                ? not_displayable.push(variantx?.variant_value_id)
                : "";
            }
          }
        }
      }

      if (x["is_displayable"] != "N") {
        for (let i = 1; i <= 5; i++) {
          if (x[`variant_value_${i}`]) {
            // vari.push(x[`variant_value_${i + 1}`])
            const variantx = x[`variant_value_${i}`];
            if (variantx?.variant_value_id) {
              // flag=flag+1
              result.indexOf(variantx?.variant_value_id) == -1
                ? result.push(variantx?.variant_value_id)
                : "";
            }
          }
        }
      }
    }
    if (not_displayable.length) {
      for (let i = 0; i < not_displayable.length; i++) {
        if (selectedVariantStyle[i] != not_displayable[i]) {
          finalResult = result.filter((item) => item != not_displayable[i]);
        }
      }
      setKeepVariants(finalResult);
    } else {
      setKeepVariants(result);
    }
  };

  const getListedVarants = (object = {}, list = []) => {
    let variant = {};
    const giantList = Object.values(object);
    for (let i = 0; i < giantList.length; i++) {
      const x = giantList[i];
      let vari = [];
      let flag = 0;
      if (x.is_displayable == "Y") {
        for (let i = 0; i < list.length; i++) {
          if (x[`variant_value_${i + 1}`]) {
            // vari.push(x[`variant_value_${i + 1}`])
            const variantx = x[`variant_value_${i + 1}`];
            if (variantx?.variant_value_id == list[i]) {
              flag = flag + 1;
            }
          }
        }
      }
      if (flag == list.length) {
        return x;
      }
      // variant.push(vari)
    }
    // let result = null
    // variant.forEach(element => {
    //     if (element.some(item => list.includes(item?.variant_value_id))) {
    //         result = element
    //     }
    // });
    // return result
    return null;
  };

  const handleWishlist = async (itemId) => {
    const filteredItems = stateWishlistItems?.data?.filter((wish, i) => {
      if (wish.item_id == itemId) {
        return wish;
      }
    });
    setLoadingWishlist(true);

    console.log("stateW", stateWishlistItems, filteredItems, wishlistId);

    if (!wishlistId || wishlistId == undefined) {
      const response = await addToWishlist(
        "storeId",
        stateCustomerDetails?.data?.customer_id,
        itemId
      );
      if (response.data) {
        // message.success('Added to Wishlist')

        toast.success("Added to Wishlist", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        console.log("response", response.data);

        setHeartIcon(true);
        setWishlistId(response.data);
        setLoadingWishlist(false);
        // fetchItemDetails(stateCustomerDetails?.data?.customer_id, id);
      }
    } else {
      const response = await deleteFromWishlist(wishlistId);

      // message.success('Removed from wishlist')

      toast.success("Removed from wishlist", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setWishlistId("");
      setHeartIcon(false);
      setLoadingWishlist(false);
      // fetchItemDetails(stateCustomerDetails?.data?.customer_id, id);
    }

    // if (filteredItems?.length == 0 || filteredItems==undefined || Object.keys(filteredItems).length === 0 || stateWishlistItems == {}) {
    //     if (response.data) {

    //         message.success('Added to Wishlist')
    //         setHeartIcon(true)
    //         // fetchItemDetails(stateCustomerDetails?.data?.customer_id, id);

    //     }

    //     else {

    //     }
    // } else {

    //
    //     message.success('Removed from wishlist')
    //     setHeartIcon(false)
    //     // fetchItemDetails(stateCustomerDetails?.data?.customer_id, id);
    // }

    // const payload = {
    //     customerId: stateCustomerDetails?.data?.customer_id, page: 1, storeId: storeDetails.store_id, setWishlist, wishlist, setPage: setPage, setNoMoreWishlist: setNoMoreWishlist
    // }

    // dispatchWishlist({ payload })
  };

  const removeFromWishlist = (primaryKey) => {
    const payload = {
      primaryKey,
      setState: props.setState,
      state: props.state,
      message,
    };
  };

  const handleAddonOk = () => {
    setAddonVisible(true);
  };

  const handleAddonCancel = () => {
    setAddonVisible(false);
    setAddonsAdded([]);
  };

  const handleAddonClose = () => {
    // setAddonVisible(false)
    setAddonsAdded([]);
  };

  const handleAddonChange = (e) => {
    if (e.target.checked) {
      const sortedAddons = addonsAdded.sort((a, b) =>
        a.add_on_name > b.add_on_name ? 1 : -1
      );

      console.log("sortedAddons", sortedAddons);

      setAddonsAdded([...sortedAddons, e.target.value]);

      if (initialState?.variants?.length && initialState.variants.length > 0) {
        let data = {
          qty: 1,
          variant_item_id: selectedVariant?.variant_item_id,
          addons: addonsAdded,
          id: crypto.randomBytes(16).toString("hex"),
        };

        data.addons.push(e.target.value);
        data.addons = data.addons.sort((a, b) =>
          a.add_on_name > b.add_on_name ? 1 : -1
        );

        const quantitySum = qtySum(data.addons, "price");

        setPriceWithAddon(
          parseInt(
            initialState.defaultVariantItem
              ? initialState.defaultVariantItem.sale_price
              : initialState.data
              ? initialState.data.sale_price
              : ""
          ) + quantitySum
        );

        setAddonsWithQty(data);
      } else {
        let data = {
          qty: 1,
          addons: addonsAdded,
          id: crypto.randomBytes(16).toString("hex"),
        };

        data.addons.push(e.target.value);
        data.addons = data.addons.sort((a, b) =>
          a.add_on_name > b.add_on_name ? 1 : -1
        );

        const quantitySum = qtySum(data.addons, "price");

        setPriceWithAddon(
          parseInt(
            initialState.defaultVariantItem
              ? initialState.defaultVariantItem.sale_price
              : initialState.data
              ? initialState.data.sale_price
              : ""
          ) + quantitySum
        );

        setAddonsWithQty(data);
      }
    } else {
      const filterData = addonsAdded.filter((item, index) => {
        return item.add_on_option_id != e.target.value.add_on_option_id;
      });
      setAddonsAdded(filterData);
      console.log("filterDataaa", filterData);

      const quantitySum = filterData ? qtySum(filterData, "price") : 0;
      setPriceWithAddon(
        parseInt(
          initialState.defaultVariantItem
            ? initialState.defaultVariantItem.sale_price
            : initialState.data
            ? initialState.data.sale_price
            : ""
        ) + quantitySum
      );
    }
  };

  const [addonInstruction, setAddonInstructions] = useState();

  const handleAddonInstructions = (e, add_on_group_id, add_on_title, mapId) => {
    let instructions = {
      add_on_group_id,
      add_on_title,
      mapId,
      text: e.target.value,
    };

    setAddonInstructions(instructions);

    let filter = addonsAdded.filter((item, index) => {
      if (item.add_on_group_id != instructions.add_on_group_id) {
        return item;
      }
    });

    filter.push(instructions);
    const sortedFilters = filter.sort((a, b) =>
      a.add_on_name > b.add_on_name ? 1 : -1
    );

    setAddonsAdded(sortedFilters);
    const addWithQty = addonsWithQty;

    addWithQty.addons = filter.sort((a, b) =>
      a.add_on_name > b.add_on_name ? 1 : -1
    );
    setAddonsWithQty(addWithQty);
  };

  const handleCustomizationModal = (data) => {
    // ;
    // setCustomItemData(confrmAddonCombination);
    const addonConfirm = confrmAddonCombination?.addons || [];
    // setAddonCombination(addonConfirm);
    setAddonVisible(true);
    console.log("addonasss", addonsAdded);
    if (!customItemData) {
      console.log(
        "BLUNDER>>>>>>>>>>>>>>>>>>>>>",
        data,
        "custom dta",
        customItemData
      );
      setCustomItemData({ ...customItemData, ...data });
    }
  };

  useEffect(() => {
    if (addonsAdded.length != 0) {
      // Object.keys(addons1).map((mapId, index) => {
      //     const item = addons1[mapId]
      //     item.add_on_options?.map((value, index) => {
      //         let data = value.price + parseInt(priceWithAddon)
      //         console.log(typeof (priceWithAddon))
      //         setPriceWithAddon(data)
      // qtySum()
      //     })
      // })
      // addonsAdded.map((item, index) => {
      // })
    }
  }, [addonsAdded]);

  const variantFilter = (item) => {
    return item.variant_item_id === selectedVariant?.variant_item_id;
  };

  const isDuplicateCart = (addons, duplicate) => {
    console.log("duplicate");
    debugger
    const addonsCombin = addons.map((addon) => {
      return addon?.id === duplicate?.id
        ? { ...addon, qty: addon.qty + 1 }
        : addon;
    });

    setAddonCombination([...addonsCombin]);
    let data = addonsCombin;
    let data1 = customItemData;
    data1.addons = data;

    const quantity = qtySum(data, "qty");
    data1.qty = quantity;

    setAddonQuantity(quantity);
    setCustomItemData(data1);
    setconfrmAddonCombination(data1);

    itemAddToCart(data1);

    setAddonVisible(false);
    console.log(duplicate, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> duplicate");
  };

  const handleConfirmAddons = () => {
    // itemAddToCart(customIte)
    // setCustomItemData({ ...customItemData, addons: addonsAdded })
    let getAddons = getUpdatedAddonsFromCart() || [];

    console.log("getAddons", getAddons, addonCombination);

    if (addonCombination.length || getAddons?.length) {
      let groupByaddonsWithQty = groupBy(addonsWithQty.addons, "add_on_title");
      let addonCombinationGroupby;
      console.log("length greater than 1");
      if (initialState.variants.length) {
        // let duplicate = getAddons
        //   .filter((item) => variantFilter(item))
        //   .find((item) => {
        //     addonCombinationGroupby = groupBy(item.addons, "add_on_title");
        //     return (
        //       JSON.stringify(addonCombinationGroupby) ===
        //       JSON.stringify(groupByaddonsWithQty)
        //     );
        //   });

        // // ========================================= IN CASE OF VARIANT ================================================= //

        // if (duplicate) {
        //   console.log("duplicate");
        //   const addonsCombin = getAddons.map((addon) => {
        //     return addon?.id === duplicate?.id &&
        //       addon.variant_item_id === selectedVariant?.variant_item_id
        //       ? { ...addon, qty: addon.qty + 1 }
        //       : addon;
        //   });

        //   setAddonCombination([...addonsCombin]);
        //   let data = addonsCombin;
        //   let data1 = customItemData;
        //   data1.addons = data;
        //   data1.defaultVariantItem = selectedVariant;

        //   const quantity = qtySum(customItemData.addons, "qty");
        //   data1.qty = quantity;
        //   setAddonQuantity(quantity);
        //   setCustomItemData(data1);
        //   setconfrmAddonCombination(data1);

        //   console.log("combination", addonCombination, quantity);
        //   addToCart(data1);

        //   setAddonVisible(false);
        //   console.log(duplicate, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> duplicate");
        // }
        // else {
        //   console.log("not duplicated");

        //   let data = [...getAddons, addonsWithQty];
        //   setAddonCombination(data);
        //   let data1 = customItemData;
        //   data1.addons = [addonsWithQty];
        //   data1.defaultVariantItem = selectedVariant;
        //   data1.variant_item_id = selectedVariant?.variant_item_id;

        //   const quantity = qtySum(data, "qty");
        //   data1.qty = qtySum(data1.addons, "qty");
        //   setAddonQuantity(quantity);
        //   setCustomItemData(data1);
        //   setconfrmAddonCombination(data1);

        //   console.log("combination", addonCombination, quantity);
        //   // addBulkItemToCart(data1);

        //   setAddonVisible(false);
        // }

        let duplicate = getAddons.find((item) => {
          addonCombinationGroupby = groupBy(item.addons, "add_on_title");
          return (
            JSON.stringify(addonCombinationGroupby) ===
            JSON.stringify(groupByaddonsWithQty)
          );
        });
        if (duplicate) {
          isDuplicateCart(getAddons, duplicate);
        } else {
          console.log("not duplicated");

          let data = [...getAddons, addonsWithQty];
          setAddonCombination(data);
          let data1 = customItemData;
          data1.addons = data;

          const quantity = qtySum(data, "qty");
          data1.qty = quantity;

          setAddonQuantity(quantity);
          setCustomItemData(data1);
          setconfrmAddonCombination(data1);

          console.log("combination", addonCombination, quantity);

          addToCart(data1);

          setAddonVisible(false);
        }
      } else {
          debugger
        let duplicate = getAddons.find((item) => {
          addonCombinationGroupby = groupBy(item.addons, "add_on_title");
          return (
            JSON.stringify(addonCombinationGroupby) ===
            JSON.stringify(groupByaddonsWithQty)
          );
        });
        if (duplicate) {
            
          isDuplicateCart(getAddons, duplicate);
        } else {
          console.log("not duplicated");

          let data = [...getAddons, addonsWithQty];
          setAddonCombination(data);
          let data1 = customItemData;
          data1.addons = data;

          const quantity = qtySum(data, "qty");
          data1.qty = quantity;
          setAddonQuantity(quantity);
          setCustomItemData(data1);
          setconfrmAddonCombination(data1);

          console.log("combination", addonCombination, quantity);
          addToCart(data1);

          setAddonVisible(false);
        }
      }
    } else {
      console.log("lengt not");
      // let groupByaddonsWithQty = groupBy(addonsWithQty.addons, "add_on_title");
      // let addonCombinationGroupby;
      // ;
      // let duplicate = getAddons.find((item) => {
      //   addonCombinationGroupby = groupBy(item.addons, "add_on_title");
      //   return (
      //     JSON.stringify(addonCombinationGroupby) ===
      //     JSON.stringify(groupByaddonsWithQty)
      //   );
      // });
      if (initialState?.variants.length) {
        let data = [...getAddons, addonsWithQty];
        let data1 = customItemData;
        data1.addons = data;
        data1.defaultVariantItem = selectedVariant;

        setAddonCombination(data);

        const quantity = qtySum(data, "qty");
        data1.qty = quantity;
        setAddonQuantity(quantity);
        setCustomItemData(data1);
        setconfrmAddonCombination(data1);

        console.log("combination", addonCombination, quantity);
        // itemAddToCart(data1)
        addToCart(data1);

        setAddonVisible(false);
      } else {
        let data = [...getAddons, addonsWithQty];
        let data1 = customItemData;
        data1.addons = data;
        setAddonCombination(data);

        const quantity = qtySum(data, "qty");
        data1.qty = quantity;
        setAddonQuantity(quantity);
        setCustomItemData(data1);
        setconfrmAddonCombination(data1);

        console.log("combination", addonCombination, quantity);
        // itemAddToCart(data1)
        addToCart(data1);

        setAddonVisible(false);
      }
    }
    setShowCustomItemData(true);
  };

  const updateCartRecordafter = () => {
    if (initialState?.variants) {
      const quantity = qtySum(customItemData.addons, "qty");
      setAddonQuantity(quantity);
      let data = customItemData;

      data.defaultVariantItem = selectedVariant;

      setAddonVisible(false);

      data.addons = customItemData?.addons || [];
      data.qty = quantity;
      addToCart(data);

      setconfrmAddonCombination(data);
    } else {
      const quantity = qtySum(customItemData.addons, "qty");
      setAddonQuantity(quantity);
      let data = customItemData;

      setAddonVisible(false);

      data.addons = customItemData?.addons || [];
      data.qty = quantity;
      addToCart(data);

      setconfrmAddonCombination(data);
    }
  };

  useEffect(() => {
    const selectedItem = cart?.find((item) => {
      console.log("naviiii", item, cart);
      if (item.item_id == initialState.data?.item_id) {
        if (initialState?.defaultVariantItem) {
          if (
            item.defaultVariantItem.variant_item_id ==
            initialState?.defaultVariantItem?.variant_item_id
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          console.log("selected te", item, selectedItem);
          //   setAddonCombination(selectedItem?.addons || []);
          return true;
        }
      } else {
        return false;
      }
    });
    if (selectedItem?.addons) {
      setShowCustomItemData(true);
    }

    setCustomItemData({ ...customItemData, addons: selectedItem?.addons });

    setCustomItemData({
      ...customItemData,
      ...initialState?.data,
      addons: selectedItem?.addons,
    });
  }, [initialState, cart]);

  useEffect(() => {
    setAddonsAdded([]);
  }, [addonCombination]);

  console.log("custtt", customItemData);

  const handleAddonsQuantity = (data, method) => {
    console.log("addonsadata", data, customItemData.addons);

    // Bringing Addon Option Values in an Array
    // const separateValues = data.map((item, index) => {
    //     return item.add_on_option_id
    // })

    if (method == "add") dispatchAddAddon(data);
    else dispatchDecreaseAddon(data);

    // Object.keys(customItemData?.addons).map((cb, num) => {

    //     const itemMap = customItemData?.addons[cb].addons
    //     // Bringing All Addon Option Values , Grouping the addon_title
    //     const newVar = groupBy(itemMap, 'add_on_title')
    //     const separateValues1 = Object.keys(newVar).map((item, index) => {
    //         console.log('addonspot', itemMap)
    //         const addons = newVar[item]

    //         return addons.map((addon, num) => {
    //             console.log('addonsopt', addon.add_on_option_id)
    //             return addon.add_on_option_id
    //         })

    //     })

    //     if (separateValues.equals(separateValues1[0])) {

    //     }

    //     console.log('addonsseparate', separateValues1[0], separateValues, separateValues1, separateValues.equals(separateValues1[0]))
    //     console.log('addonsadatagro', customItemData, separateValues, separateValues1)
    //     console.log('addonsaitemMap', itemMap)
    // })
  };

  const getAddonQuantity = () => {
    let qty = 0;

    if (initialState?.defaultVariantItem) {
      const filter = confrmAddonCombination?.addons?.filter((item) =>
        variantFilter(item)
      );

      console.log("filterrrrrrrrrrrrrrrrr", filter, confrmAddonCombination);
      const quantity = qtySum(filter, "qty");

      qty = quantity;
    } else {
      qty = qtySum(confrmAddonCombination?.addons, "qty");
    }

    return qty;
  };

  // console.log(
  //   "selected variant >>>>>>>>>>>>>>",
  //   selectedVariant,
  //   "initial data",
  //   initialState,
  //   " customitem data",
  //   customItemData
  // );
  // console.log('initialState >>>>>>>>>>>>>>>>>>>', initialState.data, 'selected style>>',selectedVariantStyle);
  console.log("selected variant>>>>>>>>", selectedVariant,selectedVariantStyle);

  {
    console.log("customItemDataaa>>>>", customItemData);
  }
  return initialState && !initialState.loading && !loadingVariants ? (
    <>
      {/* <Head>
                <title>{initialState.data ? initialState.data.item_name : ""} </title>
                <link rel="icon" href={storeDetails ? storeDetails?.logo_img_url : 'favicon.ico'} />
                <meta name="description" content={`${initialState.data && initialState.data.item_name + ', ' + initialState.data && initialState.data.item_desc}, Amazon.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping &amp; Cash on Delivery Available. `} />
                <meta property="og:description"
                    content={`${initialState.data && initialState.data.item_name + ', ' + initialState.data && initialState.data.item_desc}, The pizzeria is the largest pizza restaurant chain in the Country with multiple outlets in and around. The pizzeria is known for its fresh pizzas made using organic produce and local ingredients.`} />
                <meta name="keywords" content={`${initialState.data && initialState.data.item_name + ', ' + initialState.data && initialState.data.item_desc} , Amazon.in, Amazon, Online Shopping, online shopping india, india shopping online, amazon india, amazn, buy online, buy mobiles online, buy books online, buy movie dvd's online, kindle, kindle fire hd, kindle e-readers, ebooks, computers, laptop, toys, trimmers, watches, fashion jewellery, home, kitchen, small appliances, beauty, Sports, Fitness &amp; Outdoors`} />
            </Head> */}

      <div className="relative min-h-screen mt-16  lg:min-h-0 lg:mb-28 lg:mt-24">
        {/* {!isDesktopOrLaptop?<div className='bg-white sticky top-0 shadow-2xl  p-2 h-10'><ArrowLeftOutlined onClick={() => router.push(`/`)} /></div>:""} */}
        <div className="lg:p-10 p-5 bg-white">
          {/* product details container */}
          <div className="grid md:grid-cols-2  lg:mb-24   lg:min-h-0 mt-5 lg:mt-0 lg:pl-24 lg:pr-24">
            {/* images */}
            <div>
              <div className="lg:grid lg:grid-cols-2 ">
                <div className="lg:col-span-1 lg:order-2 ">
                  {isDesktopOrLaptop ? (
                    <div className="w-full h-96">
                      {/* <ReactImageMagnify {...{
                                                    smallImage: {
                                                        alt: 'product',
                                                        isFluidWidth: false,
                                                        src: initialState.images ? initialState.images[active] != null ? initialState.images[active] : `https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png` : "",
                                                        width: 300,
                                                        height: 400
                                                    },
                                                    largeImage: {
                                                        src: initialState.images ? initialState.images[active] != null ? initialState.images[active] : `https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png` : "",
                                                        width: 600,
                                                        height: 600
                                                    },
                                                    enlargedImageContainerStyle: { background: '#fff', zIndex: 9 },
                                                    enlargedImageContainerDimensions: {
                                                        width: '200%',
                                                        height: '100%'
                                                    }
                                                }} /> */}

                      {console.log(
                        "initiate.images",
                        initialState,
                        initialState.images,
                        initialState?.defaultVariantItem?.variant_value_1
                          ?.variant_value_images
                      )}

                      {/* <Magnify images={initialState.images}/> */}
                      <Magnify
                        images={
                          initialState.images?.length != 0
                            ? initialState.images
                            : initialState?.defaultVariantItem
                            ? Object.values(
                                initialState?.defaultVariantItem
                                  ?.variant_value_1?.variant_value_images !=
                                  null
                                  ? initialState.defaultVariantItem
                                      ?.variant_value_1?.variant_value_images
                                  : initialState.defaultVariantItem
                                      ?.variant_value_2?.variant_value_images !=
                                    null
                                  ? initialState.defaultVariantItem
                                      ?.variant_value_2?.variant_value_images
                                  : initialState.defaultVariantItem
                                      ?.variant_value_3?.variant_value_images !=
                                    null
                                  ? initialState.defaultVariantItem
                                      ?.variant_value_3?.variant_value_images
                                  : ""
                              )
                            : ""
                        }
                      />
                    </div>
                  ) : (
                    <div className="w-[90vw] bg-red-600">
                      <Carousel autoplay>
                        {initialState.images?.length != 0
                          ? initialState?.images?.map((key, idx) => {
                              console.log("key", key, idx);

                              return (
                                <img
                                  className="w-[20px] min-h-96 h-[100vh] max-h-96  rounded"
                                  key={key}
                                  src={
                                    key
                                      ? key
                                      : `https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png`
                                  }
                                  alt=""
                                />
                              );
                            })
                          : Object.values(
                              initialState.images?.length != 0
                                ? initialState.images
                                : initialState?.defaultVariantItem
                                ? Object.values(
                                    initialState?.defaultVariantItem
                                      ?.variant_value_1?.variant_value_images !=
                                      null
                                      ? initialState.defaultVariantItem
                                          ?.variant_value_1
                                          ?.variant_value_images
                                      : initialState.defaultVariantItem
                                          ?.variant_value_2
                                          ?.variant_value_images
                                      ? initialState.defaultVariantItem
                                          ?.variant_value_2
                                          ?.variant_value_images
                                      : initialState.defaultVariantItem
                                          ?.variant_value_3
                                          ?.variant_value_images != null
                                      ? initialState.defaultVariantItem
                                          ?.variant_value_3
                                          ?.variant_value_images
                                      : dummyImage
                                  )
                                : dummyImage
                            ).map((key, idx) => {
                              console.log("key", key, idx);

                              return (
                                <img
                                  className="w-[20px] min-h-96 h-96 max-h-96 rounded "
                                  key={key}
                                  src={
                                    key
                                      ? key
                                      : `https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png`
                                  }
                                  alt=""
                                />
                              );
                            })}
                      </Carousel>
                    </div>
                  )}
                </div>
                {/* <div className='col-span-1 flex lg:flex-col flex-wrap items-center gap-2 mt-2 mb-10 lg:mb-0 lg:mt-0 order-1'>
                                    {
                                        initialState.images ? initialState.images.map((key, idx) => <div key={idx} className='w-16 h-16 lg:w-20 lg:h-20 w border flex items-center justify-center'><img onClick={() => setActive(idx)} className='w-14 h-14 lg:w-16 lg:h-16 hover:scale-105 transition duration-75 rounded' src={key} /></div>) : ""
                                    }
                                </div>*/}
              </div>
            </div>
            {/* product information */}
            <div className="lg:my-0 my-4">
              {/* title */}
              <h2 className="text-gray-800 text-xl font-montSemiBold flex">
                {" "}
                {initialState.data ? (
                  initialState.data.is_veg == "Y" ? (
                    <img src="/veg.svg" className=" w-4 h-4 mt-2 mr-2" />
                  ) : (
                    <img src="/non-veg.png" className="w-4 h-4 mt-2 mr-2" />
                  )
                ) : (
                  ""
                )}
                {initialState.data ? initialState.data.item_name : ""}
              </h2>

              {/* price */}
              <div className="flex lg:flex-col flex-col-reverse">
                {/* description */}
                {initialState.data &&
                initialState.data.item_desc != "No description available" ? (
                  <p className="pr-4 text-sm font-montRegular">
                    {initialState.data.item_desc}
                  </p>
                ) : (
                  ""
                )}

                <div className=" flex items-center">
                  <p
                    className="text-xl font-montBold mr-5"
                    style={{
                      color: `${
                        storeSettings.data
                          ? storeSettings.data.primary_color
                          : "black"
                      }`,
                    }}
                  >
                    {storeDetails?.currency_symbol}{" "}
                    {initialState.defaultVariantItem
                      ? initialState.defaultVariantItem.sale_price
                      : initialState.data
                      ? initialState.data.sale_price
                      : ""}
                  </p>

                  {initialState.defaultVariantItem ? (
                    <p className="line-through text-lg text-gray-500">
                      {" "}
                      {initialState.defaultVariantItem
                        ? initialState.defaultVariantItem.list_price -
                            initialState.data.sale_price !=
                          0
                          ? `${storeDetails?.currency_symbol} ${initialState.defaultVariantItem.list_price}`
                          : ""
                        : ""}{" "}
                    </p>
                  ) : (
                    <p className="line-through text-lg text-gray-500">
                      {initialState.data
                        ? initialState.data.price -
                            initialState.data.sale_price !=
                          0
                          ? `${storeDetails?.currency_symbol} ${initialState.data.price}`
                          : ""
                        : ""}{" "}
                    </p>
                  )}
                </div>
              </div>

              {/* Variants */}
              {initialState.variants
                ? initialState.variants.map((item, idx) => (
                    <div key={idx} className="">
                      <p className="font-montMedium">
                        {item.variant_group_name}
                      </p>
                      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        {colorVariants.includes(item.variant_group_name)
                          ? item.variant_values.map((variant, idx) => (
                              <li key={idx} className="mr-2">
                                <Tooltip
                                  color={"black"}
                                  placement="top"
                                  title={variant.variant_value_name}
                                >
                                  <div
                                    onClick={() =>
                                      handleVariantOnChange(
                                        item.indices,
                                        item.variant_group_name,
                                        variant.variant_value_images,
                                        variant.variant_value_id,
                                        variant.variant_value_name
                                      )
                                    }
                                    className="inline-block py-3 px-3 text-white rounded border-2 cursor-pointer"
                                    style={{
                                      background: `${
                                        variant.variant_value_metadata
                                          ? variant.variant_value_metadata
                                              .color_hexcode
                                          : variant.variant_value_name
                                      }`,
                                      borderColor: `${
                                        selectedVariantStyle.includes(
                                          variant.variant_value_id
                                        )
                                          ? storeSettings.data
                                            ? storeSettings.data.primary_color
                                            : "black"
                                          : ""
                                      }`,
                                      display: `${
                                        keepVariants.length &&
                                        !keepVariants.includes(
                                          variant.variant_value_id
                                        )
                                          ? "none"
                                          : ""
                                      }`,
                                    }}
                                  ></div>
                                </Tooltip>
                              </li>
                            ))
                          : item.variant_values.map((variant, idx) => (
                              <li key={idx} className="mr-2">
                                <div
                                  onClick={() =>
                                    handleVariantOnChange(
                                      item.indices,
                                      item.variant_group_name,
                                      variant.variant_value_images,
                                      variant.variant_value_id
                                    )
                                  }
                                  className="inline-block py-3 px-4 text-gray-500 border-2 border-gray-300 rounded-lg cursor-pointer"
                                  style={{
                                    borderColor: `${
                                      selectedVariantStyle.includes(
                                        variant.variant_value_id
                                      )
                                        ? storeSettings.data
                                          ? storeSettings.data.primary_color
                                          : "black"
                                        : ""
                                    }`,
                                    display: `${
                                      keepVariants.length &&
                                      !keepVariants.includes(
                                        variant.variant_value_id
                                      )
                                        ? "none"
                                        : ""
                                    }`,
                                  }}
                                >
                                  {variant.variant_value_name}
                                </div>
                              </li>
                            ))}
                      </ul>
                    </div>
                  ))
                : ""}
              {/* 65575 */}

              {isDesktopOrLaptop ? (
                <div className="flex">
                  <div className="flex items-center space-x-5">
                    {(initialState.defaultVariantItem &&
                      initialState.defaultVariantItem.variant_item_status ==
                        "UNAVAILABLE") ||
                    (initialState.defaultVariantItem &&
                      initialState.defaultVariantItem.variant_item_status ==
                        "CURRENTLY_UNAVAILABLE") ||
                    (initialState.data &&
                      initialState.data.item_status ==
                        "CURRENTLY_UNAVAILABLE") ||
                    (initialState.data &&
                      initialState.data.item_status == "UNAVAILABLE") ? (
                      <div
                        className=" py-2 px-4 border text-sm cursor-not-allowed mt-3 font-montMedium"
                        style={{
                          backgroundColor: "white",
                          color: `${
                            storeSettings.data
                              ? storeSettings.data.secondary_color
                              : "black"
                          }`,
                          borderColor: `${
                            storeSettings.data
                              ? storeSettings.data.primary_color
                              : "black"
                          }`,
                        }}
                      >
                        UNAVAILABLE
                      </div>
                    ) : !cart?.find((item) =>

                        initialState.defaultVariantItem
                          ? item?.addons
                            ? item.addons[0]?.variant_item_id ==
                                initialState.defaultVariantItem
                                  .variant_item_id ||
                              item.addons[0]?.variant_item_id ===
                                selectedVariant?.variant_item_id
                            : item.defaultVariantItem?.variant_item_id ==
                                initialState.defaultVariantItem
                                  .variant_item_id ||
                              item.defaultVariantItem?.variant_item_id ===
                                selectedVariant?.variant_item_id
                          :
                          
                           item.item_id == id
                      ) ? (
                      <div className="flex flex-col">
                        <div
                          onClick={() =>
                            customization
                              ? handleCustomizationModal(initialState.data)
                              : itemAddToCart(initialState.data)
                          }
                          className="text-lg py-2 px-7 border cursor-pointer mt-3"
                          style={{
                            color: `${
                              storeSettings.data
                                ? storeSettings.data.navbar_color
                                : "white"
                            }`,
                            backgroundColor: `${
                              storeSettings.data
                                ? storeSettings.data.secondary_color
                                : "black"
                            }`,
                          }}
                        >
                          Add to Cartd
                        </div>
                        {customization ? (
                          <p className="text-black font-montMedium ">
                            * Customization Available
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div
                          className="border space-x-9  flex items-center mt-3"
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
                            onClick={() => {
                              customization
                                ? setAddonVisible(true)
                                : handleDecreaseQuantity(
                                    initialState.defaultVariantItem
                                      ? initialState.defaultVariantItem
                                          .variant_item_id
                                      : id,
                                    cart.find(function (item) {
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
                                    }).qty - 1
                                  );
                            }}
                            className={`px-3 py-2 text-xl cursor-pointer`}
                            style={{
                              backgroundColor: `${
                                storeSettings.data ? rgbaBackground : "black"
                              }`,
                              color: `${
                                storeSettings.data ? rgbaColor : "white"
                              }`,
                              borderColor: `${
                                storeSettings.data
                                  ? storeSettings.data.secondary_color
                                  : "black"
                              }`,
                            }}
                          >
                            <MinusOutlined />
                          </span>
                          {console.log("summinitioatstat", initialState)}
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
                            {
                              // !addonQuantity
                              //   ?
                              //   cart.find(function (item) {
                              //     if (initialState.defaultVariantItem) {
                              //       if (item.defaultVariantItem) {
                              //           console.log('item.defaultVariantItem.variant_item_id ==initialState.defaultVariantItem.variant_item_id',    item.defaultVariantItem
                              //           .variant_item_id ==
                              //         initialState.defaultVariantItem
                              //           .variant_item_id ,item.defaultVariantItem
                              //           .variant_item_id , initialState.defaultVariantItem
                              //           .variant_item_id )
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
                              //   })
                              cart?.find((item) => {
                                console.log("naviiii", item, cart);
                                if (
                                  item.item_id == initialState.data?.item_id
                                ) {
                                  console.log(
                                    "item.item_id == initialState.data?.item_id",
                                    item.item_id == initialState.data?.item_id
                                  );
                                  if (initialState?.defaultVariantItem) {
                                    console.log(
                                      "item.item_id == initialState.data?.item_id with initialState?.defaultVariantItem ",
                                      initialState?.defaultVariantItem
                                    );
                                    if (item?.addons) {
                                      if (
                                        item.addons[0].variant_item_id ==
                                        initialState?.defaultVariantItem
                                          ?.variant_item_id
                                      ) {
                                        console.log(
                                          "item.item_id == initialState.data?.item_id with initialState?.defaultVariantItem with  item.defaultVariantItem.variant_item_id ==initialState?.defaultVariantItem?.variant_item_id ",
                                          item.defaultVariantItem
                                            .variant_item_id ==
                                            initialState?.defaultVariantItem
                                              ?.variant_item_id
                                        );
                                        return true;
                                      } else {
                                        return false;
                                      }
                                    } else {
                                      if (
                                        item.defaultVariantItem
                                          .variant_item_id ==
                                        initialState?.defaultVariantItem
                                          ?.variant_item_id
                                      ) {
                                        console.log(
                                          "item.item_id == initialState.data?.item_id with initialState?.defaultVariantItem with  item.defaultVariantItem.variant_item_id ==initialState?.defaultVariantItem?.variant_item_id ",
                                          item.defaultVariantItem
                                            .variant_item_id ==
                                            initialState?.defaultVariantItem
                                              ?.variant_item_id
                                        );
                                        return true;
                                      } else {
                                        return false;
                                      }
                                    }
                                  } else {
                                    //   setAddonCombination(selectedItem?.addons || []);
                                    return true;
                                  }
                                } else {
                                  return false;
                                }
                              })?.qty
                              //   : getAddonQuantity()
                            }
                            asxbca
                          </span>

                          <span
                            className={`px-3 py-2 text-xl cursor-pointer`}
                            style={{
                              backgroundColor: `${
                                storeSettings.data ? rgbaBackground : "black"
                              }`,
                              color: `${
                                storeSettings.data ? rgbaColor : "white"
                              }`,
                              borderColor: `${
                                storeSettings.data
                                  ? storeSettings.data.secondary_color
                                  : "black"
                              }`,
                            }}
                            onClick={() =>
                              customization
                                ? setAddonVisible(true)
                                : adjustQty(
                                    initialState.defaultVariantItem
                                      ? initialState.defaultVariantItem
                                          .variant_item_id
                                      : id,
                                    cart.find(function (item) {
                                      if (initialState.defaultVariantItem) {
                                        if (item.defaultVariantItem) {
                                          if (
                                            item.defaultVariantItem
                                              .variant_item_id ==
                                            initialState.defaultVariantItem
                                              .variant_item_id
                                          ) {
                                            let quantity = 0;
                                            const value =
                                              item?.defaultVariantItem
                                                ?.inventory_details;

                                            if (
                                              value?.inventory_quantity == null
                                            ) {
                                              if (
                                                value?.max_order_quantity ==
                                                null
                                              )
                                                quantity = 15;
                                              else {
                                                quantity =
                                                  value.max_order_quantity;
                                              }
                                              // if(maxmin)
                                            } else if (
                                              value?.inventory_quantity !=
                                                null &&
                                              value?.max_order_quantity == null
                                            ) {
                                              quantity =
                                                value?.inventory_quantity;
                                              console.log(
                                                "value?.inventory_quantity != null && value?.max_order_quantity == null"
                                              );
                                            } else if (
                                              value?.max_order_quantity >
                                              value?.inventory_quantity
                                            ) {
                                              quantity =
                                                value?.inventory_quantity;
                                              console.log(
                                                "value?.max_order_quantity > value?.inventory_quantity"
                                              );
                                            } else if (
                                              value?.max_order_quantity <
                                              value?.inventory_quantity
                                            ) {
                                              quantity =
                                                value.max_order_quantity;
                                              console.log(
                                                "value?.max_order_quantity < value?.inventory_quantity"
                                              );
                                            }

                                            if (quantity > 0) {
                                              const filter = cart.filter(
                                                (c) => {
                                                  if (
                                                    c.defaultVariantItem
                                                      ?.variant_item_id ==
                                                    item.defaultVariantItem
                                                      .variant_item_id
                                                  ) {
                                                    return c;
                                                  }
                                                }
                                              );

                                              // if (filter[0].qty >= quantity) {
                                              //     message.error(`Sorry, You Cannot add more than ${quantity} items`)
                                              //     item.qty = item.qty - 1
                                              //     return item
                                              // }
                                              // else {
                                              //     return item
                                              // }

                                              if (
                                                value?.inventory_quantity <
                                                value?.min_order_quantity
                                              ) {
                                                if (
                                                  filter[0].qty <
                                                  value?.inventory_quantity
                                                ) {
                                                  return item;
                                                } else if (
                                                  filter[0].qty >= quantity
                                                ) {
                                                  // message.error(`Sorry, You Cannot add more than ${quantity} items`)

                                                  toast.error(
                                                    `Sorry, You Cannot add more than ${quantity} items`,
                                                    {
                                                      position: "bottom-right",
                                                      autoClose: 1000,
                                                      hideProgressBar: false,
                                                      closeOnClick: true,
                                                      pauseOnHover: true,
                                                      draggable: true,
                                                      progress: undefined,
                                                    }
                                                  );

                                                  item.qty = item.qty - 1;

                                                  return item;
                                                } else {
                                                  return item;
                                                }
                                              } else {
                                                if (
                                                  filter[0].qty <
                                                  value?.min_order_quantity
                                                ) {
                                                  return item;
                                                } else if (
                                                  filter[0].qty >= quantity
                                                ) {
                                                  // message.error(`Sorry, You Cannot add more than ${quantity} items`)

                                                  toast.error(
                                                    `Sorry, You Cannot add more than ${quantity} items`,
                                                    {
                                                      position: "bottom-right",
                                                      autoClose: 1000,
                                                      hideProgressBar: false,
                                                      closeOnClick: true,
                                                      pauseOnHover: true,
                                                      draggable: true,
                                                      progress: undefined,
                                                    }
                                                  );
                                                  item.qty = item.qty - 1;

                                                  return item;
                                                } else {
                                                  return item;
                                                }
                                              }
                                            } else {
                                              // message.error('Sorry, You Cannot add more items')

                                              toast.error(
                                                "Sorry, You Cannot add more items",
                                                {
                                                  position: "bottom-right",
                                                  autoClose: 1000,
                                                  hideProgressBar: false,
                                                  closeOnClick: true,
                                                  pauseOnHover: true,
                                                  draggable: true,
                                                  progress: undefined,
                                                }
                                              );
                                            }
                                          }
                                        }
                                      } else {
                                        if (initialState.data) {
                                          let quantity;
                                          console.log("itemsms", item);
                                          if (
                                            initialState.data.item_id ==
                                            item.item_id
                                          ) {
                                            if (item.inventoryDetails == null) {
                                              // addToCart(item)
                                              console.log("");
                                              quantity = 15;
                                              // if(maxmin)
                                            } else if (
                                              item.inventoryDetails
                                                .inventory_quantity == 0
                                            ) {
                                              // message.error('Sorry,The Item is not available at the moment')
                                              quantity = 0;
                                            } else if (
                                              item.inventoryDetails
                                                .inventory_quantity != 0
                                            ) {
                                              if (
                                                item.inventoryDetails
                                                  .inventory_quantity >
                                                item.inventoryDetails
                                                  ?.max_order_quantity && item.inventoryDetails
                                                  ?.max_order_quantity!=null 
                                              ) {
                                                quantity =
                                                  item.inventoryDetails
                                                    ?.max_order_quantity;
                                              } else if (
                                                item.inventoryDetails
                                                  .inventory_quantity <
                                                item.inventoryDetails
                                                  .min_order_quantity
                                              ) {
                                                // message.error('Sorry,The Item is not available at the moment')
                                                quantity =
                                                  item.inventoryDetails
                                                    .inventory_quantity;
                                              } else {
                                                quantity =
                                                  item.inventoryDetails
                                                    ?.inventory_quantity;
                                              }
                                              // }
                                            }

                                            if (quantity > 0) {
                                              const filter = cart.filter(
                                                (c) => {
                                                  if (
                                                    c.item_id == item.item_id
                                                  ) {
                                                    return c;
                                                  }
                                                }
                                              );

                                              if (
                                                item.inventoryDetails
                                                  ?.inventory_quantity <
                                                item.inventoryDetails
                                                  ?.min_order_quantity
                                              ) {
                                                if (
                                                  filter[0].qty <
                                                  item.inventoryDetails
                                                    .inventory_quantity
                                                ) {
                                                  return item;
                                                } else if (
                                                  filter[0].qty >= quantity
                                                ) {
                                                  // message.error(`Sorry, You Cannot add more than ${quantity} items`)

                                                  toast.error(
                                                    `Sorry, You Cannot add more than ${quantity} items`,
                                                    {
                                                      position: "bottom-right",
                                                      autoClose: 1000,
                                                      hideProgressBar: false,
                                                      closeOnClick: true,
                                                      pauseOnHover: true,
                                                      draggable: true,
                                                      progress: undefined,
                                                    }
                                                  );

                                                  item.qty = item.qty - 1;

                                                  return item;
                                                } else {
                                                  return item;
                                                }
                                              } else {
                                                if (
                                                  filter[0].qty <
                                                  item.inventoryDetails
                                                    ?.min_order_quantity
                                                ) {
                                                  return item;
                                                } else if (
                                                  filter[0].qty >= quantity
                                                ) {
                                                  // message.error(`Sorry, You Cannot add more than ${quantity} items`)

                                                  toast.error(
                                                    `Sorry, You Cannot add more than ${quantity} items`,
                                                    {
                                                      position: "bottom-right",
                                                      autoClose: 1000,
                                                      hideProgressBar: false,
                                                      closeOnClick: true,
                                                      pauseOnHover: true,
                                                      draggable: true,
                                                      progress: undefined,
                                                    }
                                                  );

                                                  item.qty = item.qty - 1;

                                                  return item;
                                                } else {
                                                  return item;
                                                }
                                              }

                                              // addToCart(item)
                                              // return item
                                            }
                                            // else {
                                            //     message.error('Sorry, You Cannot add more items')
                                            // }
                                            // item['store_name'] = storeDetails.data ? storeDetails.data.store_name : "";
                                            // item['store_logo'] = storeDetails.data ? storeDetails.data.logo_img_url : "";
                                          }
                                        }
                                      }
                                    }).qty + 1
                                  )
                            }
                          >
                            <PlusOutlined />
                          </span>
                        </div>
                        {customization ? (
                          <p className="text-black font-montMedium ">
                            * Customization Available
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    )}

                    {/* <div className="text-emerald-500 py-2 px-2 border border-slate-300 text-sm cursor-pointer flex items-center"><HeartOutlined /><span className="px-2">Add to Wishlist</span></div> */}
                  </div>
                  {!loadingWishlist ? (
                    wishlistId ? (
                      <div
                        onClick={() =>
                          handleWishlist(initialState?.data.item_id)
                        }
                        className="text-lg py-2 px-7 cursor-pointer mt-3 text-[#212B36] flex items-start"
                      >
                        <span
                          className="-mt-1 pr-3 "
                          id={initialState?.data?.item_id}
                        >
                          <HeartFilled
                            style={{ fontSize: "24px", color: "red" }}
                          />
                        </span>
                        ADDED TO WISHLIST
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          stateCustomerDetails?.data?.customer_id
                            ? handleWishlist(initialState?.data.item_id)
                            : showModal()
                        }
                        className="text-lg py-2 px-7 cursor-pointer mt-3 text-[#212B36] flex items-start"
                      >
                        <span
                          className="-mt-1 pr-3 "
                          id={initialState?.data?.item_id}
                        >
                          <HeartOutlined style={{ fontSize: "24px" }} />
                        </span>
                        Add to wishlist
                      </div>
                    )
                  ) : (
                    <div className=" h-12 flex  py-2 px-24 mt-4  items-center ">
                      <SyncOutlined spin />
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
              {/* {minQtyMsg?  */}

              {minQtyMsg && initialState?.data?.item_status == "AVAILABLE" ? (
                <p className="text-red-500 font-montMedium">
                  {" "}
                  <i>{`${
                    initialState.defaultVariantItem?.inventoryDetails
                      ?.min_order_quantity
                      ? `**Minimum Quatity is ${initialState.defaultVariantItem.inventoryDetails.min_order_quantity}`
                      : `**Minimum Quantity is ${
                          initialState?.data &&
                          initialState.data.inventoryDetails
                            ?.inventory_quantity <
                            initialState.data.inventoryDetails
                              ?.min_order_quantity
                            ? initialState.data.inventoryDetails
                                ?.inventory_quantity
                            : initialState.data.inventoryDetails
                                ?.min_order_quantity
                        }`
                  }`}</i>
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          {initialState.spec?.length ? (
            <>
              {/* <hr /> */}
              {/* product specification */}
              <div className="lg:pl-24">
                <h2 className="text-gray-800 text-2xl font-montSemiBold lg:my-7">
                  Product Specifications
                </h2>
                {/* <div className=" lg:grid lg:grid-cols-2 bg-yellow-700 "> */}
                <div className=" flex flex-col lg:grid lg:grid-cols-2  gap-5 mb-12 lg:mb-0">
                  {initialState.spec
                    ? initialState.spec.map((item, idx) => (
                        <div key={idx} className="pr-5">
                          <h3 className="text-gray-500 ">
                            {item.attribute_key}
                          </h3>
                          <p className="border-b-2 text-lg font-montMedium">
                            {item.attribute_value}
                          </p>
                        </div>
                      ))
                    : ""}
                </div>

                {/* </div> */}
              </div>
            </>
          ) : (
            ""
          )}
          {/* Aditional Info */}
          {initialState.additionalinfo?.length ? (
            <>
              <div className="my-7 lg:pl-24 lg:pr-24">
                <hr />
                <h2 className="text-gray-800 text-2xl font-montSemiBold my-7">
                  Additional Info
                </h2>
                <div className="grid lg:grid-cols-2">
                  {initialState.additionalinfo
                    ? initialState.additionalinfo.map((item, idx) =>
                        item.media_type == "IMAGE" ? (
                          <div key={idx} className="space-y-2 p-3 w-98 h-98">
                            <img
                              className="w-full h-80"
                              src={
                                item.media_url
                                  ? item.media_url
                                  : "/dummyfood.png"
                              }
                              alt="product-img"
                            />
                            <h2 className="font-montSemiBold">{item.title}</h2>
                            <p className="font-montRegular">
                              {item.description}
                            </p>
                          </div>
                        ) : (
                          ""
                        )
                      )
                    : ""}
                </div>
                <div className="mt-7">
                  {initialState.additionalinfo
                    ? initialState.additionalinfo.map((item, idx) =>
                        item.media_type == "VIDEO" ? (
                          <div className="mx-auto lg:w-5/12">
                            {/* <img className='w-full h-96'
                            src="/dummyfood.png"
                            alt='product-img'
                        /> */}
                            {/* <Video className='w-full h-96' src={item.media_url?item.media_url:""}/> */}
                            <div className="w-full h-80">
                              <ReactPlayer
                                height={"100%"}
                                width={"100%"}
                                url={item.media_url}
                              />
                            </div>
                            <h2 className="font-montSemiBold">{item.title}</h2>
                            <p className="font-montRegular">
                              {item.description}
                            </p>
                          </div>
                        ) : (
                          ""
                        )
                      )
                    : ""}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {initialState.relatedItems?.length ? (
            <>
              <hr />
              {/* Similar Items */}
              <div>
                <h2 className="text-gray-800 text-2xl font-montSemiBold my-7">
                  Similar Items
                </h2>
                <div className="lg:grid lg:grid-cols-4 flex whitespace-nowrap flex-grow space-x-10 overflow-x-scroll lg:overflow-x-hidden lg:flex-none">
                  {initialState.relatedItems
                    ? initialState.relatedItems.map((item, idx) => (
                        <div className="cursor-pointer" key={idx}>
                          {/* onClick={() => redirect(`product/${item.item_id}`)} */}
                          <img
                            className="lg:w-72 lg:h-72 w-36 h-36 rounded"
                            src={
                              item.primary_img
                                ? item.primary_img
                                : "/dummyfood.png"
                            }
                            alt="product-img"
                          />
                          <h2 className="text-gray-800 text-base font-montSemiBold">
                            {item.item_name}
                          </h2>

                          <p className="text-gray-800 text-base font-montRegular">
                            {storeDetails?.currency_symbol} {item.sale_price}
                          </p>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        {!isDesktopOrLaptop ? (
          <div className="flex items-center sticky bottom-16 shadow-2xl bg-white p-2">
            {!loadingWishlist ? (
              wishlistId ? (
                <div
                  onClick={() =>
                    stateCustomerDetails?.data?.customer_id
                      ? handleWishlist(initialState?.data.item_id)
                      : router.push("/account/user/login")
                  }
                  className="text-sm py-2 px-1 cursor-pointer mt-3 text-[#212B36] flex items-start w-64 "
                >
                  <span className=" pr-3 " id={initialState?.data?.item_id}>
                    <HeartFilled style={{ fontSize: "24px", color: "red" }} />
                  </span>
                  ADDED TO WISHLIST
                </div>
              ) : (
                <div
                  onClick={() =>
                    stateCustomerDetails?.data?.customer_id
                      ? handleWishlist(initialState?.data.item_id)
                      : router.push("/account/user/login")
                  }
                  className="text py-2 px-1 cursor-pointer mt-3 text-[#212B36] flex items-start w-64 "
                >
                  <span
                    className="-mt-1 pr-3 "
                    id={initialState?.data?.item_id}
                  >
                    <HeartOutlined style={{ fontSize: "24px" }} />
                  </span>
                  Add to wishlist
                </div>
              )
            ) : (
              <div className="w-52 px-20">
                <SyncOutlined spin />
              </div>
            )}

            {(initialState.defaultVariantItem &&
              initialState.defaultVariantItem.variant_item_status ==
                "UNAVAILABLE") ||
            (initialState.defaultVariantItem &&
              initialState.defaultVariantItem.variant_item_status ==
                "CURRENTLY_UNAVAILABLE") ||
            (initialState.data &&
              initialState.data.item_status == "CURRENTLY_UNAVAILABLE") ||
            (initialState.data &&
              initialState.data.item_status == "UNAVAILABLE") ? (
              <div
                className=" py-2 px-2 border text-center text-sm cursor-pointer w-1/2"
                style={{
                  backgroundColor: "white",
                  color: `${
                    storeSettings.data
                      ? storeSettings.data.secondary_color
                      : "black"
                  }`,
                  borderColor: `${
                    storeSettings.data
                      ? storeSettings.data.primary_color
                      : "black"
                  }`,
                }}
              >
                UNAVAILABLE
              </div>
            ) : !cart.find((item) =>
                initialState.defaultVariantItem
                  ? item.defaultVariantItem?.variant_item_id ==
                    initialState.defaultVariantItem.variant_item_id
                  : item.item_id == id
              ) ? (
              <div
                onClick={() => itemAddToCart(initialState.data)}
                className="mt-2 py-2 px-2 border text-center text- cursor-pointer w-1/2"
                style={{
                  color: `${
                    storeSettings.data
                      ? storeSettings.data.navbar_color
                      : "white"
                  }`,
                  backgroundColor: `${
                    storeSettings.data
                      ? storeSettings.data.secondary_color
                      : "black"
                  }`,
                }}
              >
                Add to Cart
              </div>
            ) : (
              <div
                className="border space-x-2  flex items-center justify-between w-1/2 m-auto"
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
                  onClick={() =>
                    handleDecreaseQuantity(
                      initialState.defaultVariantItem
                        ? initialState.defaultVariantItem.variant_item_id
                        : id,
                      cart.find(function (item) {
                        if (initialState.defaultVariantItem) {
                          if (item.defaultVariantItem) {
                            if (
                              item.defaultVariantItem.variant_item_id ==
                              initialState.defaultVariantItem.variant_item_id
                            ) {
                              return item;
                            }
                          }
                        } else if (item.item_id == id) {
                          return item;
                        }
                      }).qty - 1
                    )
                  }
                  className={`px-4 py-2 text-xl cursor-pointer`}
                  style={{
                    backgroundColor: `${
                      storeSettings.data ? rgbaBackground : "black"
                    }`,
                    color: `${storeSettings.data ? rgbaColor : "white"}`,
                    borderColor: `${
                      storeSettings.data
                        ? storeSettings.data.primary_color
                        : "black"
                    }`,
                  }}
                >
                  <MinusOutlined />
                </span>

                <span
                  className="font-montBold text-"
                  style={{
                    color: `${
                      storeSettings.data
                        ? storeSettings.data.primary_color
                        : "white"
                    }`,
                  }}
                >
                  {
                    cart.find(function (item) {
                      if (initialState.defaultVariantItem) {
                        if (item.defaultVariantItem) {
                          if (
                            item.defaultVariantItem.variant_item_id ==
                            initialState.defaultVariantItem.variant_item_id
                          ) {
                            return item;
                          }
                        }
                      } else if (item.item_id == id) {
                        return item;
                      }
                    }).qty
                  }
                </span>
                <span
                  onClick={() =>
                    adjustQty(
                      initialState.defaultVariantItem
                        ? initialState.defaultVariantItem.variant_item_id
                        : id,
                      cart.find(function (item) {
                        if (initialState.defaultVariantItem) {
                          if (item.defaultVariantItem) {
                            if (
                              item.defaultVariantItem.variant_item_id ==
                              initialState.defaultVariantItem.variant_item_id
                            ) {
                              let quantity = 0;
                              const value =
                                item?.defaultVariantItem?.inventory_details;

                              if (value?.inventory_quantity == null) {
                                if (value?.max_order_quantity == null)
                                  quantity = 15;
                                else {
                                  quantity = value.max_order_quantity;
                                }
                                // if(maxmin)
                              } else if (
                                value?.inventory_quantity != null &&
                                value?.max_order_quantity == null
                              ) {
                                quantity = value?.inventory_quantity;
                                console.log(
                                  "value?.inventory_quantity != null && value?.max_order_quantity == null"
                                );
                              } else if (
                                value?.max_order_quantity >
                                value?.inventory_quantity
                              ) {
                                quantity = value?.inventory_quantity;
                                console.log(
                                  "value?.max_order_quantity > value?.inventory_quantity"
                                );
                              } else if (
                                value?.max_order_quantity <
                                value?.inventory_quantity
                              ) {
                                quantity = value.max_order_quantity;
                                console.log(
                                  "value?.max_order_quantity < value?.inventory_quantity"
                                );
                              }

                              if (quantity > 0) {
                                const filter = cart.filter((c) => {
                                  if (
                                    c.defaultVariantItem?.variant_item_id ==
                                    item.defaultVariantItem.variant_item_id
                                  ) {
                                    return c;
                                  }
                                });

                                // if (filter[0].qty >= quantity) {
                                //     message.error(`Sorry, You Cannot add more than ${quantity} items`)
                                //     item.qty = item.qty - 1
                                //     return item
                                // }
                                // else {
                                //     return item
                                // }

                                if (
                                  value?.inventory_quantity <
                                  value?.min_order_quantity
                                ) {
                                  if (
                                    filter[0].qty < value?.inventory_quantity
                                  ) {
                                    return item;
                                  } else if (filter[0].qty >= quantity) {
                                    // message.error(`Sorry, You Cannot add more than ${quantity} items`)

                                    toast.error(
                                      `Sorry, You Cannot add more than ${quantity} items`,
                                      {
                                        position: "bottom-right",
                                        autoClose: 1000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                      }
                                    );

                                    item.qty = item.qty - 1;

                                    return item;
                                  } else {
                                    return item;
                                  }
                                } else {
                                  if (
                                    filter[0].qty < value?.min_order_quantity
                                  ) {
                                    return item;
                                  } else if (filter[0].qty >= quantity) {
                                    // message.error(`Sorry, You Cannot add more than ${quantity} items`)

                                    toast.error(
                                      `Sorry, You Cannot add more than ${quantity} items`,
                                      {
                                        position: "bottom-right",
                                        autoClose: 1000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                      }
                                    );

                                    item.qty = item.qty - 1;

                                    return item;
                                  } else {
                                    return item;
                                  }
                                }
                              } else {
                                // message.error('Sorry, You Cannot add more items')

                                toast.error(
                                  "Sorry, You Cannot add more items",
                                  {
                                    position: "bottom-right",
                                    autoClose: 1000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                  }
                                );
                              }
                            }
                          }
                        } else {
                          if (initialState.data) {
                            let quantity;
                            console.log("itemsms", item);
                            if (initialState.data.item_id == item.item_id) {
                              if (item.inventoryDetails == null) {
                                // addToCart(item)
                                console.log("");
                                quantity = 15;
                                // if(maxmin)
                              } else if (
                                item.inventoryDetails.inventory_quantity == 0
                              ) {
                                // message.error('Sorry,The Item is not available at the moment')
                                quantity = 0;
                              } else if (
                                item.inventoryDetails.inventory_quantity != 0
                              ) {
                                if (
                                  item.inventoryDetails.inventory_quantity >
                                  item.inventoryDetails?.max_order_quantity && item.inventoryDetails
                                  ?.max_order_quantity!=null 
                                ) {
                                  quantity =
                                    item.inventoryDetails?.max_order_quantity;
                                } else if (
                                  item.inventoryDetails.inventory_quantity <
                                  item.inventoryDetails.min_order_quantity
                                ) {
                                  // message.error('Sorry,The Item is not available at the moment')
                                  quantity =
                                    item.inventoryDetails.inventory_quantity;
                                } else {
                                  quantity =
                                    item.inventoryDetails?.inventory_quantity;
                                }
                                // }
                              }

                              if (quantity > 0) {
                                const filter = cart.filter((c) => {
                                  if (c.item_id == item.item_id) {
                                    return c;
                                  }
                                });

                                if (
                                  item.inventoryDetails.inventory_quantity <
                                  item.inventoryDetails.min_order_quantity
                                ) {
                                  if (
                                    filter[0].qty <
                                    item.inventoryDetails.inventory_quantity
                                  ) {
                                    return item;
                                  } else if (filter[0].qty >= quantity) {
                                    // message.error(`Sorry, You Cannot add more than ${quantity} items`)

                                    toast.error(
                                      `Sorry, You Cannot add more than ${quantity} items`,
                                      {
                                        position: "bottom-right",
                                        autoClose: 1000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                      }
                                    );

                                    item.qty = item.qty - 1;

                                    return item;
                                  } else {
                                    return item;
                                  }
                                } else {
                                  if (
                                    filter[0].qty <
                                    item.inventoryDetails.min_order_quantity
                                  ) {
                                    return item;
                                  } else if (filter[0].qty >= quantity) {
                                    // message.error(`Sorry, You Cannot add more than ${quantity} items`)

                                    toast.error(
                                      `Sorry, You Cannot add more than ${quantity} items`,
                                      {
                                        position: "bottom-right",
                                        autoClose: 1000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                      }
                                    );

                                    item.qty = item.qty - 1;

                                    return item;
                                  } else {
                                    return item;
                                  }
                                }

                                // addToCart(item)
                                // return item
                              }
                              // else {
                              //     message.error('Sorry, You Cannot add more items')
                              // }
                              // item['store_name'] = storeDetails.data ? storeDetails.data.store_name : "";
                              // item['store_logo'] = storeDetails.data ? storeDetails.data.logo_img_url : "";
                            }
                          }

                          // else if (item.item_id == id) {
                          //     return item
                          // }
                        }
                      }).qty + 1
                    )
                  }
                  className={`px-4 py-2 text-xl cursor-pointer`}
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
                  <PlusOutlined />
                </span>
              </div>
            )}

            {/* 
                            <div className="text-emerald-500 py-2 px-2 border border-slate-300 text-sm cursor-pointer flex items-center"><HeartOutlined /><span className="px-2">Add to Wishlist</span></div> 
                            */}
          </div>
        ) : (
          ""
        )}
      </div>

      <ToastContainer />
      <LoginModal
        visible={visible}
        setVisible={setVisible}
        showModal={showModal}
      />

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
        {!showCustomItemData ? (
          // =================================================================== 1ST MODAL ====================================================================//

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

            {/* {Object.keys(addons1).map((mapId, index) => {
              const item = addons1[mapId]; */}


             {initialState?.addons && Object.keys(initialState?.addons).map((mapId, index) => {
                const item = initialState?.addons[mapId]; 

              return (
                <div className="px-12 py-2">
                  <p className="text-black font-montMedium ">
                    {item.add_on_title}
                    {item.mandatory ? (
                      <span className="font-montSemiBold text-red-600 px-2">
                        *
                      </span>
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
                                  {storeDetails?.currency_symbol} {value.price}
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
                      onChange={(e) => {
                        handleAddonInstructions(
                          e,
                          item.add_on_group_id,
                          item.add_on_title,
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
                  storeSettings.data
                    ? storeSettings.data.secondary_color
                    : "black"
                }`,
              }}
              onClick={


                
                addonsAdded.filter(
                  (item) => item.add_on_group_type === "CHECKLIST"
                )?.length <  addonsAdded.find(
                    (item) => item=='CHECKLIST'
                  )?.min_qty
                  ? () => {
                      message.error("addons should be more than 1");
                    }
                  : 
                  handleConfirmAddons
              }
            >
              Confirm
              <span className="pl-12">
                {" "}
                {storeDetails?.currency_symbol} {priceWithAddon}
              </span>
            </button>
          </div>
        ) : (
          // =================================================================== 2nd MODAL ====================================================================//
          <div className="p-16">
            {initialState.variants?.length > 0
              ? customItemData?.addons
                  ?.filter((item) => variantFilter(item))
                  .map((itemMap) => {
                    return (
                      <div className="py-2 w-full flex item-center  flex-col">
                        <div>
                          <div>
                            {/* ----------------------------------------------------------- INCREMENT AND DECREMENT BUTTONS ---------------------------------------------------- */}

                            <IncreDecrButton
                              storeSettings={storeSettings}
                              decrAddQty={decrAddQty}
                              incrAddQty={incrAddQty}
                              uId={itemMap.id}
                              rgbaBackground={rgbaBackground}
                              addQty={itemMap.qty}
                              rgbaColor={rgbaColor}
                              item_name={customItemData.item_name}
                            />

                            {customItemData?.defaultVariantItem ? (
                              <p className="font-montMedium px-4 -mt-6">
                                {
                                  customItemData?.defaultVariantItem
                                    ?.variant_value_1?.variant_group_name
                                }
                                :{" "}
                                {
                                  customItemData?.defaultVariantItem
                                    ?.variant_value_1?.variant_value_name
                                }
                                ,{" "}
                                {
                                  customItemData?.defaultVariantItem
                                    ?.variant_value_2?.variant_group_name
                                }
                                :{" "}
                                {
                                  customItemData?.defaultVariantItem
                                    ?.variant_value_2?.variant_value_name
                                }{" "}
                                {itemMap?.variant_value_name}
                              </p>
                            ) : (
                              ""
                            )}
                            {/* --------------------------------------------------- Addons Lists ------------------------------------------------ */}

                            <div
                              className="flex flex-col pl-4 mt-4"
                              style={{ width: "100%" }}
                            >
                              <p className="pl-4 -mt-3"></p>
                              {(() => {
                                const newVar = groupBy(
                                  itemMap?.addons || [],
                                  "add_on_title"
                                );
                                return Object.keys(newVar).map(
                                  (item, index) => {
                                    const addons = newVar[item];

                                    return (
                                      <div className="flex w-100">
                                        <p className="font-montMedium px-1 -mt-3">
                                          {item}:
                                        </p>
                                        {addons.map((addon, num) => {
                                          return (
                                            <p className="font-montRegular px-1 -mt-3">
                                              {addon.add_on_name
                                                ? addon.add_on_name
                                                : addon.text}
                                              ,
                                            </p>
                                          );
                                        })}
                                      </div>
                                    );
                                    // })
                                  }
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
              : (customItemData?.addons || []).map((itemMap) => {
                  return (
                    <div className="py-2 w-full flex item-center  flex-col">
                      <div>
                        <div>
                          {/* ----------------------------------------------------------- INCREMENT AND DECREMENT BUTTONS ---------------------------------------------------- */}

                          <IncreDecrButton
                            storeSettings={storeSettings}
                            decrAddQty={decrAddQty}
                            incrAddQty={incrAddQty}
                            uId={itemMap.id}
                            rgbaBackground={rgbaBackground}
                            addQty={itemMap.qty}
                            rgbaColor={rgbaColor}
                            item_name={customItemData.item_name}
                          />

                          {customItemData?.defaultVariantItem ? (
                            <p className="font-montMedium px-4 -mt-6">
                              {
                                customItemData?.defaultVariantItem
                                  ?.variant_value_1?.variant_group_name
                              }
                              :{" "}
                              {
                                customItemData?.defaultVariantItem
                                  ?.variant_value_1?.variant_value_name
                              }
                              ,{" "}
                              {
                                customItemData?.defaultVariantItem
                                  ?.variant_value_2?.variant_group_name
                              }
                              :{" "}
                              {
                                customItemData?.defaultVariantItem
                                  ?.variant_value_2?.variant_value_name
                              }{" "}
                            </p>
                          ) : (
                            ""
                          )}
                          {/* --------------------------------------------------- Addons Lists ------------------------------------------------ */}

                          <div
                            className="flex flex-col pl-4 mt-4"
                            style={{ width: "100%" }}
                          >
                            <p className="pl-4 -mt-3"></p>
                            {(() => {
                              const newVar = groupBy(
                                itemMap?.addons || [],
                                "add_on_title"
                              );
                              return Object.keys(newVar).map((item, index) => {
                                const addons = newVar[item];

                                return (
                                  <div className="flex w-100">
                                    <p className="font-montMedium px-1 -mt-3">
                                      {item}:
                                    </p>
                                    {addons.map((addon, num) => {
                                      return (
                                        <p className="font-montRegular px-1 -mt-3">
                                          {addon.add_on_name
                                            ? addon.add_on_name
                                            : addon.text}
                                          ,
                                        </p>
                                      );
                                    })}
                                  </div>
                                );
                                // })
                              });
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

            <div className="flex items-center mt-8  justify-center w">
              <button
                className="px-10 mx-2 py-2 self-center "
                style={{
                  color: `${
                    storeSettings.data
                      ? storeSettings.data.navbar_color
                      : "white"
                  }`,
                  backgroundColor: `${
                    storeSettings.data
                      ? storeSettings.data.secondary_color
                      : "black"
                  }`,
                }}
                onClick={updateCartRecordafter}
              >
                Confirm
              </button>

              <button
                className="px-10 py-2 self-center "
                style={{
                  color: `${
                    storeSettings.data
                      ? storeSettings.data.navbar_color
                      : "white"
                  }`,
                  backgroundColor: `${
                    storeSettings.data
                      ? storeSettings.data.secondary_color
                      : "black"
                  }`,
                }}
                onClick={() => {
                  setShowCustomItemData(false);
                }}
              >
                I'll Choose
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  ) : (
    <div className="flex justify-center items-center bg-white h-screen">
      {/* <Spin size="large" /> */}

      <lottie-player
        id="firstLottie"
        ref={ref}
        autoplay
        loop
        mode="normal"
        src="/loader.json"
        style={{ width: "100px", height: "100px" }}
      ></lottie-player>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    initialState: state.itemDetailsReducer,
    stateCustomerDetails: state.customerDetailsReducer,
    cart: state.cartReducer.cart,
    storeSettings: state.storeSettingsReducer,
    storeDetails: state.storeDetailsReducer?.data,
    stateWishlistItems: state.wishlistDetailsReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (itemid) => dispatch(removeFromCart(itemid)),
    fetchItemDetails: (customerId, itemId) =>
      dispatch(fetchItemDetails(customerId, itemId)),
    fetchVariants: (id) => dispatch(fetchVariants(id)),
    fetchAddons: (payload) => dispatch(fetchAddons(payload)),
    fetchSpecification: (id) => dispatch(fetchSpecification(id)),
    fetchAdditionalInfo: (id) => dispatch(fetchAdditionalInfo(id)),
    fetchRelatedItems: (id) => dispatch(fetchRelatedItems(id)),
    addToCart: (data) => dispatch(addToCart(data)),
    addBulkItemToCart: (data) => dispatch(addBulkCart(data)),
    adjustQty: (itemid, value) => dispatch(adjustQty(itemid, value)),
    dispatchSearchItems: (query) => dispatch(searchItems(query)),
    getStoreDetails: (storeId) => dispatch(getStoreDetails(storeId)),
    setVariantImages: (data) => dispatch(setVariantImages(data)),
    setDefaultItem: (data) => dispatch(setDefaultItem(data)),
    dispatchWishlist: (payload) => dispatch(getWishlistItems(payload)),
    dispatchAddAddon: (payload) => dispatch(addAddon(payload)),
    dispatchDecreaseAddon: (payload) => dispatch(decreaseAddon(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(Index));
