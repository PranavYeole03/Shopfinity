import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { itemsActions } from "../store/itemsSlice";

const API_URL = "https://shopfinity-wid9.onrender.com";

const FetchItems = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}/items`);
        const data = await response.json();
        dispatch(itemsActions.addInitialItems(data.items));
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [dispatch]);

  return (
    <div className="products-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {items.map(item => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default FetchItems;
