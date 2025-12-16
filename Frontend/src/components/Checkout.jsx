import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaPlane, FaTimes } from "react-icons/fa";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showPlane, setShowPlane] = useState(false);

  // Store items (we keep them even after order placed)
  const [items, setItems] = useState(location.state?.items || []);

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");

  // Calculate total dynamically
  const CONVENIENCE_FEES = 99;
  const totalAmount = items.reduce(
    (sum, item) => sum + Number(item.current_price || 0),
    CONVENIENCE_FEES
  );

  // Handle confirm order
  const handleConfirmOrder = () => {
    if (!paymentMethod) {
      setError("Please select a payment method before confirming.");
      return;
    }

    setError(""); // clear error
    setShowPlane(true);

    setTimeout(() => {
      setOrderPlaced(true);
      setShowPlane(false);
      setPaymentMethod(""); // clear payment method
    }, 2500);
  };

  // Remove item from checkout
  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {items.length === 0 ? (
        <p>No items to checkout.</p>
      ) : (
        <>
          {/* Items List */}
          <div className="checkout-items">
            {items.map((item, index) => (
              <div className="checkout-item" key={index}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="checkout-image"
                />
                <div>
                  <p>{item.name}</p>
                  <p>₹{item.current_price}</p>
                </div>

                {!orderPlaced && (
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Payment & Summary Section (hide after order placed) */}
          {!orderPlaced && (
            <div className="checkout-summary">
              <h3>Total Amount: ₹{totalAmount}</h3>
              <h4>Payment Options:</h4>
              <ul>
                {["PhonePe", "Google Pay", "Paytm", "Cash on Delivery"].map(
                  (method, idx) => (
                    <li key={idx}>
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />{" "}
                      {method}
                    </li>
                  )
                )}
              </ul>

              {error && <p className="error-message">{error}</p>}

              <button className="confirm-btn" onClick={handleConfirmOrder}>
                Confirm Order
              </button>
            </div>
          )}
        </>
      )}

      {/* Airplane Animation */}
      {showPlane && (
        <div className="plane-animation">
          <FaPlane />
        </div>
      )}

      {/* Order Success Message */}
      {orderPlaced && (
        <div className="order-success">
          ✈️ Order placed successfully! Your products will be delivered soon.
        </div>
      )}
    </div>
  );
};

export default Checkout;
