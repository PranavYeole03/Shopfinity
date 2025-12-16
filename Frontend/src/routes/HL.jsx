import { useSelector } from "react-redux";
import HLSection from "../components/HLSection";

const HL = () => {
  const items = useSelector((store) => store.items);

  return (
    <main>
      <div className="items-container">
        {items.map((item) => (
          <HLSection key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
};
export default HL;
