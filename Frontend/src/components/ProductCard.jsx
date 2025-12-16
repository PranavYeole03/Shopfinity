import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "./wishlistSlice";
import { addToCart } from "./cartSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./ProductCard.css";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const cart = useSelector((state) => state.cart);

  const isInWishlist = wishlist.some((w) => w.id === item.id);
  const isInCart = cart.some((c) => c.id === item.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(item.id));
    } else {
      dispatch(addToWishlist(item));
    }
  };

  const addItemToCart = () => {
    if (!isInCart) {
      dispatch(addToCart(item));
    }
  };

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={item.image} alt={item.name} />
        <button
          className={`wishlist-btn ${isInWishlist ? "active" : ""}`}
          onClick={toggleWishlist}
          aria-label={
            isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"
          }
        >
          {isInWishlist ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <h4 className="product-name">{item.name}</h4>
      <p className="product-price">₹{item.price}</p>

      <button
        className={`cart-btn ${isInCart ? "disabled" : ""}`}
        onClick={addItemToCart}
        disabled={isInCart}
      >
        {isInCart ? "Added to Bag" : "Add to Bag"}
      </button>
    </div>
  );
};

export default ProductCard;
