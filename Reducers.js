export const cartReducer = (state, action) => {
  /*Action takes the type: ADD_TO_CART, etc and also takes the payload which we place into
  the state, and eventually manipulate it */
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };

    case "REMOVE_FROM_CART":
      return { ...state,
        //Filter the action that is being sent
        //Will compare with every item in the cart, will not return if it is not equal, and removed form cart
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };

    //Used for changing the quantity in the cart route
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          //conditional rendering to check the payload, then changes the quanitity,
          //if not, return the quantity that is already there
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };

    default:
      return state;
  }
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_STOCK":
      return { ...state, byStock: !state.byStock };
    case "FILTER_BY_DELIVERY":
      return { ...state, byFastDelivery: !state.byFastDelivery };
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return { byStock: false, byFastDelivery: false, byRating: 0 };
    default:
      return state;
  }
};
