import HomeItem from "../components/HomeItem";
import { useSelector } from "react-redux";

const Men = () => {
  const items = useSelector((store) => store.items);

  return (
    <main>
      <div className="items-container">
        {items.map((item) => (
          <HomeItem key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
};
export default Men;
