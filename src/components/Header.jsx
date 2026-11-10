import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import mark from "../assets/logo-mark.jpg";

export default function Header() {
  const { count } = useCart();
  return (
    <header>
      <Link className="logo" to="/">
        <img src={mark} alt="" width="45" height="34" />
        BIPLONIX
      </Link>
      <nav aria-label="Main">
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <Link className="bag" to="/cart" aria-label={`Open bag, ${count} items`}>
        Bag ({count})
      </Link>
    </header>
  );
}
