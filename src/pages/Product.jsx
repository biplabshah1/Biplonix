import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Garment from "../components/Garment.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useCart } from "../context/CartContext.jsx";
import { COL, FIT, MATERIAL, CARE, SIZE_GUIDE, PRODUCTS, FREE_SHIPPING_OVER, findProduct, money, sizesFor, stockKey } from "../data/products.js";

export default function Product() {
  const { id } = useParams();
  const product = findProduct(id);
  const { add } = useCart();
  const [colour, setColour] = useState(product?.colours[0]);
  const [size, setSize] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setColour(product?.colours[0]); setSize(null); setMsg("");
    if (product) document.title = `${product.name} – BIPLONIX`;
    return () => { document.title = "BIPLONIX – Shop more. Live better."; };
  }, [id]);

  if (!product) return <><h2>Product not found</h2><Link to="/shop">Browse the shop</Link></>;

  const left = size ? product.stock[stockKey(colour, size)] : null;
  const guide = SIZE_GUIDE[product.cat];

  const pickColour = (c) => {
    setColour(c);
    if (size && !product.stock[stockKey(c, size)]) setSize(null);
  };
  const addToBag = () => {
    if (!size) return setMsg("Choose a size first.");
    setMsg(add({ id: product.id, colour, size })
      ? `Added to bag: ${product.name}, ${colour}, ${size}.`
      : "That is all we have in stock.");
  };

  return (
    <>
      <div className="pd">
        <div className="pic"><Garment product={product} colour={colour} /></div>
        <div>
          <p className="msg"><Link to="/shop">← Shop</Link></p>
          <h1>{product.name}</h1>
          <p style={{ fontSize: 22, margin: "4px 0 8px" }}>{money(product.price)}</p>
          <p>{product.description}</p>

          <span className="lbl">Colour: {colour}</span>
          <div className="chips" role="radiogroup" aria-label="Colour">
            {product.colours.map((c) => (
              <button key={c} className="chip" role="radio" aria-checked={c === colour} onClick={() => pickColour(c)}>
                <span className="sw" style={{ background: COL[c] }} />{c}
              </button>
            ))}
          </div>

          <span className="lbl">Size</span>
          <div className="chips" role="radiogroup" aria-label="Size">
            {sizesFor(product).map((s) => (
              <button key={s} className="chip" role="radio" aria-checked={s === size} disabled={!product.stock[stockKey(colour, s)]} onClick={() => setSize(s)}>
                {s}
              </button>
            ))}
          </div>
          <p className="msg" role="status">{size ? (left <= 3 ? `Only ${left} left` : "In stock") : "Select a size"}</p>

          <button className="btn" style={{ width: "100%", marginTop: 6 }} onClick={addToBag}>Add to bag</button>
          <p className="msg" role="status">{msg || `Free UK delivery over £${FREE_SHIPPING_OVER}. Returns within 30 days.`}</p>

          <details open><summary>Fit notes</summary><p>{FIT[product.cat]}</p></details>
          <details><summary>Material</summary><p>{MATERIAL[product.cat]}</p></details>
          <details><summary>Care</summary><p>{CARE[product.cat]}</p></details>
          {guide && (
            <details>
              <summary>Size guide (garment measurements, cm)</summary>
              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead><tr><th>Size</th><th>{product.cat === "pants" ? "Waist" : "Chest"}</th><th>Length</th></tr></thead>
                  <tbody>{guide.map(([s, a, b]) => <tr key={s}><td>{s}</td><td>{a}</td><td>{b}</td></tr>)}</tbody>
                </table>
              </div>
            </details>
          )}
          <details><summary>Delivery &amp; returns</summary><p>Standard UK delivery in 2–4 working days. Unworn items can be returned within 30 days. <Link to="/shipping">Full details</Link>.</p></details>
        </div>
      </div>

      <h2>Complete the look</h2>
      <div className="grid">
        {PRODUCTS.filter((p) => p.cat !== product.cat).slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
