import { CartState } from "../context/Context";
import {Badge,Button,Container,Dropdown,FormControl,Nav,Navbar,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


/**
 * 
 * @Brief
 * This file returns the header or navbar of the page, and contains the shopping cart drop down menu
 */

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 90, color: "#28a745" }}>
      <Container>

        <Navbar.Brand>
          <Link to="/">Ryan and Afdhal's Toy Motors</Link>
        </Navbar.Brand>

        <Navbar.Brand>
          <Link to="/documentation">Documentation</Link>
        </Navbar.Brand>

        {useLocation().pathname.split("/")[1] !== "cart" && (
          <Navbar.Text className="search">
            {/*FormControl tag is the bootstrap equivalent of input tag in html */}
            <FormControl
              style={{ width: 500 }}
              type="search"
              placeholder="Search For A Product"
              className="m-auto"
              aria-label="Search"
              onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>
        )}

        <Nav>
          {/* Drop down menu toggle (the shopping cart icon), used with icon from react icons */}
          <Dropdown alignRight>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              {/* Cart length takes amount of items that were added from  */}
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>
              {/* Checks if number of cart items is greater than 0 */}
              {cart.length > 0 ? (
                <>

                  {/* Maps out all the items that were added to the cart and display in dropdown menu*/}
                  {cart.map((prod) => (
                    <span className="cartItem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.name}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        {/* Split used to cut decimal places*/}
                        <span>$ {prod.price.split(".")[0]}</span>
                      </div>
                      {/* Removes item from cart if the "trash can" icon is clicked in the dropped down menu */}
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}

                  {/* Link Route button that sends user to checkout page */}
                  <Link to="/cart">
                    <Button 
                      variant="dark"
                      style={{ width: "95%", margin: "0 10px", color: "#28a745"}}>
                      Go To Cart
                    </Button>
                  </Link>
                  
                </>
              ) : (
                //Returns a msg if cart is empty
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
