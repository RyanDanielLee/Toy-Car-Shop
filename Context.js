import { createContext, useContext, useReducer} from "react";
import faker from "faker";
import { cartReducer, productReducer } from "./Reducers";

/**
 * @param faker
 * A package that is used to generate fake data
 * 
 * @brief 
 * This file is the context of the app and manages the state of the entire app
 */

const Cart = createContext();
faker.seed(100);

//Generate fake objects using faker package
const Context = ({ children }) => {
  
  {/*The array generates how many products will be generated 
    */}
  const products = [...Array(30)].map(() => ({
    id: faker.datatype.uuid() || faker.datatype.productDispatch(),
    //name: faker.commerce.productName(),
    name: faker.vehicle.type(),
    price: faker.commerce.price(),
    image: faker.random.image(), 
    /*Numbers are used to determine if the product is in stock 
    Takes any one of these values and assigns it*/
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  //Reducer to set initial state (Empty Cart)
  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    //set cart state to an empty array, initially
    cart: [],
  });

  //Reducer to set initial state (Filters list)
  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return (
    //Cart.Provider will wrap the entire react app
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

//Returns the taken cart context
export const CartState = () => {
  return useContext(Cart);
};

export default Context;
