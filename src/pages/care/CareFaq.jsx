import React, { useState } from "react";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { Link } from "react-router-dom";

export const CareFaq = () => {
  const faqData = [
    {
      question: "1. How do I determine my ring size?",
      answer: (
        <p>
          Please reference our ring sizing page
          <Link to="#">ring sizing</Link> to order a complimentary ring sizer or
          use the chart we prepared to conveniently measure your ring size at
          home.
        </p>
      ),
    },
    {
      question: "2. Can I customize my engagement ring??",
      answer: (
        <p>
          Engagement rings and wedding bands can be customized to meet your
          unique taste. Please contact us to customize different metals,
          diamonds, gemstones, or engraving. Our design teams will provide CAD
          renderings to guide you through the customization process.
        </p>
      ),
    },
    {
      question: " 3. What metals and materials are used in your rings?",
      answer: (
        <p>
          SAMA engagement rings and wedding bands are available in platinum, 18K
          yellow gold, 18K white gold, and 18K rose gold.
        </p>
      ),
    },
    {
      question: "4. How do I care for my engagement ring?",
      answer: (
        <p>
          Visit our Jewelry Care
          <Link to="#">Visit our Jewelry Care</Link> education page for helpful
          tips to maintain the integrity of your ring.
        </p>
      ),
    },
    {
      question: "5. What is your return/exchange policy?",
      answer: (
        <p>
          SAMA offers 30-day complimentary returns. View our Returns Policy
          <Link to="#">View our Returns Policy</Link> here.
        </p>
      ),
    },
    {
      question: "6. Do you offer a warranty on your rings?",
      answer: (
        <p>
          SAMA offers a lifetime policy on manufacturing defects. View our
          Warranty
          <Link to="#">View our Warranty</Link> here.
        </p>
      ),
    },
    {
      question: "7 .How long does it take to receive my order?",
      answer: (
        <p>
          SAMA strives to deliver all orders within 10 business days from the
          date your order is processed.
        </p>
      ),
    },
    {
      question: "8. What is the difference between different diamond cuts?",
      answer: (
        <p>
          EDUCATION page to learn more about diamond cuts, shapes, and the 4C’s
          to guide your decision making process.
        </p>
      ),
    },
    {
      question: "9. Are your diamonds ethically sourced? ",
      answer: <p>Coming Soon!</p>,
    },
    {
      question: "10. What if I need a repair or resizing?",
      answer: (
        <p>
          Explain your process for ring repairs and resizing, including any
          associated costs. SAMA offers a 30-day complimentary resizing period
          to adjust the size of your ring. Any repairs should be viewed by a
          SAMA repair partner to maintain the lifetime warranty. View our
          resizing guidelines or contact us for resizing and / or repairs.
        </p>
      ),
    },
    {
      question: "11. Do you offer financing options? ",
      answer: <p>Coming soon!</p>,
    },
    {
      question: "12. Can I see the ring in person before purchasing?",
      answer: (
        <p>
          SAMA is an online retailer and does not have physical locations to
          view your ring in person.
        </p>
      ),
    },
    {
      question: "13. What is the difference between white gold and platinum? ",
      answer: (
        <p>
          White gold and platinum are two different metals commonly used in
          jewelry, and they have distinct characteristics. Here are some key
          differences between white gold and platinum:
        </p>
      ),
    },
    {
      question: "14. How can I contact customer support? ",
      answer: (
        <p>
          Please contact SAMA by phone, email, or chat with us for additional
          information. We are happy to help!
        </p>
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
    <section className="Accordian-main Accordian care-faq-page" id="Accordian">
      <div className="faq container">
        <div className="about-our-products">
          <h4> About Our Products : </h4>
          <p>Coming Soon!</p>
        </div>
        <h4 className="placing-orders">Placing Orders :</h4>
        <div className="accordinan">          
          {faqData.map((faqItem, i) => (
            <div className="item" key={i}>
              <div className="title" onClick={() => toggle(i)}>
                <p>{faqItem.question}</p>
                <span>{selected === i ? <BiUpArrow /> : <BiDownArrow />}</span>
              </div>

              <div className={selected === i ? "content-show" : "content"}>
                <div>
                  {faqItem.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="composition-common composition">
          <h4>Composition :</h4>
          <ul>
            <li>
              White Gold: It is an alloy of gold mixed with other white metals,
              such as nickel, palladium, or silver. The gold content is measured
              in karats, with 14k and 18k being common for jewelry.
            </li>

            <li>
              Platinum: It has a naturally white color that does not fade or
              tarnish over time. Platinum jewelry does not require rhodium
              plating.
            </li>
          </ul>
        </div>

        <div className="composition-common density-and-weight">
          <h4>Density and Weight :</h4>
          <ul>
            <li>
              White Gold: It is less dense than platinum, so white gold jewelry
              may feel lighter compared to a similar piece made of platinum.
            </li>
            <li>
              Platinum : It is denser and heavier than white gold. Platinum
              jewelry tends to be more substantial.
            </li>
          </ul>
        </div>

        <div className="composition-common durability">
          <h4>Durability</h4>
          <ul>
            <li>
              White Gold : It can be more prone to scratches and wear over time.
              The rhodium plating on white gold jewelry may wear off, requiring
              re-plating to maintain its white appearance.
            </li>
            <li>
              Platinum: It is known for its durability and resistance to wear.
              Platinum jewelry is less likely to scratch or show signs of aging.
            </li>
          </ul>
        </div>

        <div className="composition-common hypoallergenic-properties">
          <h4>Hypoallergenic Properties :</h4>
          <ul>
            <li>
              White Gold: Some people may be allergic to the nickel present in
              some white gold alloys. However, there are nickel-free white gold
              options available.
            </li>
            <li>
              Platinum: It is generally hypoallergenic and suitable for people
              with sensitive skin.
            </li>
          </ul>
        </div>

        <div className="composition-common cost">
          <h4>Cost :</h4>
          <ul>
            <li>
              White Gold: It is often less expensive than platinum due to the
              lower cost of gold and other alloy metals used.
            </li>
            <li>
              Platinum: It tends to be more expensive than white gold because
              of its rarity, purity, and the labor-intensive process involved in
              crafting platinum jewelry.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
