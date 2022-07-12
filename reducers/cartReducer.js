import { ADD_TO_CART, ADJUST_QTY, REMOVE_FROM_CART, CLEAR_CART } from "../constants/actionTypes";

const initialState = {
    cart: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            console.log(item, state, 'starte')
            // const inCart = state.cart.find(item => item.item.item_id === action.payload.item_id ? true : false)
            return {
                ...state,

                cart: [...state.cart, { ...item, qty: 1 }]

                // cart: inCart ? state.cart.map(item => item.item.item_id === action.payload.item_id ? { ...item, qty: item.qty + 1 } : item) : [...state.cart, { item, qty: 1 }]
            }

        case ADJUST_QTY:

        console.log('adjust action.payload',action.payload)
            return {
                ...state,
                cart: state.cart.map(item => item.defaultVariantItem ? item.defaultVariantItem.variant_item_id == action.payload.id ? { ...item, qty: action.payload.qty } : item : item.item_id == action.payload.id ? { ...item, qty: action.payload.qty } : item)
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.defaultVariantItem ? item.defaultVariantItem.variant_item_id !== action.payload.id : item.item_id !== action.payload.id)
            }

        case CLEAR_CART:
            return {
                ...state,
                cart: []
            }
        default:
            return state
    }
}
export default cartReducer;