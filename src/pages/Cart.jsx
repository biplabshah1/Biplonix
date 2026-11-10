import { Link } from "react-router-dom";
import Garment from "../components/Garment.jsx";
import { useCart } from "../context/CartContext.jsx";
import { FREE_SHIPPING_OVER, findProduct, money } from "../data/products.js";

export function OrderSummary({ showCheckout }) {
  const { subtotal, shipping, total } = useCart();
  return (
    <aside className="box" style={{ alignSelf: "start" }}>
      <table>
        <tbody>
          <tr><td>Subtotal</td><td>{money(subtotal)}</td></tr>
          <tr><td>Delivery</td><td>{shipping ? money(shipping) : "Free"}</td></tr>
          <tr><th>Total</th><th>{money(total)}</th></tr>
        </tbody>
      </table>
      {subtotal < FREE_SHIPPING_OVER && <p className="msg">Add {money(FREE_SHIPPING_OVER - subtotal)} more for free delivery.</p>}
      {showCheckout && <p><Link className="btn" to="/checkout" style={{ width: "100%", textAlign: "center" }}>Checkout</Link></p>}
    </aside>
  );
}

export default function Cart() {
  const { items, increase, decrease, remove } = useCart();
  if (!items.length)
    return (<><h2>Your bag</h2><p>Your bag is empty.</p><Link className="btn" to="/shop">Continue shopping</Link></>);

  return (
    <>
      <h2>Your bag</h2>
      <div className="two">
        <div>
          {items.map((i) => {
            const p = findProduct(i.id);
            return (
              <div className="row" key={`${i.id}-${i.colour}-${i.size}`}>
                <div className="pic"><Garment product={p} colour={i.colour} /></div>
                <div className="g">
                  <strong>{p.name}</strong><br />
                  <span className="msg">{i.colour} · {i.size}</span><br />
                  <button className="chip" onClick={() => decrease(i)} aria-label="Decrease quantity">−</button> {i.qty}{" "}
                  <button className="chip" onClick={() => increase(i)} aria-label="Increase quantity">+</button>{" "}
                  <button className="chip" onClick={() => remove(i)}>Remove</button>
                </div>
                <strong>{money(p.price * i.qty)}</strong>
              </div>
            );
          })}
        </div>
        <OrderSummary showCheckout />
      </div>
    </>
  );
}
