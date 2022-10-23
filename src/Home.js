import { CartState } from "../context/Context";
import Filters from "./Filters";
import Product from "./Product";


/**
 * 
 * @brief
 * This file returns the main home page or the products of the page.
 * It checks available filter states, and sorts them by such.
 */

const Home = () => {
  //Get the state of the cart from context.js
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    //Uses cond rendering to determine if sorting is from low to high, or high to low
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    //Checks if it is out of stock, and display every item possible. If not, only displays items in the current state
    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    //Displays all products that are fast delivery
    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    //Displays the products that meeet or exceed the rating that is selected
    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    //Displays items that are only searched for 
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((prod) => (
          <Product prod={prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
