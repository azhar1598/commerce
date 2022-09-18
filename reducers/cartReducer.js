import {
  ADD_TO_CART,
  ADJUST_QTY,
  REMOVE_FROM_CART,
  CLEAR_CART,
  ADD_ADDON,
  DECREASE_ADDON,
  ADD_BULK_TO_CART,
} from "../constants/actionTypes";
import { addItemToCart, convertToAddonsArray } from "./utility/cartutility";

const initialState = {
  cart: [],
  cartDataList: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_TO_CART:
    //     const item = action.payload;
    //     console.log(item, state, 'starte')
    //     // const inCart = state.cart.find(item => item.item.item_id === action.payload.item_id ? true : false)
    //     return {
    //         ...state,

    //         cart: [...state.cart, { ...item, qty: 1 }]

    //         // cart: inCart ? state.cart.map(item => item.item.item_id === action.payload.item_id ? { ...item, qty: item.qty + 1 } : item) : [...state.cart, { item, qty: 1 }]
    //     }

    case ADJUST_QTY:
      console.log("adjust action.payload", action.payload);
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.defaultVariantItem
            ? item.defaultVariantItem.variant_item_id == action.payload.id
              ? { ...item, qty: action.payload.qty }
              : item
            : item.item_id == action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) =>
          item.addons
            ? item.id == action.payload
            : item.defaultVariantItem
            ? item.defaultVariantItem.variant_item_id !== action.payload.id
            : item.item_id !== action.payload.id
        ),
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: addItemToCart(state?.cart || [], action.payload),
      };

    case ADD_BULK_TO_CART:
      return {
        ...state,
        cart: convertToAddonsArray(state?.cart || [], action.payload),
      };

    // return {
    //     ...state,
    //     cart: state.cart.map((item, index) => {
    //         let newAddon = item.addons.map(addon => {
    //             if (addon.id == action.payload) {
    //                 return { ...addon, qty: addon.qty + 1 }
    //             }
    //             else {
    //                 return addon
    //             }
    //         })
    //         return {
    //             ...item,
    //             addons: newAddon
    //         }
    //     })
    //     // cart: state.cart.filter(item => item.defaultVariantItem ? item.defaultVariantItem.variant_item_id !== action.payload.id : item.item_id !== action.payload.id)

    // }

    case DECREASE_ADDON:
      return {
        ...state,
        cart: state.cart.filter((item) =>
          item.defaultVariantItem
            ? item.defaultVariantItem.variant_item_id !== action.payload.id
            : item.item_id !== action.payload.id
        ),
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
export default cartReducer;
