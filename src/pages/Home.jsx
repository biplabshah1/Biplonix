import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS, CATS, FREE_SHIPPING_OVER } from "../data/products.js";
import logo from "../assets/logo-full.jpg";

export default function Home() {
  const [msg, setMsg] = useState("");
  return (
    <>
      <section className="hero">
        <div>
          <h1>Shop more.<br /><b>Live better.</b></h1>
          <p>Heavyweight basics and clean streetwear, built to be worn every day. A focused collection with fits that are measured, not guessed.</p>
          <Link className="btn" to="/shop">Shop the collection</Link>{" "}
          <Link className="btn ghost" to="/about">Our story</Link>
        </div>
        <div className="logobox">
          <img src={logo} alt="BIPLONIX – Shop more. Live better." width="440" height="220" />
        </div>
      </section>

      <div className="trust">
        <span>Free UK delivery over £{FREE_SHIPPING_OVER}</span>
        <span>30-day returns</span>
        <span>Secure checkout</span>
        <span>Tracked dispatch</span>
      </div>

      <h2>New arrivals</h2>
      <div className="grid">{PRODUCTS.filter((p) => p.isNew).slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}</div>

      <h2>Shop by category</h2>
      <div className="chips">
        {Object.entries(CATS).filter(([k]) => k !== "all").map(([k, label]) => (
          <Link key={k} className="btn ghost" to={`/shop?cat=${k}`}>{label}</Link>
        ))}
      </div>

      <h2>Join the list</h2>
      <div className="box prose">
        <p>Get first access to new drops. No spam; unsubscribe any time.</p>
        <form
          style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
          onSubmit={(e) => { e.preventDefault(); setMsg("Thanks. You are on the list (demo only: nothing was sent)."); e.target.reset(); }}
        >
          <input type="email" required placeholder="Email address" aria-label="Email address" style={{ flex: 1, minWidth: 200 }} />
          <button className="btn">Subscribe</button>
          <label style={{ fontWeight: 400, fontSize: 14, display: "flex", gap: 8, width: "100%" }}>
            <input type="checkbox" required style={{ width: "auto" }} /> I agree to receive marketing emails.
          </label>
        </form>
        <p className="msg" role="status">{msg}</p>
      </div>
    </>
  );
}
