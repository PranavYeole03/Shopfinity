import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice"; // ensure this path & filename match
import { IoIosAddCircle } from "react-icons/io";
import { IoBagRemoveSharp } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./HomeItem.css"; // new css file

const MenSection = ({ item }) => {
  const dispatch = useDispatch();
  const bagItems = useSelector((store) => store.bag);
  const wishlist = useSelector((store) => store.wishlist);

  // Support both "wishlist is array of objects" and "wishlist is array of ids"
  const inWishlist =
    !!wishlist.find?.((w) => (typeof w === "object" ? w.id === item.id : w === item.id)) ||
    wishlist.includes?.(item.id);

  const inBag = Array.isArray(bagItems) ? bagItems.indexOf(item.id) >= 0 : false;

  const handleAddtoBag = () => dispatch(bagActions.addToBag(item.id));
  const handleRemoveFromBag = () => dispatch(bagActions.removeFromBag(item.id));

  const toggleWishlist = () => {
    if (inWishlist) dispatch(removeFromWishlist(item.id));
    else dispatch(addToWishlist(item));
  };

  return (
    <div className="item-container">
      <div className="image-wrap">
        <img className="item-image" src={item.image} alt={item.item_name} />

        <button
          className={`heart-btn ${inWishlist ? "active" : ""}`}
          onClick={toggleWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={inWishlist}
          type="button"
        >
          {inWishlist ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="rating">{item.rating?.stars ?? "—"} ⭐ | {item.rating?.count ?? ""}</div>
      <div className="company-name">{item.company}</div>
      <div className="item-name">{item.item_name}</div>

      <div className="price">
        <span className="current-price">Rs {item.current_price}</span>
        {item.original_price && <span className="original-price">Rs {item.original_price}</span>}
        {item.discount_percentage && <span className="discount">({item.discount_percentage}% OFF)</span>}
      </div>

      {inBag ? (
        <button className="btn-add-bag btn btn-danger" onClick={handleRemoveFromBag}>
          <IoBagRemoveSharp /> Remove from Bag
        </button>
      ) : (
        <button className="btn-add-bag btn btn-success" onClick={handleAddtoBag}>
          <IoIosAddCircle /> Add to Bag
        </button>
      )}
    </div>
  );
};

export default MenSection;
