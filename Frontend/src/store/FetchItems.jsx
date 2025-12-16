import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const FetchItems = () => {
  const items = useSelector(state => state.items);

  return (
    <div className="products-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {items.map(item => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default FetchItems;
