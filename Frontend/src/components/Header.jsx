import { useState } from "react";
import { IoSearch, IoPerson, IoBag } from "react-icons/io5";
import { FaFaceGrinHearts } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Header = () => {
  const bag = useSelector((store) => store.bag);
  const wishlist = useSelector((store) => store.wishlist);
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <header>
      {/* Logo */}
      <div className="logo_container">
        <Link to="/">
          <img
            className="Shopfinity"
            src="images/Shopfinity.png"
            alt="Shopfinity"
          />
        </Link>
      </div>

      {/* Navigation */}
      <div className="nav_bar">
        {/* Men */}
        <div className="dropdown">
          <Link
            to="/Men"
            className="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Men
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/Men">Shirts</Link></li>
            <li><Link className="dropdown-item" to="/Men">T-shirts</Link></li>
            <li><Link className="dropdown-item" to="/Men">Jeans</Link></li>
            <li><Link className="dropdown-item" to="/Men">Trousers</Link></li>
            <li><Link className="dropdown-item" to="/Men">Jackets</Link></li>
            <li><Link className="dropdown-item" to="/Men">Shoes</Link></li>
            <li><Link className="dropdown-item" to="/Men">Accessories</Link></li>
          </ul>
        </div>

        {/* Women */}
        <div className="dropdown">
          <Link
            to="/Women"
            className="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Women
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/Women">Tops</Link></li>
            <li><Link className="dropdown-item" to="/Women">Dresses</Link></li>
            <li><Link className="dropdown-item" to="/Women">Skirts</Link></li>
            <li><Link className="dropdown-item" to="/Women">Sarees</Link></li>
            <li><Link className="dropdown-item" to="/Women">Shoes</Link></li>
            <li><Link className="dropdown-item" to="/Women">Bags</Link></li>
            <li><Link className="dropdown-item" to="/Women">Accessories</Link></li>
          </ul>
        </div>

        {/* Kids */}
        <div className="dropdown">
          <Link
            to="/Kids"
            className="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Kids
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/Kids">Boys Clothing</Link></li>
            <li><Link className="dropdown-item" to="/Kids">Girls Clothing</Link></li>
            <li><Link className="dropdown-item" to="/Kids">Infant Wear</Link></li>
            <li><Link className="dropdown-item" to="/Kids">Shoes</Link></li>
            <li><Link className="dropdown-item" to="/Kids">Toys</Link></li>
            <li><Link className="dropdown-item" to="/Kids">School Supplies</Link></li>
          </ul>
        </div>

        {/* Home & Living */}
        <div className="dropdown">
          <Link
            to="/HomeLiving"
            className="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Home & Living
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/HL">Furniture</Link></li>
            <li><Link className="dropdown-item" to="/HL">Home Decor</Link></li>
            <li><Link className="dropdown-item" to="/HL">Bedding</Link></li>
            <li><Link className="dropdown-item" to="/HL">Kitchenware</Link></li>
            <li><Link className="dropdown-item" to="/HL">Lighting</Link></li>
            <li><Link className="dropdown-item" to="/HL">Small Appliances</Link></li>
          </ul>
        </div>

        {/* Beauty */}
        <div className="dropdown">
          <Link
            to="/Beauty"
            className="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Beauty
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/Beauty">Makeup</Link></li>
            <li><Link className="dropdown-item" to="/Beauty">Skincare</Link></li>
            <li><Link className="dropdown-item" to="/Beauty">Haircare</Link></li>
            <li><Link className="dropdown-item" to="/Beauty">Fragrances</Link></li>
            <li><Link className="dropdown-item" to="/Beauty">Beauty Tools</Link></li>
          </ul>
        </div>

        {/* Studio */}
        <div className="dropdown">
          <Link
            to="/Studio"
            className="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Studio
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/Studio">Electronics</Link></li>
            <li><Link className="dropdown-item" to="/Studio">Cameras</Link></li>
            <li><Link className="dropdown-item" to="/Studio">Headphones</Link></li>
            <li><Link className="dropdown-item" to="/Studio">Gaming Consoles</Link></li>
            <li><Link className="dropdown-item" to="/Studio">Smartwatches</Link></li>
            <li><Link className="dropdown-item" to="/Studio">Laptops</Link></li>
          </ul>
        </div>
      </div>

      {/* Search */}
      <div className="search_bar">
        {!showSearch && (
          <button
            className="search_icon_btn"
            onClick={toggleSearch}
            aria-label="Open search"
          >
            <IoSearch size={20} />
          </button>
        )}
        {showSearch && (
          <input
            className="search_input"
            placeholder="Search for products, brands and more"
            autoFocus
            onBlur={() => setShowSearch(false)}
          />
        )}
      </div>

      {/* Action Bar */}
      <div className="action_bar">
        <Link className="action_container" to="/profile">
          <IoPerson />
          <span className="action_name">Profile</span>
        </Link>
        <Link className="action_container" to="/wishlist">
          <FaFaceGrinHearts />
          <span className="action_name">Wishlist</span>
          <span className="bag-item-count">{wishlist.length}</span>
        </Link>
        <Link className="action_container" to="/bag">
          <IoBag />
          <span className="action_name">Bag</span>
          <span className="bag-item-count">{bag.length}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
