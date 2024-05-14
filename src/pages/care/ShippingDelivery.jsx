import React from "react";

export const ShippingDelivery = () => {
  return (
    <section className="shipping-delivery">
      <div className="container">
        <div className="shipping-delivery-main">
          <div className="shipping-content">
            <p>
              SAMA offers complimentary 2-Day FedEx shipping on all US orders
              from Monday - Friday. Expedited service available for a fee (see
              rates below).
            </p>

            <p>
              As most of our products are made-to-order, the 'ship date' for
              each design will vary and can be found on the product page once
              the items are selected. SAMA strives to deliver orders within 10
              business days of placing your order and will send an email
              notification once the order ships. Note that orders cannot be
              shipped to a P.O.
            </p>

            <p>
              SAMA understands that many purchases will be for special
              occasions. Should your order be a surprise or need special
              arrangements, please reach out and let us know how we can maintain
              your surprise or expedite your package for a seamless experience.
              Call us at 917-576-6151 to assist with special arrangements (e.g,
              Saturday delivery, delivery on a particular date, etc.) or holding
              at a FedEx location. Saturday delivery may be available for
              eligible locations (limited time only).
            </p>
          </div>

          <div className="shipping-fees">
            <h3>Shipping Fees</h3>
            <p>
              A non-refundable shipping fee will be added to expedited orders at
              checkout. All shipments require a signature upon delivery.
            </p>
            <table id="shipping-fees-id">
              <tr>
                <td>FedEx 2-Day (2 business days)</td>
                <td>Complimentary</td>
              </tr>
              <tr>
                <td>FedEx Overnight (1 business day)</td>
                <td>$50 USD (plus applicable taxes)</td>
              </tr>
              <tr>
                <td>
                  FedEx International Priority (2-5 business days) for Puerto &
                  Guam only
                </td>
                <td>TBC</td>
              </tr>
              <tr>
                <td>
                  USPS Priority Mail (1-3 business days) for APO addresses
                </td>
                <td>Complimentary</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
