import {
  FETCH_ADDITIONAL_INFO,
  FETCH_ITEM_DETAILS,
  FETCH_RELATED_ITEMS,
  FETCH_SPECIFICATION,
  FETCH_VARIANTS,
  GET_ADDONS,
  SET_ADDITIONAL_INFO,
  SET_ADDONS,
  SET_DEFAULT_ITEM,
  SET_ITEM_DETAILS,
  SET_RELATED_ITEMS,
  SET_SPECIFICATION,
  SET_VARIANTS,
  SET_VARIANT_IMAGES,
} from "../constants/actionTypes";

const initialState = [];

const itemDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEM_DETAILS: {
      return {
        data: [],
        loading: true,
      };
    }

    case SET_ITEM_DETAILS: {
      const { data } = action;
      const defaultVariantItem = data.defaultVariantItem;
      const imageskey = Object.keys(data).filter((key) =>
        key.includes("img") ? data[key] : ""
      );
      const images = imageskey.map((key) => data[key]);
      return {
        ...state,
        data,
        images,
        loading: false,
        defaultVariantItem,
      };
    }

    case FETCH_VARIANTS: {
      return {
        ...state,
        variants: [],
      };
    }

    case SET_VARIANTS: {
      const { variants } = action;

      return {
        ...state,
        variants,
      };
    }

    case FETCH_SPECIFICATION: {
      return {
        ...state,
        spec: [],
      };
    }

    case SET_SPECIFICATION: {
      const { specification } = action;
      return {
        ...state,
        spec: specification,
      };
    }

    case FETCH_ADDITIONAL_INFO: {
      return {
        ...state,
        additionalinfo: [],
      };
    }

    case SET_ADDITIONAL_INFO: {
      const { additionalinfo } = action;
      return {
        ...state,
        additionalinfo,
      };
    }

    case FETCH_RELATED_ITEMS: {
      return {
        ...state,
        relatedItems: [],
      };
    }

    case SET_RELATED_ITEMS: {
      const { relatedItems } = action;
      return {
        ...state,
        relatedItems,
      };
    }
    case SET_VARIANT_IMAGES: {
      const data = action.payload;
      return {
        ...state,
        images: data,
      };
    }
    case SET_DEFAULT_ITEM: {
      const defaultVariantItem = action.payload;
      return {
        ...state,
        defaultVariantItem,
      };
    }

    case GET_ADDONS: {
        return {
          ...state,
          addons: [],
        };
      }
  
      case SET_ADDONS: {
        const { addons } = action;
  
        return {
          ...state,
          addons,
        };
      }

    default:
      return state;
  }
};

export default itemDetailsReducer;
