import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import axios from "axios";
import "../styles/wishlist.css";
import timage from "../images/cloth1.jpg";
import wishlistlogo from "../images/wishlist.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const [itemcount, setItemcount] = useState(0);
  const getWishlist = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/user/get_user_details`,
        {
          headers: {
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFyeWFuIn0.2pc99p7IzrDQFdXRrR6rm_A4XABVMyewqLbgLrwL_0c",
          },
        }
      );
      // console.log(res.data)
      setWishlist(data.wishlist);
      console.log(data.wishlist);
      console.log("wishlist", wishlist);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  useEffect(() => {
    console.log("wishlist", wishlist);
  }, [wishlist]);

  return (
    <>
      <Header />
      <div className="container-main">
        {/* <div className="wishlist-header mt-5 mb-2">
          <div className="heart-logo">
            <img src={wishlistlogo} alt="Wishlist" />
          </div>
          <h1>My Wishlist</h1>
        </div> */}
        <div className="wishlist_item_container">
          {wishlist &&
            wishlist.map((element) => (
              <div className="wishlist_item" key={element.id}>
                <div className="card_top">
                  <img src={element?.image} alt="" />
                </div>
                <div className="card_bottom">
                  <div className="line1">
                    <div className="name">{element.name}</div>
                    <div className="price">₹{element.price}</div>
                  </div>
                  <div className="line2">
                    <div className="color">Color - {element.color}</div>
                    <div className="remove_btn">
                      <button>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
