import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import axios from "axios";
import "../styles/wishlist.css";
import timage from "../images/cloth1.jpg";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);

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
      <div className="wishlist_container">
        {wishlist && wishlist.map((element) => (
          <div className="wishlist_item" key={element.id}>
            <div className="left">
              <img src={element.image} alt="" />
            </div>
            <div className="right">
              <div className="line1">
                <div className="name">{element.name}</div>
                <div className="price">₹{element.price}</div>
              </div>
              <div className="color">Color - {element.color}</div>
              <div className="remove_btn">
                <button>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Wishlist;
