import { SET_ADDRESS } from "../constants/actionTypes";

const initialState = []

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADDRESS:
            
            const data=action.payload
            return {
                ...state,
                data
            }

        default:
            return state
    }

}
export default addressReducer;