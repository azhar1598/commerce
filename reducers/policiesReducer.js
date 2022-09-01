import { POLICIES, SET_POLICIES } from "../constants/actionTypes";

const initialState ={};

const policiesReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_POLICIES: {
            const data = action.payload;
            return {
                ...state, data
            }
        }
        default:
            return state;
    }
}
export default policiesReducer