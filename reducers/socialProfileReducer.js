import { SET_SOCIAL_PROFILE } from "../constants/actionTypes";

const initialState = [];

const socialProfileReducer = (state = initialState, action) => {

    switch (action.type) {



        case SET_SOCIAL_PROFILE: {
            console.log('reducer data', action)
            const data=action.payload
            return {
                ...state, data
            }
        }
        default:
            return state;
    }
}
export default socialProfileReducer