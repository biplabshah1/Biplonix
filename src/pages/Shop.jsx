import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS, CATS, COL, SIZES } from "../data/products.js";

const PRICES = [["999", "Any price"], ["40", "Under £40"], ["60", "Under £60"], ["70", "Under £70"]];
const SORTS = [["featured", "Featured"], ["low", "Price: low to high"], ["high", "Price: high to low"]];

function Select({ label, value, onChange, options }) {
  return (
    <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map(([k, t]) => <option key={k} value={k}>{t}</option>)}
    </select>
  );
}

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const cat = CATS[params.get("cat")] ? params.get("cat") : "all";
  const [size, setSize] = useState("");
  const [colour, setColour] = useState("");
  const [max, setMax] = useState("999");
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    const l = PRODUCTS.filter(
      (p) =>
        (cat === "all" || p.cat === cat) &&
        (!colour || p.colours.includes(colour)) &&
        p.price <= Number(max) &&
        (!size || Object.entries(p.stock).some(([k, n]) => k.endsWith(`|${size}`) && n > 0))
    );
    if (sort === "low") l.sort((a, b) => a.price - b.price);
    if (sort === "high") l.sort((a, b) => b.price - a.price);
    return l;
  }, [cat, size, colour, max, sort]);

  const clear = () => { setParams({}); setSize(""); setColour(""); setMax("999"); setSort("featured"); };

  return (
    <>
      <h2>{CATS[cat]}</h2>
      <div className="bar">
        <Select label="Category" value={cat} onChange={(v) => setParams(v === "all" ? {} : { cat: v })} options={Object.entries(CATS)} />
        <Select label="Size" value={size} onChange={setSize} options={[["", "Any size"], ...SIZES.map((s) => [s, s])]} />
        <Select label="Colour" value={colour} onChange={setColour} options={[["", "Any colour"], ...Object.keys(COL).map((c) => [c, c])]} />
        <Select label="Price" value={max} onChange={setMax} options={PRICES} />
        <Select label="Sort" value={sort} onChange={setSort} options={SORTS} />
      </div>
      <p className="msg" role="status">{list.length} product{list.length === 1 ? "" : "s"}</p>
      {list.length ? (
        <div className="grid">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      ) : (
        <p>Nothing matches those filters. <button className="chip" onClick={clear}>Clear filters</button></p>
      )}
    </>
  );
}
