import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsYoutube, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import { FaFacebookF, FaPinterestP, FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";
export const Footer = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      setSelected(null);
    } else {
      setSelected(i);
    }
  };

  // icon url
  const [ftrIcon, setFtrIcon] = useState([]);
  useEffect(() => {
    // const storedNavData = localStorage.getItem("ftrIcon");

    // if (storedNavData) {
    //   setFtrIcon(JSON.parse(storedNavData));
    // } else {
      // Fetch data from API if not available in local storage
      axios
        .get(
          "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/siteinfo"
        )
        .then((res) => {
          // localStorage.setItem("ftrIcon", JSON.stringify(res.data.data));
          setFtrIcon(res.data.data);
        })
        .catch(() => {
          console.log("API error");
        });
    
  }, []);

  const [FooterData, setFooterData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/footer-pages"
      )
      .then((res) => {
        setFooterData(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="ftr-desktop">
              <div className="ftr-contact flex">
                {FooterData.map((item) => {
                  return (
                    <>
                      <ul className="ftr-contact-ul">
                        <h4>
                          <Link to="#">{item.name}</Link>
                        </h4>

                        {item.pages.map((innerItem) => {
                          return (
                            <>
                              <li>
                                <Link to={innerItem.slug}>
                                  {innerItem.name}
                                </Link>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </>
                  );
                })}

                <ul className="ftr-contact-form">
                  <h4>Stay connected</h4>

                  <p>
                    Join our mailing list for the latest products, news, and
                    offers!
                  </p>

                  <form action="#">
                    <div className="email">
                      <input type="email" placeholder="Enter Email Address.." />
                    </div>
                    <div className="submit-btn">
                      <input className="button" type="submit" value="submit" />
                    </div>
                  </form>

                  <div className="ftr-icons flex">
                    <span>
                      <Link to={ftrIcon.youtube} target="_blank">
                        <BsYoutube />
                      </Link>
                    </span>
                    <span>
                      <Link to={ftrIcon.instagram} target="_blank">
                        <BsInstagram />
                      </Link>
                    </span>
                    <span>
                      <Link to={ftrIcon.facebook} target="_blank">
                        <FaFacebookF />
                      </Link>
                    </span>
                    <span>
                      <Link to={ftrIcon.twitter} target="_blank">
                        <BsTwitter />
                      </Link>
                    </span>
                    <span>
                      <Link to={ftrIcon.linkedin} target="_blank">
                        <BsLinkedin />
                      </Link>
                    </span>
                    <span>
                      <Link to={ftrIcon.pinterest} target="_blank">
                        <FaPinterestP />
                      </Link>
                    </span>
                  </div>
                </ul>
              </div>
            </div>

            {/* =================mobile start============== */}
            <div className="mobile-footer ftr-contact">
              <div className="mobile-ftr-contact ftr-contact flex">
                {FooterData.map((moFtrData) => {
                  return (
                    <>
                      <ul
                        className="ftr-contact-ul"
                        onClick={() => toggle(moFtrData.id)}
                      >
                        <h4
                          className={selected === moFtrData.id ? "active" : ""}
                        >
                          <Link to="#">{moFtrData.name}</Link>
                          <span>
                            {selected === moFtrData.id ? (
                              <FaMinus />
                            ) : (
                              <FaPlus />
                            )}
                          </span>
                        </h4>
                        {moFtrData.pages.map((innerFtrItem) => {
                          return (
                            <>
                              <ul
                                className={
                                  selected === moFtrData.id
                                    ? "content-show"
                                    : "content"
                                }
                              >
                                <li>
                                  <Link to={innerFtrItem.slug}>
                                    {innerFtrItem.name}
                                  </Link>
                                </li>
                              </ul>
                            </>
                          );
                        })}
                      </ul>
                    </>
                  );
                })}

                <ul className="ftr-contact-form">
                  <h4>Stay connected</h4>

                  <p>
                    Join our mailing list for the latest products, news, and
                    offers!
                  </p>

                  <form action="#">
                    <div className="email">
                      <input type="email" placeholder="Enter Email Address.." />
                    </div>
                    <div className="submit-btn">
                      <input className="button" type="submit" />
                    </div>
                  </form>

                  <div className="ftr-icons flex">
                    <span>
                      <Link to={ftrIcon.youtube} target="_blank">
                        <BsYoutube />
                      </Link>
                    </span>
                    <span>
                      <Link to={ftrIcon.instagram} target="_blank">
                        <BsInstagram />
                      </Link>
                    </span>
                    <span>
                      <Link to={ftrIcon.facebook} target="_blank">
                        <FaFacebookF />
                      </Link>
                    </span>
                    <span>
                      <Link to={ftrIcon.twitter} target="_blank">
                        <BsTwitter />
                      </Link>
                    </span>
                    <span>
                      <Link to={ftrIcon.linkedin} target="_blank">
                        <BsLinkedin />
                      </Link>
                    </span>
                    <span>
                      <Link to={ftrIcon.pinterest} target="_blank">
                        <FaPinterestP />
                      </Link>
                    </span>
                  </div>
                </ul>
              </div>
            </div>
            {/* =================mobile end============== */}
          </div>
        </div>
      </footer>
      <div className="copy-right">
        <p>{ftrIcon.copyright}</p>
      </div>
    </>
  );
};
