import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const DiamondBuyingGuide = () => {
  const [shapeData, setShapeData] = useState([]);
  console.log(shapeData);
  useEffect(() => {
    axios
      .get("https://dev.demo-swapithub.com/diamond/api/v1/diamondshape")
      .then((res) => {
        setShapeData(res.data.data);
        console.log(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);
  return (
    <section className="diamond-buying-guide">
      <div className="container">
        <div className="diamond-buying-guide-main">
          <p>
            Congratulations on your journey to finding the perfect diamond for
            you or yours! At SAMA, we understand that selecting the right
            diamond is a significant decision. To assist you in making an
            informed choice, we have created this comprehensive diamond buying
            guide.
          </p>

          <div className="diamond-certification">
            <h3>Diamond Certification</h3>
            <p>
              One of the first things to consider when purchasing a diamond is
              its certification. A reputable diamond should come with a
              certification from an independent gemological laboratory. All SAMA
              diamonds are independently verified by a trained gemologist at
              either Gemological Institute of America (GIA) or the International
              Gemological Institute (IGI), the world’s most well-known and
              respected labs. These certifications provide detailed information
              about the diamond's quality characteristics: cut, color, clarity,
              and carat weight (4C’s).
            </p>
          </div>

          <div className="the-of-diamonds">
            <h3>The 4C's of Diamonds</h3>
            <div>
              <h4>Cut</h4>
              <p>
                The cut of a diamond determines its brilliance and sparkle. A
                well-cut diamond reflects light beautifully, creating that
                stunning play of colors that maximizes brilliance.
              </p>
            </div>

            <div>
              <h4>Color</h4>
              <p>
                Diamonds come in a range of colors, with the most valuable being
                colorless. SAMA only carries diamonds within the "colorless" and
                "near-colorless" range. Slight color variations may not be
                noticeable to the naked eye and the closer a diamond is to
                "colorless," the rarer it is.
              </p>
            </div>

            <div>
              <h4>Clarity</h4>
              <p>
                Clarity refers to the presence of inclusions within a diamond.
                Choosing a diamond with minimal inclusions ensures a more
                brilliant and valuable stone.
              </p>
            </div>

            <div>
              <h4>Carat Weight</h4>
              <p>
                Carat weight is a measure of a diamond's size. It's essential to
                find a balance between size and quality. While larger diamonds
                are generally more valuable, a smaller, well-cut diamond can
                appear more brilliant and valuable than a larger one with lower
                cut quality.
              </p>
            </div>
          </div>

          <div className="diamond-grades">
            <h3>Diamond Grades</h3>
            <p>
              Understanding how diamonds are graded by GIA or IGI is vital to
              making an informed decision. Here's a brief overview:
            </p>
            <div>
              <p>
                <span>Ideal/Excellent : </span>Reflects nearly all light that
                enters the diamond, creating maximum brilliance.
              </p>
              <p>
                <span>Very Good : </span>Reflects most light, offering
                exceptional brilliance.
              </p>
              <p>
                <span>Good : </span>Reflects a significant amount of light,
                providing a pleasing balance of brilliance and value.
              </p>
              <p>
                <span>Fair/Poor : </span>Allows much of the light to escape,
                resulting in less brilliance.
              </p>
            </div>

            <div>
              <h4>What Are Natural Diamonds?</h4>
              <p>
                Billions of years ago natural diamonds formed deep within the
                Earth's mantle under high pressure and temperature conditions.
                They are composed of carbon atoms arranged in a crystal lattice
                structure, and their formation typically involves carbon atoms
                being subjected to intense heat and pressure over a long period
                of time. Natural diamonds are brought to the Earth's surface
                through volcanic eruptions.
              </p>
            </div>

            <div>
              <h4>Natural vs. Lab-grown Diamonds</h4>
              <p>
                It's important to distinguish natural diamonds from synthetic
                diamonds, which are created in laboratories using advanced
                technological processes. While natural and synthetic diamonds
                have the same physical and chemical properties, they differ in
                their origin and price. Natural diamonds have been highly valued
                for their rarity and natural beauty, making them more costly.
                Yet visually, there is no difference between natural and
                lab-grown diamonds to the naked eye. This makes lab-grown
                diamonds an accessible option for those looking for a bigger yet
                budget-friendly diamond!
              </p>
            </div>

            <div>
              <h4>Diamond Shape</h4>
              <p>
                Diamond shape refers to the external geometric outline or form
                of a cut diamond. Diamonds are available in various shapes, such
                as round brilliants and fancy-shapes. Discover which shape suits
                your style preferences and aesthetic here
                <Link>
                  link to new page and insert shop by shape scrolling banner
                  below.
                </Link>
              </p>
            </div>
          </div>
          <div className="diamond-shape">
            <h3>What is Diamond Shape?</h3>
            <p>
              The term "diamond shape" refers to the external geometric outline
              or form of a cut diamond when viewed from above. Diamonds come in
              various shapes, each with its unique characteristics and aesthetic
              appeal.
            </p>
            <p>
              Shape is often one of the first attributes considered when
              shopping for a diamond. Round diamonds are a classic, traditional
              choice while fancy-shaped diamonds offer a unique look. Oval,
              princess, emerald, cushion, pear, marquise, asscher, and radiant
              are considered fancy-shaped diamonds.
            </p>
          </div>

          <div className="diamond-shape-img">
            <h3>Learn About Diamond Shapes</h3>
            <div className="image">
              <div className="flex">
                {shapeData.map((shapeItem) => {
                  return (
                    <>
                      <div className="ShopDiamondShape-img-text">
                        <Link to="#">
                          <img src={shapeItem.icon} alt="" />
                          <span>{shapeItem.shape}</span>
                        </Link>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div>
              <p>
                <span>Round Brilliant : </span> This is the most popular and
                classic diamond shape, known for its exceptional brilliance and
                fire. It has a circular outline and is characterized by 57 or 58
                facets.
              </p>
              <ul>
                <li>Ideal Ratio : 1.00 (perfectly round)</li>
                <li>Acceptable Range : 0.9 to 1.1</li>
              </ul>
            </div>
            <div>
              <p>
                <span>Princess : </span> Princess-cut diamonds are square or
                rectangular in shape with pointed corners. They have a
                contemporary and modern appearance, offering a good balance
                between brilliance and a distinctive shape.
              </p>
              <ul>
                <li>Ideal Ratio : 1.00 to 1.05</li>
                <li>Acceptable Range: 1.00 to 1.10</li>
              </ul>
            </div>

            <div>
              <p>
                <span>Emerald : </span> Emerald-cut diamonds have a rectangular
                shape with cut corners. They are known for their step-cut
                facets, emphasizing clarity over brilliance. The long lines
                create an elegant and sophisticated look.
              </p>
              <ul>
                <li>Ideal Ratio : 1.30 to 1.60</li>
                <li>Acceptable Range: 1.20 to 1.80</li>
              </ul>
            </div>

            <div>
              <p>
                <span>Asscher : </span> Similar to the emerald cut, the asscher
                cut is square with cut corners. It has a vintage appeal and a
                distinctive, almost octagonal shape.
              </p>
              <ul>
                <li>Ideal Ratio : 1.00</li>
                <li>Acceptable Range: 0.90 to 1.05</li>
              </ul>
            </div>

            <div>
              <p>
                <span>Radiant : </span> Radiant-cut diamonds have a square or
                rectangular shape with trimmed corners, combining the elegance
                of emerald cuts with the brilliance of round diamonds. They are
                known for their versatility.
              </p>
              <ul>
                <li>Ideal Ratio : 1.00 to 1.05</li>
                <li>Acceptable Range: 1.00 to 1.10</li>
              </ul>
            </div>

            <div>
              <p>
                <span>Oval : </span> Oval-cut diamonds have an elongated,
                elliptical shape, providing a unique and flattering appearance.
                They often create the illusion of longer, slender fingers when
                set in rings.
              </p>
              <ul>
                <li>Ideal Ratio : 1.35 to 1.50</li>
                <li>Acceptable Range: 1.30 to 1.70</li>
              </ul>
            </div>

            <div>
              <p>
                <span>Marquise : </span> Marquise-cut diamonds are elongated
                with pointed ends, resembling a football or boat shape. They
                have a larger surface area, providing the illusion of a larger
                diamond.
              </p>
              <ul>
                <li>Ideal Ratio : 1.75 to 2.25</li>
                <li>Acceptable Range: 1.60 to 2.50</li>
              </ul>
            </div>

            <div>
              <p>
                <span>Pear (or Teardrop) : </span> Pear-shaped diamonds combine
                the round and marquise shapes, featuring a rounded end tapering
                to a point at the other. They are elegant and can create the
                illusion of longer fingers.
              </p>
              <ul>
                <li>Ideal Ratio : 1.45 to 1.75</li>
                <li>Acceptable Range: 1.40 to 2.00</li>
              </ul>
            </div>

            <div>
              <p>
                <span>Heart : </span> Heart-shaped diamonds are romantic and
                symbolic, featuring a distinctive shape with a cleft at the top.
                They require precise cutting to ensure symmetry.
              </p>
              <ul>
                <li>Ideal Ratio : 0.90 to 1.10</li>
                <li>Acceptable Range: 0.85 to 1.15</li>
              </ul>
            </div>

            <div>
              <p>
                <span>Cushion : </span> HCushion-cut diamonds have a square or
                rectangular shape with rounded corners, combining a classic look
                with a touch of modernity. They are known for their soft,
                romantic appearance.
              </p>
              <ul>
                <li>Ideal Ratio : 1.00 to 1.05 (for square cushions)</li>
                <li>Acceptable Range: 1.00 to 1.10</li>
              </ul>
            </div>
            <div>
              <p>
                The choice of diamond shape is subjective and often depends on
                personal style, preference, and the design of the jewelry piece.
                Each shape offers a unique character and can complement
                different settings and metal types. Also keep in mind that the
                ideal and acceptable ratios are general guidelines, and personal
                preferences play a significant role in choosing the right
                diamond shape and ratio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
