import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";

/**
 * 
 * @brief
 * This file returns the cart page (after clicking on "Go to cart") where the subtotal of items are added up and 
 */

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();

//UseEffect to calculate total amount (money) of all added items to the cart
  useEffect(() => {
    setTotal(
      //Default value set to 0, adds the prices together, called everytime our state changes
      cart.reduce((acc, current) => acc + Number(current.price) * current.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                {/* Gets the image*/}
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                {/* Gets the name */}
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                {/* Gets the price */}
                <Col md={2}>$ {prod.price}</Col>
                {/* Gets the rating */}
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>

                {/* A form to control the quantity that the user selects 
                 Ex: User wants the same item, they have an option to add more than 1
                 from a drop down list. Calls the CHANGE_CART_QTY*/}
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {/* Maps out the number of options the user has in the drop down list
                    if the product is in stock */}
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>

                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>

              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="filters summary">
        {/* Gets amount of items in cart, and displays the number to user as a subtotal */}
        <span className="title">Subtotal ({cart.length}) items</span>
        {/* Gets the total of all the items in the cart and displays to user */}
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: $ {total}</span>
        {/* Dummy Checkout Button, leads to nowhere as it is a fake store */}
        <Button 
          variant="dark"
          type="button" 
          disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>

    </div>
  );
};

export default Cart;
