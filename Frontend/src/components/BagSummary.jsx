import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BagSummary = () => {
  const navigate = useNavigate();
  const bagItemsIDs = useSelector((state) => state.bag);
  const items = useSelector((state) => state.items);
  const finalItems = items.filter((item) => bagItemsIDs.includes(item.id));
  const CONVENIENCE_FEES = 99;

  let totalMRP = 0;
  let totalDiscount = 0;

  finalItems.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  return (
    <div className="bag-summary">
      <div className="bag-details-container">
        <div className="price-header">PRICE DETAILS ({finalItems.length} Items)</div>
        <div className="price-item">
          <span>Total MRP</span>
          <span>₹{totalMRP}</span>
        </div>
        <div className="price-item">
          <span>Discount on MRP</span>
          <span>-₹{totalDiscount}</span>
        </div>
        <div className="price-item">
          <span>Convenience Fee</span>
          <span>₹99</span>
        </div>
        <hr />
        <div className="price-footer">
          <span>Total Amount</span>
          <span>₹{finalPayment}</span>
        </div>
      </div>
      <button
        className="btn-place-order"
        onClick={() =>
          navigate("/checkout", {
            state: {
              items: finalItems,
              totalMRP,
              totalDiscount,
              finalPayment
            },
          })
        }
      >
        PLACE ORDER
      </button>
    </div>
  );
};

export default BagSummary;
