import { Link } from "react-router-dom";
import Garment from "./Garment.jsx";
import { money, totalStock } from "../data/products.js";

export default function ProductCard({ product: p }) {
  const soldOut = totalStock(p) === 0;
  return (
    <Link className="card" to={`/product/${p.id}`}>
      <div className="pic">
        <Garment product={p} colour={p.colours[0]} />
        {soldOut ? <span className="tag">Sold out</span> : p.isNew && <span className="tag">New</span>}
      </div>
      <h3>{p.name}</h3>
      <span>
        {money(p.price)} · {p.colours.length} colour{p.colours.length > 1 ? "s" : ""}
      </span>
    </Link>
  );
}
