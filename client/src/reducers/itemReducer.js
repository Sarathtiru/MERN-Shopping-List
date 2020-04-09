import * as actionTypes from "../actions/types";

const initialState = {
  items: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };

    case actionTypes.DELETE_ITEMS:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case actionTypes.ADD_ITEMS:
      return{
        ...state,
        items:[action.payload,...state.items]
        
      };

    case actionTypes.ITEMS_LOADING:
      return{
        ...state,
        loading: true
      }

    default:
      return state;
  }
}
