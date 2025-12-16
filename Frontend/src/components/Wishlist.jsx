import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/wishlistSlice.js";
import { bagActions } from "../store/bagSlice";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToBag = (id) => {
    dispatch(bagActions.addToBag(id));
  };

  if (wishlist.length === 0)
    return <h2 style={{ textAlign: "center", marginTop: "20px" }}>Your wishlist is empty.</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Your Wishlist ❤️</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {wishlist.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              width: "250px",
              background: "#fff",
              textAlign: "center",
              padding: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.item_name}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />

            {/* Product Details */}
            <h4 style={{ fontSize: "16px", marginBottom: "5px" }}>{item.company}</h4>
            <p style={{ color: "#555", fontSize: "14px" }}>{item.item_name}</p>
            <p style={{ margin: "5px 0" }}>
              <strong>₹{item.current_price}</strong>{" "}
              <span style={{ textDecoration: "line-through", color: "gray" }}>
                ₹{item.original_price}
              </span>{" "}
              <span style={{ color: "green" }}>({item.discount_percentage}% OFF)</span>
            </p>
            <p style={{ fontSize: "14px", color: "#777" }}>
              ⭐ {item.rating.stars} | {item.rating.count} reviews
            </p>

            {/* Buttons */}
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => handleAddToBag(item.id)}
                style={{
                  background: "#28a745",
                  color: "#fff",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "5px",
                }}
              >
                Add to Bag
              </button>

              <button
                onClick={() => handleRemove(item.id)}
                style={{
                  background: "#dc3545",
                  color: "#fff",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
