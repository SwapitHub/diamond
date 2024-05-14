import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import LoaderSpinner from "../../LoaderSpinner";

export const ExOnscroll = () => {
  const [menRings, setMenRings] = useState([]);
  const [page, SetPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // console.log(menRings);
  useEffect(() => {
    axios
      .get(
        `http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/products?page=${page}`
      )
      .then((res) => {
        const data = res.data.data;

        setMenRings((prev) => [...prev, ...data]);
        console.log(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        console.log("API error");
      });
  }, [page]);

  // on scroll
  const handleInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        SetPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);
  return (
    <>
      <div className="resultdata setings-Page-img">
        {menRings.map((item) => (
          <div key={item.id} className="all-pages-data">
            <Link to={`/mainPage2/${item.slug}`}>
              <p>{item.id}</p>
              <div className="all-img1">
                <img src={item.default_image_url} alt={item.name} />
              </div>
              <div className="all-card-four-color">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{item.color}</p>
              <p className="multiCategory">{item.multiCategory}</p>
            </Link>
          </div>
        ))}

        <div>
          
          {loading && <LoaderSpinner/>}
        </div>
      </div>
    </>
  );
};
