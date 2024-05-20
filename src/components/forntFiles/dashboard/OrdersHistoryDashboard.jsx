import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsChat } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import Popup from "reactjs-popup";
import { NeedAssistance } from "./NeedAssistance";
import { validateName } from "../ValidationFunctions";
import { format } from "date-fns";
import axios from "axios";
import LoaderSpinner from '../../LoaderSpinner'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { UserContext } from "../../../App";

export const OrdersHistoryDashboard = ({
  showOrderId,
  setShowOrderId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderId, setOrderId] = useState();
  const [loading, setLoading] = useState(false)
  const [showOrderHistory, setShowOrderHistory] = useState()
  const [currentPage, setCurrentPage] = useState(1);

  const {baseUrl} = useContext(UserContext)
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("email-popup-open");
    } else {
      document.body.classList.remove("email-popup-open");
    }
  }, [isOpen]);
  const togglePopup = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("email-popup-open", isOpen);
  };

  useEffect(() => {
    setLoading(true)
    axios
      .get(
        `${baseUrl}/order-detail?order_id=${showOrderId}`
      )
      .then((res) => {
        setOrderId(res.data);
        setLoading(false)
        console.log(res.data.order_details.address)
      })
      .catch(() => {
        setLoading(false)
        console.log("Order details api not working");
      });
  }, [showOrderId]);

  const user_id = localStorage.getItem('formData')

  useEffect(() => {
    axios
      .get(
        `${baseUrl}/order-history?user_id=${user_id}&page=${currentPage}`
      )
      .then((res) => {
        setShowOrderHistory(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.log("Order details api not working");
      });
  }, [user_id, currentPage]);

  console.log(orderId);


  function handlePageChange(page) {
    setCurrentPage(page);
  }
  return (
    <>
      <div className="account-right-data">
        <div className="order-hisotry-main">
          <div className="orders-history-dashboard">
            <h3 className="orders-heading-history">Order History</h3>
            <p>
              Thank you for choosing SAMA! Your order history details are below.
            </p>
            <table className="orders-history-table">
              <tr>
                <th>Order Date</th>
                <th>Order Id</th>
                <th>Order Status</th>
              </tr>
              {showOrderHistory?.data?.data?.length > 0 &&
                showOrderHistory?.data?.data?.map((item) => {
                  const createdAt = new Date(item.created_at);
                  const formattedDate = format(createdAt, "MM/dd/yyyy");
                  return (
                    <tr
                      onClick={() =>
                        setShowOrderId((prevState) =>
                          item.order_id === prevState ? null : item.order_id
                        )
                      }
                    >
                      <td>{formattedDate}</td>
                      <td>{item.order_id}</td>
                      <td>{item.status}</td>
                    </tr>
                  );
                })}

            </table>
            <ResponsivePagination
              total={showOrderHistory?.total_page}
              current={currentPage}
              onPageChange={setCurrentPage}
              maxWidth={400}
            />
          </div>

          {loading ? <LoaderSpinner /> : showOrderId === orderId?.order_details?.order_id && (
            <div className="order-history">
              <h3>Order #{orderId?.order_details?.order_id}</h3>
              <ul class="order-thead">
                <li>Placed On: {orderId?.order_details?.order_date}</li>
                <li>Order Status: {orderId?.order_details?.order_status}</li>
              </ul>
              {orderId?.data?.length > 0 &&
                orderId?.data?.map((item) => {
                  let ring_details;
                  let diamond_details;
                  let gemstone_details;
                  if (item?.ring_detail) {
                    try {
                      ring_details = JSON.parse(item.ring_detail);
                    } catch (error) {
                      console.error("Error parsing JSON:", error);
                    }
                  } else {
                    console.error(
                      "The ring_detail property is empty or undefined."
                    );
                  }
                  if (item?.diamond_detail) {
                    try {
                      diamond_details = JSON.parse(item.diamond_detail);
                    } catch (error) {
                      console.error("Error parsing JSON:", error);
                    }
                  } else {
                    console.error(
                      "The ring_detail property is empty or undefined."
                    );
                  }
                  if (item?.gemstone_detail) {
                    try {
                      gemstone_details = JSON.parse(item.gemstone_detail);
                    } catch (error) {
                      console.error("Error parsing JSON:", error);
                    }
                  } else {
                    console.error(
                      "The ring_detail property is empty or undefined."
                    );
                  }
                  // Ring and diamond
                  if (ring_details != null && diamond_details != null) {
                    return (
                      <>
                        <div className="ring-gemstone-description">
                          <div className="order-details-description">
                            <div className="order-details-column">
                              <img src={ring_details?.ring_image} alt="" />
                            </div>
                            <div className="right-des-order">
                              <div className="order-items-right">
                                <div className="fore2" data-title="">
                                  {" "}
                                  Stock Number:
                                </div>
                                <div className="fore3">
                                  {ring_details?.ring_style}
                                </div>
                                <div className="fore4 hidden-xs">Price:</div>
                                <div className="fore5 hidden-xs">
                                  ${ring_details?.ring_price}
                                </div>
                              </div>
                              <div className="order-items-right">
                                <div className="fore2" data-title="">
                                  {" "}
                                  Description:{" "}
                                </div>
                                <div className="fore3">
                                  {ring_details?.ring_name}
                                </div>
                                <div className="fore2" data-title="">
                                  {" "}
                                  Ring Size:{" "}
                                </div>
                                <div className="fore3">
                                  {ring_details?.ring_size}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="order-details-description">
                            <div className="order-details-column">
                              <img
                                src={diamond_details?.diamond_image}
                                alt=""
                              />
                            </div>
                            <div className="right-des-order">
                              <div className="order-items-right">
                                <div className="fore2" data-title="">
                                  {" "}
                                  Stock Number:
                                </div>
                                <div className="fore3">
                                  {diamond_details?.stock_number}
                                </div>
                                <div className="fore4 hidden-xs">Price:</div>
                                <div className="fore5 hidden-xs">
                                  ${diamond_details?.diamond_price}
                                </div>
                              </div>
                              <div className="order-items-right">

                                <div className="fore2" data-title="">
                                  {" "}
                                  Description:{" "}
                                </div>
                                <div className="fore3">
                                  {diamond_details?.diamond_carat}{" "}
                                  {diamond_details?.diamond_shape} Diamond
                                </div>
                                <div className="fore2" data-title=""></div>
                                <div className="fore3"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                  // Ring and gemstone
                  if (ring_details != null && gemstone_details != null) {
                    return (
                      <>
                        <div className="ring-gemstone-description">
                          <div className="order-details-description">
                            <div className="order-details-column">
                              <img src={ring_details?.ring_image} alt="" />
                            </div>
                            <div className="right-des-order">
                              <div className="order-items-right">
                                <div className="fore2" data-title="">
                                  {" "}
                                  Stock Number:
                                </div>
                                <div className="fore3">
                                  {ring_details?.ring_style}
                                </div>
                                <div className="fore4 hidden-xs">Price:</div>
                                <div className="fore5 hidden-xs">
                                  ${ring_details?.ring_price}
                                </div>
                              </div>
                              <div className="order-items-right">
                                <div className="fore2" data-title="">
                                  {" "}
                                  Description:{" "}
                                </div>
                                <div className="fore3">
                                  {ring_details?.ring_name}
                                </div>
                                <div className="fore2" data-title="">
                                  {" "}
                                  Ring Size:{" "}
                                </div>
                                <div className="fore3">
                                  {ring_details?.ring_size}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="order-details-description">
                            <div className="order-details-column">
                              <img
                                src={gemstone_details?.gemstone_image}
                                alt=""
                              />
                            </div>
                            <div className="right-des-order">
                              <div className="order-items-right">
                                <div className="fore2" data-title="">
                                  {" "}
                                  Stock Number:
                                </div>
                                <div className="fore3">
                                  {gemstone_details?.stock_number}
                                </div>
                                <div className="fore4 hidden-xs">Price:</div>
                                <div className="fore5 hidden-xs">
                                  ${gemstone_details?.gemstone_price}
                                </div>
                              </div>
                              <div className="order-items-right">
                                <div className="fore2" data-title="">
                                  {" "}
                                  Description:{" "}
                                </div>
                                <div className="fore3">
                                  {gemstone_details?.gemstone_name}
                                </div>
                                <div className="fore2" data-title=""></div>
                                <div className="fore3"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                  // Only diamond
                  if (
                    diamond_details != null &&
                    ring_details == null &&
                    gemstone_details == null
                  ) {
                    return (
                      <div className="order-details-description">
                        <div className="order-details-column">
                          <img src={diamond_details?.diamond_image} alt="" />
                        </div>
                        <div className="right-des-order">
                          <div className="order-items-right">
                            <div className="fore2" data-title="">
                              {" "}
                              Stock Number:
                            </div>
                            <div className="fore3">
                              {diamond_details?.stock_number}
                            </div>
                            <div className="fore4 hidden-xs">Price:</div>
                            <div className="fore5 hidden-xs">
                              ${diamond_details?.diamond_price}
                            </div>
                          </div>
                          <div className="order-items-right">
                            <div className="fore2" data-title="">
                              {" "}
                              Description:{" "}
                            </div>
                            <div className="fore3">
                              {diamond_details?.diamond_carat}{" "}
                              {diamond_details?.diamond_shape} Diamond
                            </div>
                            <div className="fore2" data-title=""></div>
                            <div className="fore3"></div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  // Only gemstone
                  if (
                    gemstone_details != null &&
                    ring_details == null &&
                    diamond_details == null
                  ) {
                    return (
                      <div className="order-details-description">
                        <div className="order-details-column">
                          <img src={gemstone_details?.gemstone_image} alt="" />
                        </div>
                        <div className="right-des-order">
                          <div className="order-items-right">
                            <div className="fore2" data-title="">
                              {" "}
                              Stock Number:
                            </div>
                            <div className="fore3">
                              {gemstone_details?.stock_number}
                            </div>
                            <div className="fore4 hidden-xs">Price:</div>
                            <div className="fore5 hidden-xs">
                              ${gemstone_details?.gemstone_price}
                            </div>
                          </div>
                          <div className="order-items-right">
                            <div className="fore2" data-title="">
                              {" "}
                              Description:{" "}
                            </div>
                            <div className="fore3">
                              {gemstone_details?.gemstone_name}
                            </div>
                            <div className="fore2" data-title=""></div>
                            <div className="fore3"></div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}

              <div className="order-details-description">
                <div className="order-details-column"></div>
                <div className="right-des-order">
                  <div className="order-items-right">
                    <div className="fore2" data-title=""></div>
                    <div className="fore3"></div>
                    <div className="fore4 hidden-xs">Item Total:</div>
                    <div className="fore5 hidden-xs">${orderId?.order_details.total_amount}</div>
                  </div>
                  <div className="order-items-right">
                    <div className="fore2" data-title=""></div>
                    <div className="fore3"></div>
                    <div className="fore4 hidden-xs">Tax:</div>
                    <div className="fore5 hidden-xs">$0.00</div>
                  </div>
                  <div className="order-items-right">
                    <div className="fore2" data-title=""></div>
                    <div className="fore3"></div>
                    <div className="fore4 hidden-xs">FedEx Shipping:</div>
                    <div className="fore5 hidden-xs">Free</div>
                  </div>
                  <div className="order-items-right">
                    <div className="fore2" data-title=""></div>
                    <div className="fore3"></div>
                    <div className="fore4 hidden-xs">Payment Amount:</div>
                    <div className="fore5 hidden-xs">$0.00</div>
                  </div>
                  <div className="order-items-right">
                    <div className="fore2" data-title=""></div>
                    <div className="fore3"></div>
                    <div className="fore4 hidden-xs">Price:</div>
                    <div className="fore5 hidden-xs">${orderId?.order_details.total_amount}</div>
                  </div>
                </div>
              </div>
{
  
  orderId.order_details.address.length > 0 && (
    
    <div className="shipping-details-order">
    <h2 className="heading">Order Details</h2>
    <div className="shipping-inner">
      <div className="shipping-column">
        <h4 className="heading">Shipping Information</h4>
        <div className="ohd-body">
          <p>
            Status: <br className="visible-xs" />
            {orderId?.order_details?.order_status}
          </p>
          <p>
            Estimated Delivery Date: <br className="visible-xs" />

          </p>
          <p>
            FedEx Tracking Number: <br className="visible-xs" />
            Your tracking number will be generated when your order
            is ready to ship. Once your order ships, it should
            arrive within 1-2 days.
          </p>
        </div>
      </div>
      <div className="shipping-column">
        <h4 className="heading">Shipping Address</h4>
        <div className="ohd-body">
          <p>
            {orderId.order_details.address.both?.first_name}{" "}{orderId.order_details.address.both?.last_name}
          </p>
          <p>
            {orderId.order_details.address.both?.address_line2 !== null && orderId.order_details.address.both?.address_line2 !== null}
          </p>
          <p>
            {orderId.order_details.address.both?.city} <br />
            {orderId.order_details.address.both?.country}
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}
             
              <div className="shipping-details-order">
                <div className="shipping-inner">
                  <div className="shipping-column">
                    <h4 className="heading">Payment Method:</h4>
                    <div className="ohd-body">
                      <p>
                        Status: <br className="visible-xs" />
                        {orderId?.order_details?.order_status}
                      </p>
                      <p>
                        Estimated Delivery Date: <br className="visible-xs" />

                      </p>
                      <p>
                        FedEx Tracking Number: <br className="visible-xs" />
                        Your tracking number will be generated when your order
                        is ready to ship. Once your order ships, it should
                        arrive within 1-2 days.
                      </p>
                    </div>
                  </div>
                  <div className="shipping-column">
                    <h4 className="heading">Billing Address</h4>
                    <div className="ohd-body">
                      <p>
                        {orderId.order_details.address.both?.first_name}{" "}{orderId.order_details.address.both?.last_name}
                      </p>
                      <p>
                        {orderId.order_details.address.both?.address_line2 !== null && orderId.order_details.address.both?.address_line2 !== null}
                      </p>
                      <p>
                        {orderId.order_details.address.both?.city} <br />
                        {orderId.order_details.address.both?.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <h3 className="heading">Contact Us</h3>
          <p>
            We are here to help you with any questions you may have! Our
            customer service hours are Weekdays 6am – 7pm and Weekends 7am – 7pm
            PT.
          </p>

          <div className="chat-us-new">
            <ul>
              <li>
                <Link to="#">
                  <BsChat />
                  <span>Live Chat</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="email-button" onClick={togglePopup}>
                  {" "}
                  <MdOutlineEmail />
                  <span>Email</span>
                </Link>
                {isOpen && (
                  <div className="popup">
                    <NeedAssistance setIsOpen={setIsOpen} />
                  </div>
                )}
              </li>
              <li>
                <Link to="#">
                  <IoIosCall />
                  <span>800.691.0952</span>
                </Link>
              </li>
            </ul>
          </div>
          <p>
            By placing an order, you have agreed to Brilliant Earth’s
            <Link to="#" data-url="">
              Security Policy
            </Link>
            ,<Link to="#">Privacy Policy</Link>,
            <Link to="#">Terms of Service</Link> and
            <Link to="#">Customer Service Policy</Link>.
          </p>
        </div>
      </div>
    </>
  );
};
