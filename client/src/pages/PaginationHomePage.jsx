import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import banner1 from '../images/banner4hd.jpeg';
import { useNavigate } from "react-router-dom";
import '../styles/home.css';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [bestSeller, setBestSeller] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [pageNo, setPageNo] = useState(1); // Track the current page number
    const [lastDoc, setLastDoc] = useState(null); // Track the last document ID
    const pageSize = 10; // Define page size here

    const navigate = useNavigate();

    const getAllProductPaginate = async () => {
        setLoading(true);
        try {
            const params = {
                pagesize: pageSize,
                page_no: pageNo,
                last_doc: lastDoc // Pass last_doc if available
            };

            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get_product`,
                { params }
            );

            if (data.length > 0) {
                // Update lastDoc with the last product document for next pagination
                setLastDoc(data[data.length - 1].pid);
                setProducts(prevProducts => [...prevProducts, ...data]);
            } else {
                setHasMore(false); // If no more data, we've reached the end
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error('Something went wrong while getting products');
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        setPageNo(prevPageNo => prevPageNo + 1); // Increment page number
    };

    const toProductDetails = (pid) => {
        navigate(`/product/${pid}`);
    };

    useEffect(() => {
        getAllProductPaginate(); // Initial load without last_doc
    }, [pageNo]); // Reload when pageNo changes

    return (
        <Layout title={"All Products - Best offers"}>
            <div className="home">
                <img className="banner" src={banner1} alt="" />
                <div className="product_list">
                    <h2>BEST SELLERS</h2>
                    <div className="cards">
                        {bestSeller?.map((bs) => (
                            <div className="card" key={bs.pid} onClick={() => toProductDetails(bs.pid)}>
                                <div className="crdimg">
                                    <img src={bs.imgurl} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">{bs.name}</h3>
                                    <div className="crd_rating">
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                    </div>
                                    <p className="crd_price">₹{bs.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product_list">
                    <h2>Top Rated</h2>
                    <div className="cards">
                        {topRated?.map((tr) => (
                            <div className="card" key={tr.pid} onClick={() => toProductDetails(tr.pid)}>
                                <div className="crdimg">
                                    <img src={tr.imgurl} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">{tr.name}</h3>
                                    <div className="crd_rating">
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                    </div>
                                    <p className="crd_price">₹{tr.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product_list">
                    <h2>All Products</h2>
                    <div className="cards">
                        {products?.map((p) => (
                            <div className="card" key={p.pid} onClick={() => toProductDetails(p.pid)}>
                                <div className="crdimg">
                                    <img src={p.imgurl} alt="" />
                                </div>
                                <div className="crd_content">
                                    <h3 className="crd_name">{p.name}</h3>
                                    <div className="crd_rating">
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                        <FontAwesomeIcon className="star" icon={faStar} />
                                    </div>
                                    <p className="crd_price">₹{p.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {loading && <p>Loading...</p>}
                {!loading && hasMore && (
                    <button onClick={loadMore}>Load More</button>
                )}
            </div>
        </Layout>
    );
};

export default HomePage;
