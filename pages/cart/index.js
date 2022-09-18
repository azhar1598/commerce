import {
    ArrowLeftOutlined,
    CloseOutlined,
    LeftOutlined,
    LeftSquareOutlined,
    LoadingOutlined,
    SyncOutlined,
  } from "@ant-design/icons";
  import { Checkbox, message, Modal, Spin } from "antd";
  import PropTypes from "prop-types";
  import React, { useEffect, useState } from "react";
  import { connect } from "react-redux";
  import {
    addToCart,
    adjustQty,
    convenienceCharges,
    fetchBackendCart,
    fetchItemDetails,
    fetchPurchaseDetails,
    getStoreDetails,
    getStoreDisplaySettings,
    removeFromCart,
    setParcelAction,
    updateCart,
  } from "../../actions";
  import Billing from "../../components/Billing";
  import Coupon from "../../components/Coupon";
  import { useRouter } from "next/router";
  import EmptyCart from "../../components/svgComponents/EmptyCart";
  import Head from "next/head";
  import PageWrapper from "../../components/PageWrapper/PageWrapper";
  import { useMediaQuery } from "react-responsive";
  import { toast, ToastContainer } from "react-toastify";
  import { convenienceFlag } from "../../services/apiServices";
  import TextArea from "antd/lib/input/TextArea";
  import { isEmpty } from "@firebase/util";
  
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
  
  const Index = ({
    storeSettings,
    addToCart,
    removeFromCart,
    adjustQty,
    cart,
    checkout,
    fetchBackendCart,
    fetchPurchaseDetails,
    customerDetails,
    stateStoreDetails,
    dispatchStoreDisplaySettings,
    fetchItemDetails,
    setParcelAction,
    convenienceChargesAction,
    getStoreDetails,
    updateCartAddons,
  }) => {
    const [state, setState] = useState(checkout.backendCart?.purchase_id);
    const [datas, setDatas] = useState([]);
    const [validCoupon, setValidCoupon] = useState(false);
    const [loading, setLoading] = useState(false);
    const [addonCombination, setAddonCombination] = useState([]);
    const [enableBulkAPI, setEnableBulkAPI] = useState(true);
    const [purchaseInvalid, setPurchaseInvalid] = useState("");
    const [minQtyMsg, setMinQtyMsg] = useState(false);
    const [minProduct, setMinProduct] = useState();
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  
    const [cartUpdate, setCartUpdate] = useState(false);
    const [selectedCartItem, setSelectedCartItem] = useState({});
  
    const [rgbaBackground, setRgbaBackground] = useState("");
    const [rgbaColor, setRgbaColor] = useState();
  
    const [showEditAddon, setShowEditAddon] = useState(false);
    const [addonsData, setAddonsData] = useState({
      "3ebb31825aea7b4fb8c9f8065eb4bbda": {
        item_id: 12345,
        add_on_title: "Toppings on the Pizza",
        add_on_description: "Select min of 2 and max of 5",
        variant_group_id: 3340,
        variant_value_id: 7064,
        status: "ACTIVE",
        entry_id: 35,
        add_on_group_id: 12,
        add_on_group_type: "CHEKLIST",
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
  
    const [addonSelected, setAddonSelected] = useState();
  
    const [addonInstructions, setAddonInstructions] = useState();
  
    const router = useRouter();
  
    useEffect(() => {
      checkout.backendCart?.purchase_id &&
        setParcelAction(checkout.backendCart?.purchase_id);
    }, []);
  
    // useEffect(() => {
    // if (customerDetails.data?.customer_id && cart.length != 0) {
    //     const data = readyCartData(cart)
    //     setDatas(data)
    //     if (data && cart.length != 0) {
  
    //         console.log('carttt',cart)
  
    // if (checkout.backendCart?.purchase_id || state) {
    if (state) {
      // fetchPurchaseDetails(checkout.backendCart?.purchase_id)
    }
    // }
    // else {
    //     fetchBackendCart(customerDetails?.data?.customer_id, 'storeDetails.group_id', checkout.backendCart?.purchase_id, data, checkout)
    // }
    //     }
    // }
    // deliveryAddress()
  
    // }, [cart, datas.length == 0, customerDetails,validCoupon==true])
  
    useEffect(() => {
      if (customerDetails.data?.customer_id && cart.length != 0) {
        const data = readyCartData(cart);
        setDatas(data);
        if (data && cart.length != 0) {
          console.log("carttt", cart);
  
          // if(!validCoupon){
  
          fetchBackendCart(
            customerDetails?.data?.customer_id,
            "storeDetails.group_id",
            checkout.backendCart?.purchase_id,
            data
          );
          setEnableBulkAPI(false);
  
          // }
          // else{
          //     state && fetchPurchaseDetails(checkout.backendCart?.purchase_id)
          // }
        }
      }
      deliveryAddress();
    }, [cart, customerDetails, cartUpdate]);
  
    useEffect(() => {
      cart.map((item) => {
        console.log(
          "mappingitem",
          item,
          item.inventoryDetails?.min_order_quantity > item.qty
        );
        if (item.defaultVariantItem) {
          if (
            item?.defaultVariantItem.inventory_details?.min_order_quantity >
            item?.defaultVariantItem?.inventory_details?.inventory_quantity
          ) {
            if (
              item.defaultVariantItem?.inventory_details?.inventory_quantity >
              item.qty
            ) {
              setMinQtyMsg(true);
              setMinProduct(item.item_name);
              console.log("mapping");
            }
          } else {
            if (
              item.defaultVariantItem?.inventory_details?.min_order_quantity >
              item.qty
            ) {
              setMinQtyMsg(true);
              setMinProduct(item.item_name);
              console.log("mapping");
            }
          }
        } else {
          if (
            item?.inventoryDetails?.min_order_quantity >
            item?.inventoryDetails?.inventory_quantity
          ) {
            if (item?.inventoryDetails?.inventory_quantity > item.qty) {
              setMinQtyMsg(true);
              setMinProduct(item.item_name);
              console.log("mapping");
            }
          } else {
            if (item?.inventoryDetails?.min_order_quantity > item.qty) {
              setMinQtyMsg(true);
              setMinProduct(item.item_name);
              console.log("mapping");
            }
          }
          // else {
          // setMinQtyMsg(false)
          // }
        }
      });
    }, [cart, cartUpdate]);
  
    useEffect(() => {
      if (checkout.backendCart?.purchase_id && !enableBulkAPI) {
        fetchPurchaseDetails(checkout.backendCart?.purchase_id, setLoading);
      }
    }, [validCoupon]);
  
    // useEffect(()=>{
  
    //     if (checkout.backendCart?.purchase_id && !checkout.purchaseDetails?.data.isPurchaseValid) {
  
    //         cart.map((item, idx) =>{
  
    //         Object.keys(checkout.purchaseDetails.data.orders).map(c => {
  
    //             // console.log('checkout .', c)
    //             console.log('checkout.purchaseDetails.data.orders[c]', checkout.purchaseDetails.data.orders[c].isOrderValid, checkout.purchaseDetails.data.orders[c].orderItems)
    //             if (!checkout.purchaseDetails.data.orders[c].isOrderValid) {
    //                 console.log('checkout.pur', checkout.purchaseDetails.data.orders[c].isOrderValid == 'false')
    //                 Object.keys(checkout.purchaseDetails.data.orders[c].orderItems).map(a => {
    //                     if (checkout.purchaseDetails.data.orders[c].orderItems[a].itemQuantity<item.qty) {
  
    //                         adjustQty(item.item_id, checkout.purchaseDetails.data.orders[c].orderItems[a].itemQuantity)
  
    //                         console.log('checkout.purchaseDetails.data.orders[c]', checkout.purchaseDetails.data.orders[c].orderItems[a].isOrderItemValid)
    //                         setPurchaseInvalid(`Please remove ${checkout.purchaseDetails.data.orders[c].orderItems[a].itemName}.Currently,it is out of stock`)
    //                         // message.error(`Please remove ${checkout.purchaseDetails.data.orders[c].orderItems[a].itemName}.Currently,it is out of stock`)
  
    //                         // toast.error(`Please remove ${checkout.purchaseDetails.data.orders[c].orderItems[a].itemName}.Currently,it is out of stock`, {
    //                         //     position: "bottom-right",
    //                         //     autoClose: 1000,
    //                         //     hideProgressBar: false,
    //                         //     closeOnClick: true,
    //                         //     pauseOnHover: true,
    //                         //     draggable: true,
    //                         //     progress: undefined,
    //                         // });
  
    //                     }
    //                 })
    //             }
    //         }
  
    //         )
    //     })
  
    //     } else {
    //         setPurchaseInvalid('')
    //     }
  
    // },[])
  
    useEffect(() => {
      console.log(
        "!checkout.purchaseDetails.data.isPurchaseValid),",
        !checkout.purchaseDetails?.data.isPurchaseValid
      );
  
      if (
        checkout.backendCart?.purchase_id &&
        !checkout.purchaseDetails?.data.isPurchaseValid
      ) {
        Object.keys(checkout.purchaseDetails.data.orders).map((c) => {
          // console.log('checkout .', c)
          console.log(
            "checkout.purchaseDetails.data.orders[c]",
            checkout.purchaseDetails.data.orders[c].isOrderValid,
            checkout.purchaseDetails.data.orders[c].orderItems
          );
          if (!checkout.purchaseDetails.data.orders[c].isOrderValid) {
            console.log(
              "checkout.pur",
              checkout.purchaseDetails.data.orders[c].isOrderValid == "false"
            );
            Object.keys(checkout.purchaseDetails.data.orders[c].orderItems).map(
              (a) => {
                if (
                  !checkout.purchaseDetails.data.orders[c].orderItems[a]
                    .isOrderItemValid
                ) {
                  console.log(
                    "checkout.purchaseDetails.data.orders[c]",
                    checkout.purchaseDetails.data.orders[c].orderItems[a]
                      .isOrderItemValid
                  );
                  setPurchaseInvalid(
                    `Please remove ${checkout.purchaseDetails.data.orders[c].orderItems[a].itemName}.Currently,it is out of stock`
                  );
                  // message.error(`Please remove ${checkout.purchaseDetails.data.orders[c].orderItems[a].itemName}.Currently,it is out of stock`)
  
                  toast.error(
                    `Please remove ${checkout.purchaseDetails.data.orders[c].orderItems[a].itemName}.Currently,it is out of stock`,
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
            );
          }
        });
      } else {
        setPurchaseInvalid("");
      }
    }, [checkout.purchaseDetails]);
  
    const deliveryAddress = async () => {};
  
    const handleDecreaseQuantity = (item, qty) => {
      const data = readyCartData(cart);
      // item.defaultVariantItem ? item.defaultVariantItem : item.item_id
      if (item?.addons) {
        let selectedAddon;
        let selectedProduct = cart.find((product) => {
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
      } else {
        if (item.defaultVariantItem) {
          const filter = cart.filter((c) => {
            if (
              c.defaultVariantItem?.variant_item_id ==
              item.defaultVariantItem.variant_item_id
            ) {
              return c;
            }
          });
  
          // important
          if (qty == 0) {
            removeFromCart(Number(item.variant_item_id));
          } else {
            if (
              item.defaultVariantItem.inventory_details?.inventory_quantity <
              item.defaultVariantItem.inventory_details?.min_order_quantity
            ) {
              if (
                filter[0].qty <=
                item.defaultVariantItem.inventory_details?.inventory_quantity
              ) {
                // message.error(`Sorry, The Minimum Order Quantity is ${item.defaultVariantItem.inventory_details?.min_order_quantity}`)
  
                toast.error(
                  `Sorry, The Minimum Order Quantity is ${item.defaultVariantItem.inventory_details?.min_order_quantity}`,
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
  
                // setMinQtyMsg(true)
                setMinProduct(item.item_name);
              } else {
                adjustQty(item.defaultVariantItem.variant_item_id, qty);
                setMinQtyMsg(false);
              }
            } else {
              if (
                filter[0].qty <=
                item.defaultVariantItem.inventory_details?.min_order_quantity
              ) {
                // message.error(`Sorry, The Minimum Order Quantity is ${item.defaultVariantItem.inventory_details?.min_order_quantity}`)
  
                toast.error(
                  `Sorry, The Minimum Order Quantity is ${item.defaultVariantItem.inventory_details?.min_order_quantity}`,
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
  
                // setMinQtyMsg(true)
                setMinProduct(item.item_name);
              } else {
                console.log("qqtty", qty);
                adjustQty(item.defaultVariantItem.variant_item_id, qty);
                setMinQtyMsg(false);
              }
            }
          }
        } else {
          const filter = cart.filter((c) => {
            if (c.item_id == item.item_id) {
              return c;
            }
          });
  
          // important
          if (qty == 0) {
            removeFromCart(Number(item.item_id));
          } else {
            if (
              item.inventoryDetails?.inventory_quantity <
              item.inventoryDetails?.min_order_quantity
            ) {
              if (filter[0].qty <= item.inventoryDetails?.inventory_quantity) {
                // message.error(`Sorry, The Minimum Order Quantity is ${item.inventoryDetails?.inventory_quantity}`)
  
                toast.error(
                  `Sorry, The Minimum Order Quantity is ${item.inventoryDetails?.inventory_quantity}`,
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
  
                // setMinQtyMsg(true)
                setMinProduct(item.item_name);
              } else {
                adjustQty(item.item_id, qty);
                setMinQtyMsg(false);
              }
            } else {
              if (filter[0].qty <= item.inventoryDetails?.min_order_quantity) {
                // message.error(`Sorry, The Minimum Order Quantity is ${item.inventoryDetails?.min_order_quantity}`)
  
                toast.error(
                  `Sorry, The Minimum Order Quantity is ${item.inventoryDetails?.min_order_quantity}`,
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
  
                // setMinQtyMsg(true)
                setMinProduct(item.item_name);
              } else {
                adjustQty(item.item_id, qty);
                setMinQtyMsg(false);
              }
            }
          }
        }
      }
  
      // if (checkout.backendCart?.purchase_id || state) {
      //     fetchBackendCart(customerDetails?.data?.customer_id, 'storeDetails.group_id', checkout.backendCart?.purchase_id, data)
  
      // }
      // else {
      //     fetchBackendCart(customerDetails?.data?.customer_id, 'storeDetails.group_id', undefined, data)
  
      // }
  
      // fetchBackendCart('customerDetails.data?.customer_id,', 'storeDetails.group_id', data)
    };
  
    useEffect(() => {
      dispatchStoreDisplaySettings(stateStoreDetails?.store_id);
      getStoreDetails(stateStoreDetails?.store_id);
    }, []);
  
    useEffect(() => {
      const removeConvenience = async () => {
        convenienceChargesAction(checkout.backendCart?.purchase_id, "N");
      };
      checkout.backendCart?.purchase_id && removeConvenience();
    }, []);
  
    const readyCartData = function (arr) {
      const key = "store_id";
      return arr.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push({
          item_id: x.item_id,
          barcode_id: null,
          quantity: x.qty,
          variant_item_id: x.defaultVariantItem?.variant_item_id | null,
        });
        return rv;
      }, {});
    };
  
    const handleIncreaseQuantity = (item) => {
      console.log("itenmmmm", item);
      let selectedAddon;
      if (item?.addons) {
        let selectedProduct = cart.find((product) => {
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
  
        console.log("quantityyyy", quantity);
  
        let data = selectedProduct;
  
        data.addons = selectedProduct?.addons || [];
        data.qty = quantity;
  
        addToCart(data);
        setCartUpdate(!cartUpdate);
  
        console.log("selectedProducttt", selectedProduct);
      } else {
        if (item.defaultVariantItem) {
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
            quantity = value.inventory_quantity;
            console.log(
              "value?.inventory_quantity != null && value?.max_order_quantity == null"
            );
          } else if (value?.max_order_quantity > value?.inventory_quantity) {
            quantity = value.inventory_quantity;
            console.log("value?.max_order_quantity > value?.inventory_quantity");
          } else if (value?.max_order_quantity < value?.inventory_quantity) {
            quantity = value.max_order_quantity;
            console.log("value?.max_order_quantity < value?.inventory_quantity");
          }
  
          if (quantity > 0) {
            console.log("cartt", cart);
            const filter = cart.filter((c) => {
              if (
                c.defaultVariantItem?.variant_item_id ==
                item.defaultVariantItem.variant_item_id
              ) {
                return c;
              }
            });
            // console.log('fffilter', filter)
            // if (filter[0].qty >= quantity) {
            //     message.error(`Sorry, You Cannot add more than ${quantity} items`)
  
            //     // adjustQty(item.defaultVariantItem.variant_item_id, item.qty)
            // }
            // else {
            //     if (filter[0].qty + 1 >= item.defaultVariantItem.inventory_details?.min_order_quantity) {
            //         setMinQtyMsg(false)
            //     }
            //     adjustQty(item.defaultVariantItem.variant_item_id, item.qty + 1)
            // }
  
            if (
              item.defaultVariantItem.inventory_details?.inventory_quantity <
              item.defaultVariantItem.inventory_details?.min_order_quantity
            ) {
              if (
                filter[0].qty <
                item.item.defaultVariantItem.inventory_details?.inventory_quantity
              ) {
                adjustQty(item.defaultVariantItem.variant_item_id, item.qty + 1);
              }
  
              if (filter[0].qty >= quantity) {
                // message.error(`Sorry, You Cannot add more than ${quantity} items`)
  
                toast.error(`Sorry, You Cannot add more than ${quantity} items`, {
                  position: "bottom-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
  
                // adjustQty(item.item_id, item.qty)
              } else {
                console.log("filter[0].qty+1", filter[0].qty + 1);
                if (
                  filter[0].qty + 1 >=
                  item.defaultVariantItem.inventory_details?.inventory_quantity
                ) {
                  setMinQtyMsg(false);
                }
                adjustQty(item.defaultVariantItem.variant_item_id, item.qty + 1);
              }
            } else {
              if (
                filter[0].qty <
                item.defaultVariantItem.inventory_details?.min_order_quantity
              ) {
                adjustQty(item.defaultVariantItem.variant_item_id, item.qty + 1);
              }
  
              if (filter[0].qty >= quantity) {
                // message.error(`Sorry, You Cannot add more than ${quantity} items`)
  
                toast.error(`Sorry, You Cannot add more than ${quantity} items`, {
                  position: "bottom-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
  
                // adjustQty(item.item_id, item.qty)
              } else {
                console.log("filter[0].qty+1", filter[0].qty + 1);
                if (
                  filter[0].qty + 1 >=
                  item.defaultVariantItem.inventory_details?.min_order_quantity
                ) {
                  setMinQtyMsg(false);
                }
                adjustQty(item.defaultVariantItem.variant_item_id, item.qty + 1);
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
        } else {
          // item without variant
          console.log("item without variant", item);
  
          let quantity = 0;
          const value = item?.inventoryDetails;
  
          console.log("valuee", value);
          if (value != null) {
            if (value?.inventory_quantity == null) {
              if (value?.max_order_quantity == null) quantity = 15;
              else {
                quantity = value?.max_order_quantity;
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
              quantity = value.inventory_quantity;
              console.log(
                "value?.max_order_quantity > value?.inventory_quantity"
              );
            } else if (value?.max_order_quantity < value?.inventory_quantity) {
              quantity = value.max_order_quantity;
              console.log(
                "value?.max_order_quantity < value?.inventory_quantity"
              );
            }
          } else {
            quantity = 15;
          }
  
          if (quantity > 0) {
            console.log("cartt", cart);
            const filter = cart.filter((c) => {
              if (c.item_id == item.item_id) {
                return c;
              }
            });
  
            // important
  
            if (
              item.inventoryDetails?.inventory_quantity <
              item.inventoryDetails?.min_order_quantity
            ) {
              if (filter[0].qty < item.inventoryDetails.inventory_quantity) {
                adjustQty(item.item_id, item.qty + 1);
              }
  
              if (filter[0].qty >= quantity) {
                // message.error(`Sorry, You Cannot add more than ${quantity} items`)
  
                toast.error(`Sorry, You Cannot add more than ${quantity} items`, {
                  position: "bottom-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
  
                // adjustQty(item.item_id, item.qty)
              } else {
                console.log("filter[0].qty+1", filter[0].qty + 1);
                if (
                  filter[0].qty + 1 >=
                  item.inventoryDetails?.inventory_quantity
                ) {
                  setMinQtyMsg(false);
                }
                adjustQty(item.item_id, item.qty + 1);
              }
            } else {
              if (filter[0].qty < item.inventoryDetails?.min_order_quantity) {
                adjustQty(item.item_id, item.qty + 1);
              }
  
              if (filter[0].qty >= quantity) {
                // message.error(`Sorry, You Cannot add more than ${quantity} items`)
  
                toast.error(`Sorry, You Cannot add more than ${quantity} items`, {
                  position: "bottom-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
  
                // adjustQty(item.item_id, item.qty)
              } else {
                console.log("filter[0].qty+1", filter[0].qty + 1);
                if (
                  filter[0].qty + 1 >=
                  item.inventoryDetails?.min_order_quantity
                ) {
                  setMinQtyMsg(false);
                }
                adjustQty(item.item_id, item.qty + 1);
              }
            }
          } else {
            // message.error('Sorry, You cannot add more items')
  
            toast.error("Sorry, You cannot add more items", {
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
    };
  
    const hex2rgba = (hex, alpha = 1) => {
      const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
      return `rgba(${r},${g},${b},${alpha})`;
    };
  
    useEffect(() => {
      setRgbaBackground(
        hex2rgba(
          storeSettings.data ? storeSettings.data.secondary_color : "#ffffff",
          0.1
        )
      );
      setRgbaColor(
        hex2rgba(
          storeSettings.data ? storeSettings.data.navbar_color : "#000000",
          1
        )
      );
      // setCustomBorder(hex2rgba('#212B36' , 0.25))
    }, [rgbaBackground == ""]);
  
    const editAddonModal = (addon, cartItem) => {
      ;
      setShowEditAddon(true);
      setSelectedCartItem(cartItem);
      setAddonSelected(addon);
      setAddonCombination(addon?.addons);
      // setAddonsAdded();
    };
  
    const handleAddonCancel = () => {
      setShowEditAddon(false);
    };
  
    const handleAddonClose = () => {};
  
    const handleAddonOk = () => {};
  
    const handleAddonChange = (e) => {
      let selectedaddon;
  
      ;
  
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
      ;
  
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
  
        ;
  
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
      ;
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
  
      setSelectedCartItem(item);
  
      // ;
      ;
      addToCart(item);
  
      setShowEditAddon(false);
    };
  
    console.log(
      "addons>>>>>>>>>",
      addonSelected,
      " addoncombination >>>>>>>>>",
      addonCombination,
      "cartitem>>>>>>>",
      selectedCartItem
    );
  
    return (
      <>
        {/* <Head>
                  <title>{stateStoreDetails ? stateStoreDetails?.store_name : 'Apparel Store'}</title>
                  <meta name="description" content="Generated by create next app" />
                  <link rel="icon" href={stateStoreDetails ? stateStoreDetails?.logo_img_url : 'favicon.ico'} />
              </Head> */}
  
        {cart.length != 0 ? (
          <div className="lg:bg-[#F6F6F6] lg:mt-24 md:-mt-4 lg:h-full md:h-screen flex flex-col lg:flex-row md:flex-row items-start lg:p-2 md:p-2 lg:min-h-screen">
            <div className="mt-20 lg:mt-16 md:mt-4 flex flex-col items-start justify-between  lg:ml-24 lg:mr-24 md:ml-24 md:mr-24 w-full lg:w-[50vw] lg:border-b-2 lg:border-slate-[200] cursor-pointer mb-24 lg:mb-0 bg-white">
              <p className="hidden lg:block md:block font-montBold text-2xl py-6 px-5">
                Cart
                <span className="text-gray-500 font-montSemiBold text-lg px-3">
                  {cart.length} {cart.length > 1 ? "items" : "item"}
                </span>
              </p>
  
              <div className="lg:hidden px-5 flex items-start border-b-2 border-slate-200 w-full mb-2">
                <LeftOutlined className="mt-2 pr-2" />
  
                <p className=" lg:hidden font-montBold text-lg mt-1 ">
                  Cart{" "}
                  <span className="text-gray-500 font-montMedium text-sm px-3">
                    {cart.length} {cart.length > 1 ? "items" : "item"}
                  </span>
                </p>
              </div>
  
              <div className="hidden lg:flex flex-col bg-white w-full justify-between items-start px-5 lg:mb-12">
                {cart.map((item, idx) =>
                  item.addons ? (
                    <>
                      {item.addons.map((addon, index) => (
                        <div
                          className="flex items-start text-left w-full border-2 border-slate-300 mb-2 rounded lg:pl-8 px-3 pb-2 md:pl-8 lg: md:pt-3"
                          key={idx}
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
                                fetchItemDetails("", "");
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
                                        storeSettings.data
                                          ? rgbaBackground
                                          : "black"
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
                                    {addon.qty}
                                  </span>
  
                                  <span
                                    onClick={() => {
                                      handleIncreaseQuantity(addon);
                                    }}
                                    className={`px-4  text-xl cursor-pointer py-1`}
                                    style={{
                                      backgroundColor: `${
                                        storeSettings.data
                                          ? rgbaBackground
                                          : "black"
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
                                  fetchItemDetails("", "");
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
                            {item.defaultVariantItem ? (
                              <p className="text-sm font-montSemiBold -mt-4">
                                <span className="text-gray-500">
                                  {item.defaultVariantItem
                                    ? `${item.defaultVariantItem.variant_value_1?.variant_group_name}:`
                                    : ""}
                                </span>{" "}
                                {item.defaultVariantItem
                                  ? item.defaultVariantItem.variant_value_1
                                      ?.variant_value_name
                                  : ""}
                                <span className="text-gray-500">
                                  {item.defaultVariantItem
                                    ? `${
                                        item.defaultVariantItem.variant_value_2
                                          ?.variant_group_name
                                          ? `, ${item.defaultVariantItem.variant_value_2?.variant_group_name}:`
                                          : ""
                                      }`
                                    : ""}
                                </span>{" "}
                                {item.defaultVariantItem
                                  ? item.defaultVariantItem.variant_value_2
                                      ?.variant_value_name
                                  : ""}
                                <span className="text-black-500">
                                  {item.defaultVariantItem
                                    ? `${
                                        item.defaultVariantItem.variant_value_3
                                          ?.variant_group_name
                                          ? `, ${item.defaultVariantItem.variant_value_3?.variant_group_name}:`
                                          : ""
                                      }`
                                    : ""}
                                </span>{" "}
                                {item.defaultVariantItem
                                  ? item.defaultVariantItem.variant_value_3
                                      ?.variant_value_name
                                  : ""}
                              </p>
                            ) : (
                              ""
                            )}
  
                            {(() => {
                              const newVar = groupBy(
                                addon?.addons || [],
                                "add_on_title"
                              );
                              console.log("grooooo", newVar);
                              return Object.keys(newVar).map((item, index) => {
                                const addons = newVar[item];
                                ;
                                if (
                                  item == "Cooking Instructions" &&
                                  isEmpty(addons[0]["text"])
                                ) {
                                  return "";
                                } else
                                  return (
                                    <div className="flex ">
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
  
                            <p className="text-[#212B3680] hidden">
                              {item.item_desc}
                            </p>
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
  
                          <CloseOutlined
                            className="p-4"
                            onClick={() =>
                              removeFromCart(
                                item.defaultVariantItem
                                  ? item.defaultVariantItem.variant_item_id
                                  : item.item_id
                              )
                            }
                          />
                        </div>
                      ))}
                    </>
                  ) : (
                    <div
                      className="flex items-start text-left w-full border-2 border-slate-300 mb-2 rounded lg:pl-8 px-3 pb-2 md:pl-8 lg: md:pt-3"
                      key={idx}
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
                            fetchItemDetails("", "");
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
                                onClick={() =>
                                  handleDecreaseQuantity(item, item.qty - 1)
                                }
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
                                {item.qty}
                              </span>
  
                              <span
                                onClick={() => {
                                  handleIncreaseQuantity(item);
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
                        <p
                          className="text-lg font-montSemiBold "
                          onClick={() => {
                            fetchItemDetails("", "");
                            router.push(`/product/${item.item_id}`);
                          }}
                        >
                          {item.item_name}
                        </p>
  
                        {item.defaultVariantItem ? (
                          <p className="text-sm font-montSemiBold -mt-4">
                            <span className="text-gray-500">
                              {item.defaultVariantItem
                                ? `${item.defaultVariantItem.variant_value_1?.variant_group_name}:`
                                : ""}
                            </span>{" "}
                            {item.defaultVariantItem
                              ? item.defaultVariantItem.variant_value_1
                                  ?.variant_value_name
                              : ""}
                            <span className="text-gray-500">
                              {item.defaultVariantItem
                                ? `${
                                    item.defaultVariantItem.variant_value_2
                                      ?.variant_group_name
                                      ? `, ${item.defaultVariantItem.variant_value_2?.variant_group_name}:`
                                      : ""
                                  }`
                                : ""}
                            </span>{" "}
                            {item.defaultVariantItem
                              ? item.defaultVariantItem.variant_value_2
                                  ?.variant_value_name
                              : ""}
                            <span className="text-black-500">
                              {item.defaultVariantItem
                                ? `${
                                    item.defaultVariantItem.variant_value_3
                                      ?.variant_group_name
                                      ? `, ${item.defaultVariantItem.variant_value_3?.variant_group_name}:`
                                      : ""
                                  }`
                                : ""}
                            </span>{" "}
                            {item.defaultVariantItem
                              ? item.defaultVariantItem.variant_value_3
                                  ?.variant_value_name
                              : ""}
                          </p>
                        ) : (
                          ""
                        )}
  
                        <p className="text-[#212B3680] hidden">
                          {item.item_desc}
                        </p>
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
  
                      <CloseOutlined
                        className="p-4"
                        onClick={() =>
                          removeFromCart(
                            item.defaultVariantItem
                              ? item.defaultVariantItem.variant_item_id
                              : item.item_id
                          )
                        }
                      />
                    </div>
                  )
                )}
              </div>
  
              <div className=" lg:hidden flex  flex-col w-full justify-between items-start  lg:mb-12">
                {cart.map((item, idx) => (
                  <div
                    className="flex items-start text-left w-full border-b-2 border-slate-300 mb-2 rounded  pb-2 : md:pt-3"
                    key={idx}
                  >
                    <div className="flex flex-col px-2 item-center">
                      <img
                        src={
                          item?.primary_img
                            ? item?.primary_img
                            : "https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png"
                        }
                        className="w-72 min-w-72 max-w-72 h-36 border border-blue-100 shadow "
                        onClick={() => {
                          fetchItemDetails("", "");
                          router.push(`/product/${item.item_id}`);
                        }}
                      />
                    </div>
                    <div className="flex flex-col items-start w-full ml-3 lg:ml-24 md:ml-24">
                      <div className="flex">
                        {item.is_veg == "Y" ? (
                          <img src="/veg.svg" className=" w-4 h-4 mt-1 mr-2" />
                        ) : (
                          <img src="/non-veg.png" className="w-4 h-4 mt-1 mr-2" />
                        )}
                        <p
                          className="text-sm font-montMedium flex item-city"
                          onClick={() => {
                            fetchItemDetails("", "");
                            router.push(`/product/${item.item_id}`);
                          }}
                        >
                          {item.item_name}
                        </p>
                      </div>
                      {item.defaultVariantItem ? (
                        <p className="text-sm font-montSemiBold -mt-4">
                          <span className="text-gray-500">Color:</span>{" "}
                          {item.defaultVariantItem
                            ? item.defaultVariantItem.variant_value_1
                                ?.variant_value_name
                            : ""}
                          ,<span className="text-gray-500">Size:</span>{" "}
                          {item.defaultVariantItem
                            ? item.defaultVariantItem.variant_value_2
                                ?.variant_value_name
                            : ""}
                          <span className="text-black-500">
                            {" "}
                            {item.defaultVariantItem.variant_value_3
                              ?.variant_value_name
                              ? ", Design No"
                              : ""}
                          </span>{" "}
                          {item.defaultVariantItem
                            ? item.defaultVariantItem.variant_value_3
                                ?.variant_value_name
                            : "No Design No"}
                        </p>
                      ) : (
                        ""
                      )}
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
  
                      {checkout.backendCart?.purchase_id != undefined ||
                      Object.keys(checkout).length == 0 ? (
                        <div className="flex -mt-5  gap-4 mt-5 ">
                          <div
                            className="border border-gray-400 space-x-4 mb-2 w-40 ml-2 flex items-center rounded"
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
                                handleDecreaseQuantity(item, item.qty - 1)
                              }
                              className={`px-6   py-1 text-xl cursor-pointer`}
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
                              {item.qty}
                            </span>
  
                            <span
                              onClick={() => {
                                handleIncreaseQuantity(item);
                              }}
                              className={`px-6  text-xl cursor-pointer py-1`}
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
                    <CloseOutlined
                      className="p-4"
                      onClick={() =>
                        removeFromCart(
                          item.defaultVariantItem
                            ? item.defaultVariantItem.variant_item_id
                            : item.item_id
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className=" lg:block md:block mt-16  lg:ml-16 w-96">
              <Coupon
                storeSettings={storeSettings}
                validCoupon={validCoupon}
                orderId={checkout.purchaseDetails?.data}
                setValidCoupon={setValidCoupon}
                purchaseInvalid={purchaseInvalid}
                billingDetails={checkout.purchaseDetails?.data}
              />
              <Billing
                className=""
                billingDetails={checkout.purchaseDetails?.data}
                checkout={checkout.backendCart?.purchase_id}
                review={false}
                shippingAdded={false}
                purchaseLoading={loading}
                purchaseInvalid={purchaseInvalid}
                minQtyMsg={minQtyMsg}
                minProduct={minProduct}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:mt-24 items-center justify-center p-24 ">
            {/* <img src="./images/undraw_empty_cart_co35.png" className='lg:h-80' /> */}
            <div className="hidden lg:block mb-8">
              <EmptyCart
                mobile={false}
                navbarColor={
                  storeSettings.data ? storeSettings.data.primary_color : "white"
                }
                secondaryColor={
                  storeSettings.data
                    ? storeSettings.data.secondary_color
                    : "white"
                }
              />
            </div>
            <div className="lg:hidden">
              <EmptyCart
                mobile={true}
                navbarColor={
                  storeSettings.data ? storeSettings.data.primary_color : "white"
                }
                secondaryColor={
                  storeSettings.data
                    ? storeSettings.data.secondary_color
                    : "white"
                }
              />
            </div>
  
            <p
              className="text-xl font-montSemiBold"
              style={{
                color: storeSettings.data
                  ? storeSettings.data.secondary_color
                  : "black",
              }}
            >
              Your Cart is Empty
            </p>
          </div>
        )}
        <ToastContainer />
  
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
              console.log("itemmmmmmmmm", item);
  
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
                    {item.add_on_group_type == "CHEKLIST"
                      ? item.add_on_description
                      : ""}
                  </p>
                  {item.add_on_group_type == "CHEKLIST" ? (
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
                                  {stateStoreDetails?.currency_symbol}{" "}
                                  {value.price}
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
                  storeSettings.data
                    ? storeSettings.data.secondary_color
                    : "black"
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
      </>
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
      removeFromCart: (itemid) => dispatch(removeFromCart(itemid)),
      updateCartAddons: (data) => dispatch(updateCart(data)),
      adjustQty: (itemid, value) => dispatch(adjustQty(itemid, value)),
      fetchBackendCart: (customerid, groupid, purchaseId, data) =>
        dispatch(fetchBackendCart(customerid, groupid, purchaseId, data)),
      fetchPurchaseDetails: (purchaseid, setLoading) =>
        dispatch(fetchPurchaseDetails(purchaseid, setLoading)),
      dispatchStoreDisplaySettings: (storeId) =>
        dispatch(getStoreDisplaySettings(storeId)),
      fetchItemDetails: (customerId, itemId) =>
        dispatch(fetchItemDetails(customerId, itemId)),
      setParcelAction: (purchaseId) => dispatch(setParcelAction(purchaseId)),
      convenienceChargesAction: (purchaseId, flag) =>
        dispatch(convenienceCharges(purchaseId, flag)),
      getStoreDetails: (storeId) => dispatch(getStoreDetails(storeId)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(Index));
  