import { useSelector } from "react-redux";
import StudioSection from "../components/StudioSection";

const Studio = () => {
  const items = useSelector((store) => store.items);

  return (
    <main>
      <div className="items-container">
        {items.map((item) => (
          <StudioSection key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
};
export default Studio;
