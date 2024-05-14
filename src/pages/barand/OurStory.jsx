import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

export const OurStory = () => {
  const faqData = [
    {
      question: "RESPECT",
      answer: (
        <p>
          A truncated version of the founder’s first and last names, SAMA is
          also a title used in Japanese culture for businesses to show great
          respect for their clients. Appreciating ALL of our customers is at the
          heart of SAMA and expressed explicitly through our name.
        </p>
      ),
    },
    {
      question: "MINDFULFULNESS",
      answer: (
        <p>
          We have partnered with select suppliers committed to manufacturing
          high-quality and mindfully made diamonds, gemstones, and jewelry. We
          believe in transparency and proudly share our partnerships with the
          community.<Link to="#">Learn more here</Link>
        </p>
      ),
    },
    {
      question: " ACCESSIBILITY",
      answer: (
        <p>
          Adding sparkle to your look should not break the bank. SAMA offers
          accessible high quality diamonds and gemstones to make you shine!
        </p>
      ),
    },
    {
      question: "AWARENESS",
      answer: (
        <div>
          <p>
            We acknowledge that social, environmental, and political
            improvements will cultivate brighter and stronger communities. SAMA
            wants to facilitate that change by empowering our customers to
            support a social cause meaningful to their hearts. A portion of your
            purchase at SAMA will help advance a cause of your choice:
          </p>

          <ul>
            <li>
              Women’s Rights - Malikah :
               <Link to="https://www.malikah.org/">  https://www.malikah.org/
              </Link>
            </li>
            <li>
              LQBTQIA Advocacy - The Trevor Project :
               <Link to="https://www.thetrevorproject.org/ "> https://www.thetrevorproject.org/
              </Link>
            </li>
            <li>
              Education Advancement/ Reform - Practice Makes Perfect :
               <Link to="https://practicebc.com/"> https://practicebc.com/</Link>
            </li>
            <li>
              Climate Change - The Clean Air Task Force :
               <Link to="https://www.catf.us/"> https://www.catf.us/</Link>
            </li>
            <li>Mental Health </li>
          </ul>
        </div>
      ),
    },
  ];

  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  return (
    <section className="Accordian-main our-story-main">
      <div className="container">
        <div className="our-story">
          <p>
            SAMA was founded in 2023 with a mission to uplift the community.
            Inspired by the founder’s engagement journey, teaching career
            centered on social justice, and background in luxury goods, Shanti
            launched SAMA to serve customers affordable bridal jewelry while
            providing unparalleled service and nurturing the community. Along
            her engagement journey, Shanti hoped to purchase from a brand that
            supported creating a better tomorrow for underrepresented groups and
            causes. Yet she did not find an affordable jewelry brand that
            aligned with her values.
          </p>

          <p>
            To ensure a brighter future, SAMA customers are empowered to support
            social causes meaningful to them. In turn, a portion of all
            purchases at SAMA will be donated to an organization of the client’s
            choice.
          </p>

          <div>
            <h3>BRAND PILLARS (see layout example below)</h3>

            <div className="our-story-accordian">
              <div className="brand-pillars"><h2>BRAND PILLARS</h2></div>
              <div className="accordinan">
                {faqData.map((faqItem, i) => (
                  <div className="item" key={i}>
                    <div className="title" onClick={() => toggle(i)}>
                      <p>{faqItem.question}</p>
                      <span>
                        {selected === i ? <BiUpArrow /> : <BiDownArrow />}
                      </span>
                    </div>

                    <div
                      className={selected === i ? "content-show" : "content"}
                    >
                      <div>{faqItem.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

        
          </div>
        </div>
      </div>
    </section>
  );
};
