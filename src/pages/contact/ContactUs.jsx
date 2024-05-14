import React, { useEffect, useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { BsChatDotsFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import $ from "jquery";

export const ContactUs = () => {
  const [FooterData, setFooterData] = useState([]);
  console.log(FooterData);
  useEffect(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/footer-pages"
      )
      .then((res) => {
        setFooterData(res.data.data);
        console.log(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);

  let location = useLocation();
  console.log(location.pathname);

  $(document).ready(function() {
    // Hide all accordion item bodies initially
    $('.accordion-item-body').hide();

    // Trigger a click event on the first accordion item header to open it by default
    $('.accordion-item-header:first').addClass('active').next('.accordion-item-body').slideDown();

    // Toggle accordion item on click
    $('.accordion-item-header').click(function() {
      $(this).toggleClass('active');
      $(this).next('.accordion-item-body').slideToggle();
    });
  });
  return (
    <>
      <div className="container">
        {FooterData.map((item) => {
          return (
            <>
              {item.pages.map((innerItem) => {
                return (
                  <>
                    {location.pathname == "/" + innerItem.slug ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(innerItem.content),
                        }}
                      ></div>
                    ) : null}
                  </>
                );
              })}
            </>
          );
        })}
      </div>
    </>
  );
};
