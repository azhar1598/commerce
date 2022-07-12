import { SET_WALLET_INFO } from "../constants/actionTypes";

const initialState = [];

const walletReducer = (state = initialState, action) => {

    switch (action.type) {



        case SET_WALLET_INFO: {
       
            const data = action.payload
            return {
                ...state, data
            }
        }
        default:
            return state;
    }
}
export default walletReducer