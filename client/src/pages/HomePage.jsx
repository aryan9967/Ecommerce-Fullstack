import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import banner1 from '../images/banner6a.jpg'
import p1 from '../images/tshirt2.png'
import p2 from '../images/tshirt3.png'
import '../styles/home.css'
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner.jsx";
import BestSeller from "../components/BestSeller.jsx";
import NewlyArrived from "../components/NewlyArrived.jsx";
import OurCollection from "../components/OurCollection.jsx";

const HomePage = () => {
  const [list, setList] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [products, setProducts] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAllProductPaginate = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get_product?pagesize=10&page_no=1`
      );
      console.log(data);
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong while getting category');
    }
  }

  const getBestSeller = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get_bestseller`
      );
      console.log(data);
      if (data) {
        setBestSeller(data);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong while getting category');
    }
  }

  const getTopRated = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get_toprated`
      );
      console.log(data);
      if (data) {
        setTopRated(data);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong while getting category');
    }
  }

  const toProductDetails = async (pid) => {
    navigate(`/product/${pid}`)
  }

  return (
    <Layout title={"ALl Products - Best offers "}>
      <div className="home">
        <Banner />
        <div className="product_list">
          <h2>BEST SELLERS</h2>
          <BestSeller />
        </div>
        <div className="product_list">
          <h2>Newly Arrived</h2>
          <NewlyArrived />
        </div>
        <div className="product_list">
          <h2>Our Collection</h2>
          <OurCollection />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;