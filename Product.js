import { Card, Button } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";

/**
 * 
 * @brief
 * This file returns the individual data for each card. 
 */

const Product = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="products">
      <Card>
        {/* Render the images inside the card */}
        <Card.Img variant="top" src={prod.image} alt={prod.name} />
        {/* Place the title of the object inside the card body */}
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10}}>
            {/* Cut decimal out */}
            <span>$ {prod.price.split(".")[0]}</span>
            {/* Display whether it is fast or slow delivery with conditional render*/}
            {prod.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>3+ Day Delivery</div>
            )}
            <Rating rating={prod.ratings} />
          </Card.Subtitle>

          {/*Add and remove buttons */}

          {/* The "Some" function checks if a particular item is in an array,
          in this case, it checks for the id */}
          {cart.some((p) => p.id === prod.id) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              Remove from Cart
            </Button>

          ) : (
            <Button
            className="addbtn"
              variant="success"
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
              disabled={!prod.inStock}
            >
              {/* Conditional render to determine if it is out of stock or not*/}
              {!prod.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
          
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
