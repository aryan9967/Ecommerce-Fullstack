import Header from "../components/Layout/Header";
import Layout from "../components/Layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faStar,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/cart.css";
import "../styles/placeorder.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import slugify from "slugify";

export default function PlaceOrder() {
  // localStorage.setItem('item', JSON.stringify({
  //     pid:'aryan1720697544074',
  //     color:'black',
  //     size:'M'
  // }))

  // localStorage.setItem('user', JSON.stringify({
  //     token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFyeWFuIn0.2pc99p7IzrDQFdXRrR6rm_A4XABVMyewqLbgLrwL_0c',
  // }))

  const [item, setItem] = useState(null);
  const [product, setProduct] = useState(null);
  const [productPrice, setProductPrice] = useState(0);
  const [qauntity, setQuantity] = useState(1);
  const [addressLine1, setaddressLine1] = useState(null);
  const [addressLine2, setaddressLine2] = useState(null);
  const [contact, setcontact] = useState(null);
  const [city, setcity] = useState(null);
  const [state, setstate] = useState(null);
  const [pincode, setpincode] = useState(null);
  const navigate = useNavigate();
  const [itemInfo, setItemInfo] = useState(() => {
    const storedItem = JSON.parse(localStorage.getItem('item_info'));
    if (storedItem) {
      return storedItem;
    } else {
      return null;
    }
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setIsRegistered(true);
      return storedUser;
    } else {
      setIsRegistered(false);
      return null;
    }
  });

  async function getUseraddress_contact() {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/user/get_user_address`,
      {
        headers: { Authorization: user.token },
      }
    );
    console.log("user address", data);
    setaddressLine1(data.address["street_line1"]);
    setaddressLine2(data.address["street_line2"]);
    setcity(data.address["city"]);
    setstate(data.address["state"]);
    setcontact(user?.user?.phone?.substring(3));
    setpincode(data.address["pincode"]);
  }

  async function fetchCityAndState() {
    if (pincode.length === 6) {
      console.log("pincode", pincode)
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/util/get_city_state?pincode=${pincode}`);
        console.log(response.status)
        console.log("PIN api", response.data);
      }
      catch (err) {
        if (err.response.status === 400) {
          alert("Invalid api pin")
        }
      }
    }
  }

  useEffect(() => {
    getUseraddress_contact();
  }, []);

  useEffect(() => {
    if (pincode) {
      fetchCityAndState();
    }
  }, [pincode])

  function decrementQuantity() {
    if (qauntity > 1) {
      setQuantity(qauntity - 1);
    }
  }
  function incrementQuantity() {
    if (qauntity < 10) {
      setQuantity(qauntity + 1);
    }
  }

  async function order_product() {
    console.log(addressLine1)
    const data = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/user/place_order`,
      {
        pid: itemInfo.pid,
        color_pid: itemInfo.color_pid,
        size: itemInfo.size, // Size is in uppercase as required
        qauntity_str: qauntity,
        address: {
          line1: addressLine1,
          line2: addressLine2,
          city: city,
          state: state,
          zipCode: pincode,
          country: "India",
        },
        contact: contact,
        color: slugify(itemInfo.color_name).toLowerCase(),
      },
      {
        headers: { Authorization: user.token },
      }
    );
    console.log(data);
    if (data.status === 200) {
      localStorage.removeItem('item_info');
      localStorage.removeItem('color_data');
      localStorage.removeItem('size_data');
      navigate('/dashboard/orders');
    }
  }

  return (
    <Layout>
      {itemInfo ? (
        <div className="cart_container">
          <div className="cart_left">
            <div className="cart_header">
              <h3>Order Summary</h3>
              <h4 className="price_tag">Price</h4>
            </div>
            <div className="all_carts">
              <div className="cart">
                <div className="cart_img">
                  <img src={itemInfo?.image} alt="" />
                </div>
                <div className="cart_details">
                  <div className="cart_name">
                    <h3>{itemInfo?.product_name}</h3>
                  </div>
                  <div className="cart_avail">
                    {itemInfo?.stock > 0 ? (
                      <>
                        <h5>In stock</h5>
                      </>
                    ) : (
                      <>
                        <h5>Not in stock</h5>
                      </>
                    )}
                  </div>
                  <div className="cart_rate">
                    <FontAwesomeIcon className="star" icon={faStar} />
                    <FontAwesomeIcon className="star" icon={faStar} />
                    <FontAwesomeIcon className="star" icon={faStar} />
                    <FontAwesomeIcon className="star" icon={faStar} />
                    <FontAwesomeIcon className="star" icon={faStar} />
                  </div>
                  <div className="product_color">
                    <h4>
                      Color:{" "}
                      <span className="color-highlight">{itemInfo.color_name}</span>
                    </h4>
                  </div>
                  <div className="product_size">
                    <h4>
                      Size:{" "}
                      <span className="size-highlight">{itemInfo.size}</span>
                    </h4>
                  </div>
                  <div className="product_category">
                    <h4>
                      Category:{" "}
                      <span className="category-highlight">
                        {itemInfo?.category}
                      </span>
                    </h4>
                  </div>
                  <div className="cart_quantity">
                    <div className="quantity_control">
                      <button
                        className="quantity_btn"
                        onClick={decrementQuantity}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <input
                        type="number"
                        className="quantity_input"
                        value={qauntity}
                        min={0}
                        max={10}
                        readOnly={true}
                      />
                      <button
                        className="quantity_btn"
                        onClick={incrementQuantity}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="cart_price">
                  <h4>₹{itemInfo?.price}.00</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="cart_right">
            <div className="delivery_details mb-3">
              <div className="contact-header">
                <h3>Contact Information</h3>
              </div>
              <div className="contact_form">
                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={addressLine1 ? addressLine1 : ""}
                    onChange={(e) => {
                      setaddressLine1(e.target.value);
                    }}
                  />
                  <label for="floatingInput">Address Line1</label>
                </div>
                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={addressLine2 ? addressLine2 : ""}
                    onChange={(e) => {
                      setaddressLine2(e.target.value);
                    }}
                  />
                  <label for="floatingPassword">Address Line2</label>
                </div>
                <div className="addressline">
                  <div className="form-floating line-field">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={pincode ? pincode : ""}
                      onChange={(e) => {
                        setpincode(e.target.value)
                      }}
                    />
                    <label for="floatingInput">Pincode</label>
                  </div>
                  <div className="form-floating mb-2 line-field">
                    <input
                      type="phone"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={contact ? contact : ""}
                      onChange={(e) => {
                        setcontact(e.target.value);
                      }}
                    />
                    <label for="floatingInput">Contact</label>
                  </div>
                </div>
                <div className="addressline">
                  <div className="form-floating mb-2 line-field">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={city ? city : ""}
                      readOnly={true}
                    />
                    <label for="floatingInput">City</label>
                  </div>
                  <div className="form-floating line-field">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={state ? state : ""}
                      readOnly={true}
                    />
                    <label for="floatingInput">State</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="price_details_container">
              <div className="price_header">
                <h3>Price Details</h3>
              </div>
              <div className="price_details">
                <div className="price_detail">
                  <h4>Price ({qauntity} items): </h4>
                  <h4 className="price_highlight">
                    ₹{itemInfo?.price * qauntity}.00
                  </h4>
                </div>
                {/* <div className="price_detail">
                            <h4>Discount: </h4>
                            <h4 className="price_highlight">-₹200</h4>
                        </div> */}
                <div className="price_detail">
                  <h4>Delivery Charges: </h4>
                  <h4 className="price_highlight">₹33.00</h4>
                </div>
                <div className="price_total">
                  <h4>Total Amount: </h4>
                  <h4 className="total_highlight">
                    ₹{itemInfo?.price * qauntity + 33}.00
                  </h4>
                </div>
                <div className="price_buy_div">
                  <button className="price_buy" onClick={order_product}>
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Layout>
  );
}
