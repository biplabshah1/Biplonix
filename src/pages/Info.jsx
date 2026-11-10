import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FREE_SHIPPING_OVER, SHIPPING_COST, money } from "../data/products.js";

const Page = ({ title, children }) => (<><h2>{title}</h2><div className="prose">{children}</div></>);

export const About = () => (
  <Page title="About BIPLONIX">
    <p>BIPLONIX makes a focused range of heavyweight basics and relaxed streetwear in black, white, cream and grey. Fewer styles, better fabric, and fits that are measured rather than guessed.</p>
    <p>Every piece is sample-tested for fit, shrinkage and stitching before it goes on sale.</p>
    <p className="msg">Placeholder copy: replace with your founder story.</p>
  </Page>
);

const FAQS = [
  ["How does sizing work?", "Each product has a size guide with garment measurements. Compare with a piece you already own."],
  ["How long will delivery take?", "Standard UK delivery takes 2–4 working days after dispatch."],
  ["Can I return an item?", "Yes. Unworn items with tags can be returned within 30 days of delivery."],
  ["How do I track my order?", "You will get a dispatch email with a tracking link."],
  ["Which payment methods do you accept?", "Cards and wallet payments, confirmed at launch."],
];
export const Faq = () => (
  <Page title="FAQ">{FAQS.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</Page>
);

export const Shipping = () => (
  <Page title="Shipping & returns">
    <p><strong>Delivery.</strong> UK standard delivery is {money(SHIPPING_COST)}, free over £{FREE_SHIPPING_OVER}. Orders placed before the dispatch cut-off ship the same working day.</p>
    <p><strong>Returns.</strong> Unworn items can be returned within 30 days of delivery for a refund.</p>
    <p className="msg">Draft text. Have your policies reviewed against current UK consumer rights before launch.</p>
  </Page>
);

export const Privacy = () => (
  <Page title="Privacy, cookies & terms">
    <p>Placeholder page. Publish reviewed privacy, cookie and terms-of-sale policies before launch. This demo stores only your bag, in your own browser.</p>
  </Page>
);

export function Contact() {
  const [msg, setMsg] = useState("");
  return (
    <>
      <h2>Contact</h2>
      <div className="two">
        <form className="box" onSubmit={(e) => { e.preventDefault(); setMsg("Message received (demo only: nothing was sent)."); e.target.reset(); }}>
          <label>Name<input required /></label>
          <label>Email<input type="email" required /></label>
          <label>Message<textarea rows="5" required /></label>
          <p><button className="btn">Send message</button></p>
          <p className="msg" role="status">{msg}</p>
        </form>
        <div className="prose"><p>We aim to reply within 1 working day.</p><p className="msg">Add your real support email and hours.</p></div>
      </div>
    </>
  );
}

export function ThankYou() {
  const ref = useMemo(() => `BX-${Math.floor(10000 + Math.random() * 89999)}`, []);
  return (
    <Page title="Thank you">
      <p className="ok">Order {ref} confirmed (demo).</p>
      <p>In the live store, a confirmation email would be sent, followed by a dispatch update with tracking.</p>
      <Link className="btn" to="/shop">Keep shopping</Link>
    </Page>
  );
}
