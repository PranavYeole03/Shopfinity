import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer_overlay">
          <div className="footer_container d-flex justify-content-around align-items-start flex-wrap">
            {/* Column 1 */}
            <div className="footer_column">
              <h3>ONLINE SHOPPING</h3>
              <a href="#">Men</a>
              <a href="#">Women</a>
              <a href="#">Kids</a>
              <a href="#">Home & Living</a>
              <a href="#">Beauty</a>
              <a href="#">Gift Card</a>
              <a href="#">Myntra Insider</a>
            </div>

            {/* Column 2 */}
            <div className="footer_column">
              <h3>USEFUL LINKS</h3>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
              <a href="#">Site Map</a>
              <a href="#">Corporate Information</a>
              <a href="#">Whitehat</a>
            </div>

            {/* Column 3 */}
            <div className="footer_column">
              <h3>CUSTOMER POLICIES</h3>
              <a href="#">Contact Us</a>
              <a href="#">FAQ</a>
              <a href="#">T&C</a>
              <a href="#">Terms Of Use</a>
              <a href="#">Track Orders</a>
              <a href="#">Shipping</a>
              <a href="#">Cancellation</a>
            </div>

            {/* Column 4 - Images */}
            <div className="footer_column text-center">
              <h3>Download Our App</h3>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Download App"
                width="150"
                className="mb-2"
              />
              <br />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                width="150"
              />
            </div>
          </div>

          <hr />
        </div>
      </footer>
    </>
  );
};

export default Footer;
