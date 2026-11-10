import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <Link to="/shipping">Shipping &amp; returns</Link>
      <Link to="/privacy">Privacy</Link>
      <Link to="/privacy">Cookies</Link>
      <Link to="/privacy">Terms</Link>
      <span>© {new Date().getFullYear()} BIPLONIX</span>
    </footer>
  );
}
