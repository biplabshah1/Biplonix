import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { OrderSummary } from "./Cart.jsx";
import { SHIPPING_COST, money } from "../data/products.js";

export default function Checkout() {
  const { items, shipping, clear } = useCart();
  const navigate = useNavigate();
  if (!items.length) return <><h2>Checkout</h2><p>Your bag is empty.</p><Link className="btn" to="/shop">Continue shopping</Link></>;

  const submit = (e) => {
    e.preventDefault();
    clear();
    navigate("/thank-you");
  };

  return (
    <>
      <h2>Checkout</h2>
      <div className="note">Demo checkout: no payment is taken and no data is sent. Connect a payment provider (for example Stripe) and a backend before selling.</div>
      <div className="two">
        <form className="box" onSubmit={submit}>
          <label>Email<input type="email" required autoComplete="email" /></label>
          <label>Full name<input required autoComplete="name" /></label>
          <label>Address<input required autoComplete="street-address" /></label>
          <label>City<input required /></label>
          <label>Postcode<input required autoComplete="postal-code" /></label>
          <label>Delivery
            <select><option>Standard (2–4 days) – {shipping ? money(SHIPPING_COST) : "Free"}</option></select>
          </label>
          <label>Payment
            <select><option>Card (demo)</option><option>PayPal (demo)</option></select>
          </label>
          <p><button className="btn" style={{ width: "100%" }}>Place demo order</button></p>
        </form>
        <OrderSummary />
      </div>
    </>
  );
}
